import axios from 'axios';

import { RemoteError } from './nludb_error';
import {
  Configuration,
  LoadConfigParams,
  loadConfiguration,
} from './shared/Configuration';
import { NludbTaskStatus, TaskStatusResponse } from './types/base';
import {
  AddTaskCommentRequest,
  DeleteTaskCommentRequest,
  ListTaskCommentResponse,
  TaskCommentResponse,
} from './types/task_comment';


export interface PostConfig<T> extends Configuration {
  responsePath?: string,
  rawResponse?: boolean,
  file?: Buffer,
  filename?: string,
  expect?: (client: ApiBase, data: unknown) => T
}

export class NludbTask<ResultType> implements TaskStatusResponse {
  client: ApiBase;
  taskId?: string;
  taskStatus?: string;
  taskCreatedOn?: string;
  taskLastModifiedOn?: string;

  constructor(client: ApiBase, params?: TaskStatusResponse) {
    this.client = client;
    this.taskId = params?.taskId;
    this.taskStatus = params?.taskStatus;
    this.taskCreatedOn = params?.taskCreatedOn;
    this.taskLastModifiedOn = params?.taskLastModifiedOn;
  }

  update(
    data?: TaskStatusResponse | Response<TaskStatusResponse>
  ): NludbTask<ResultType> {
    if (!data) {
      return this;
    }
    if ((data as Response<TaskStatusResponse>).task) {
      // Invoke update on just the task
      this.update((data as Response<TaskStatusResponse>).task);
      return this;
    }

    const task = data as TaskStatusResponse;
    this.taskId = task.taskId;
    this.taskStatus = task.taskStatus;
    this.taskCreatedOn = task.taskCreatedOn;
    this.taskLastModifiedOn = task.taskLastModifiedOn;
    return this;
  }

  async check(): Promise<NludbTask<ResultType>> {
    const status = await (this.client.post('task/status', {
      taskId: this.taskId,
    }) as Promise<Response<TaskStatusResponse>>);
    return this.update(status);
  }

  async wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<NludbTask<ResultType>> {
    if (typeof params == 'undefined') {
      params = {};
    }
    let { maxTimeoutSeconds, retryDelaySeconds } = params;
    if (typeof maxTimeoutSeconds == 'undefined') {
      maxTimeoutSeconds = 60;
    }
    if (typeof retryDelaySeconds == 'undefined') {
      retryDelaySeconds = 1;
    }

    const start = Date.now(); // ms since epoch
    await this.check();
    if (
      this.taskStatus == NludbTaskStatus.succeeded ||
      this.taskStatus == NludbTaskStatus.failed
    ) {
      return this;
    }

    await new Promise((r) =>
      setTimeout(r, 1000 * (retryDelaySeconds as number))
    );

    while ((Date.now() - start) / 1000.0 < maxTimeoutSeconds) {
      await this.check();
      if (
        this.taskStatus == NludbTaskStatus.succeeded ||
        this.taskStatus == NludbTaskStatus.failed
      ) {
        return this;
      }
      await new Promise((r) =>
        setTimeout(r, 1000 * (retryDelaySeconds as number))
      );
    }
    return this;
  }

  async addComment(
    params: AddTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.client.post('task/comment/create', {
      taskId: this.taskId,
      ...params,
    })) as Response<TaskCommentResponse>;
  }

  async listComments(): Promise<Response<ListTaskCommentResponse>> {
    return (await this.client.post('task/comment/list', {
      taskId: this.taskId,
    })) as Response<ListTaskCommentResponse>;
  }

  async deleteComment(
    params: DeleteTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    return (await this.client.post(
      'task/comment/delete',
      params
    )) as Response<TaskCommentResponse>;
  }
}

export class Response<ResultType> {
  data?: ResultType;
  task?: NludbTask<ResultType>;

  public constructor(data?: ResultType, task?: NludbTask<ResultType>) {
    this.data = data;
    this.task = task;
  }

  async wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<NludbTask<ResultType> | undefined> {
    if (this.task) {
      return this.task.wait(params);
    }
    return undefined;
  }

  update(
    data: TaskStatusResponse | Response<TaskStatusResponse>
  ): NludbTask<ResultType> | undefined {
    if (this.task) {
      return this.task.update(data);
    }
    return undefined;
  }

  async check(): Promise<NludbTask<ResultType> | undefined> {
    if (this.task) {
      return this.task.check();
    }
    return undefined;
  }

  async addComment(
    params: AddTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        message: "Can't add comment: no saved task was found for this item."}
      );
    return this.task.addComment(params);
  }

  async listComments(): Promise<Response<ListTaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        message: "Can't list comments: no saved task was found for this item."
      });
    return this.task.listComments();
  }

  async deleteComment(
    params: DeleteTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        message: "Can't delete comment: no saved task was found for this item."}
      );
    return this.task.deleteComment(params);
  }
}

export class ApiBase {
  config: Promise<Configuration>;

  public constructor(params?: LoadConfigParams) {
    this.config = loadConfiguration(params);
  }

  _headers(
    config: Configuration,
    spaceId?: string,
    spaceHandle?: string
  ): { [name: string]: string } {
    const ret: { [name: string]: string } = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };

    if (spaceId) {
      ret['X-Space-Id'] = spaceId;
    } else if (config.spaceId) {
      ret['X-Space-Id'] = config.spaceId;
    } else if (spaceHandle) {
      ret['X-Space-Handle'] = spaceHandle;
    } else if (config.spaceHandle) {
      ret['X-Space-Handle'] = config.spaceHandle;
    }
    return ret;
  }

  async post<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<Response<T>> {
    const baseConfig = await this.config;
    if (!baseConfig.apiKey) {
      throw new RemoteError({
        code: "Authentication",
        message: "API Key not found.",
        suggestion: "Please see docs.nludb.com for a variety of ways to set your API key."
      });
    }

    const url = `${baseConfig.apiBase}${operation}`;
    const reqConfig = {
      headers: this._headers(baseConfig, config?.spaceId, config?.spaceHandle),
    };

    let finalPayload: undefined | unknown | {[key: string]: undefined} = undefined
    if (config?.file) {
      // Because on the server this isn't available (unlike the browser.)
      // TODO: We might not be able to import this in the browser..
      const FormData = await import('form-data');
      const formData = new FormData.default()
      formData.append('file', config?.file, {filename: config?.filename})
      const pp = payload as {[key: string]: undefined}
      for (const key of Object.keys(pp)) {
        const value = pp[key]
        if (value) {
          formData.append(key, value)  
        }
      }
      finalPayload = formData
      const boundary = formData.getBoundary()
      reqConfig.headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`
    } else {
      finalPayload = payload
    }

    let resp = null;
    try {
      resp = await axios.post(url, finalPayload, reqConfig);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new RemoteError({
          message: `[${error.response.status}] ${JSON.stringify(error.response.data)}`
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new RemoteError({
          message: `A request was made to ${url} but no response was received`
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new RemoteError({
          message: `The request to ${url} could not be configured. Message: ${error.message}`
        });
      }
      throw new RemoteError({
        message: 'An unexpected error happened during your request.'
      });
    }

    if (!resp) {
      throw new RemoteError({message: 'No response.'});
    }

    if (!resp.data) {
      throw new RemoteError({message: 'No body or task status in response.'});
    }

    // Is it an error?
    if (resp.data.reason) {
      throw new RemoteError({message: resp.data.reason});
    }
    if (resp.data.error) {
      throw new RemoteError({...resp.data.error});
    }

    if (config?.rawResponse === true) {
      return new Response<T>(resp.data)
    } 

    let data = resp.data.data;
    if (config?.responsePath) {
      if (data[config?.responsePath]) {
        data = data[config?.responsePath]
      }
    }

    if (config?.expect) {
      data = config?.expect(this, data)
    }

    return new Response<T>(
      data as T,
      new NludbTask<T>(this, resp.data.status as TaskStatusResponse)
    );
  }
}
