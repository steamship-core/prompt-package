import axios from 'axios';

import { RemoteError } from './nludb_error';
import {
  Configuration,
  LoadConfigParams,
  loadConfiguration,
} from './shared/Configuration';
import { TaskParams, TaskStatus } from './types/base';
import {
  AddTaskCommentRequest,
  DeleteTaskCommentRequest,
  ListTaskCommentResponse,
  TaskCommentResponse,
} from './types/task_comment';

export interface PostConfig<T> extends Configuration {
  responsePath?: string;
  rawResponse?: boolean;
  file?: Buffer;
  filename?: string;
  expect?: (client: ApiBase, data: unknown) => T;
  appCall?: boolean;
  appOwner?: string;
  appId?: string;
  appInstanceId?: string;
}

export class Task<T> implements TaskParams {
  client: ApiBase;
  taskId?: string;
  taskStatus?: string;
  taskStatusMessage?: string;
  taskCreatedOn?: string;
  taskLastModifiedOn?: string;

  constructor(client: ApiBase, params?: TaskParams) {
    this.client = client;
    this.taskId = params?.taskId;
    this.taskStatus = params?.taskStatus;
    this.taskStatusMessage = params?.taskStatusMessage;
    this.taskCreatedOn = params?.taskCreatedOn;
    this.taskLastModifiedOn = params?.taskLastModifiedOn;
  }

  update(task?: TaskParams): Task<T> {
    if (task) {
      this.taskId = task.taskId;
      this.taskStatus = task.taskStatus;
      this.taskStatusMessage = task.taskStatusMessage;
      this.taskCreatedOn = task.taskCreatedOn;
      this.taskLastModifiedOn = task.taskLastModifiedOn;
    }
    return this;
  }

  completed(): boolean {
    return (
      this.taskStatus == TaskStatus.succeeded ||
      this.taskStatus == TaskStatus.failed
    );
  }

  failed(): boolean {
    return this.taskStatus == TaskStatus.failed;
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

export interface ResponseConfig<T> {
  client: ApiBase;
  responsePath?: string;
  rawResponse?: boolean;
  expect?: (client: ApiBase, data: unknown) => T;
}

export class Response<T> {
  data?: T;
  task?: Task<T>;
  config?: ResponseConfig<T>;

  public constructor(
    data?: unknown,
    task?: Task<T>,
    config?: ResponseConfig<T>
  ) {
    // This must come first because setData uses this.config!
    this.config = config;
    this.setData(data);
    this.task = task;
  }

  async setData(data: unknown) {
    // All these casts in here are just to placate Typescript.
    // `data` in this case could be just about anything from bytes to a string
    // to a parsed json object.
    if (!data) {
      this.data = undefined;
      return;
    }

    if (data && this.config?.responsePath) {
      if ((data as Record<string, unknown>)[this.config?.responsePath]) {
        data = (data as Record<string, unknown>)[this.config?.responsePath];
      }
    }

    if (data && this.config?.expect) {
      this.data = this.config?.expect(this.config.client, data);
    } else {
      this.data = data as T;
    }
  }

  async wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<Response<T>> {
    // Bailout and defaults
    if (!this.task) {
      return this;
    }
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

    // If we've already finished, no need to poll
    if (this.task?.completed() === true) {
      return this;
    }

    // Start the wait loop.
    const start = Date.now(); // ms since epoch
    await this.check();
    if (this.task?.completed() === true) {
      return this;
    }

    while ((Date.now() - start) / 1000.0 < maxTimeoutSeconds) {
      await new Promise((r) =>
        setTimeout(r, 1000 * (retryDelaySeconds as number))
      );
      await this.check();
      if (this.task?.completed() === true) {
        return this;
      }
    }
    // If we're here, we timed out.
    return this;
  }

  update(response: Response<T>): Response<T> {
    if (this.task) {
      this.task.update(response.task);
    } else {
      this.task = response.task;
    }
    if (response.data) {
      this.setData(response.data);
    }
    return this;
  }

  async check(): Promise<Response<T> | undefined> {
    if (this.task) {
      const result = await (this.task.client.post('task/status', {
        taskId: this.task.taskId,
      }) as Promise<Response<T>>);
      if (result) {
        this.update(result);
      }
    }
    return this;
  }

  async addComment(
    params: AddTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        message: "Can't add comment: no saved task was found for this item.",
      });
    return this.task.addComment(params);
  }

  async listComments(): Promise<Response<ListTaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        message: "Can't list comments: no saved task was found for this item.",
      });
    return this.task.listComments();
  }

  async deleteComment(
    params: DeleteTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        message: "Can't delete comment: no saved task was found for this item.",
      });
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
    spaceHandle?: string,
    appOwner?: string,
    appCall?: boolean,
    appId?: string,
    appInstanceId?: string
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
    if (appCall === true) {
      if (appOwner) {
        ret['X-App-Owner-Handle'] = appOwner;
      }
      if (appId) {
        ret['X-App-Id'] = appId;
      }
      if (appInstanceId) {
        ret['X-App-Instance-Id'] = appInstanceId;
      }
    }
    return ret;
  }

  _url(
    baseConfig: Configuration,
    appCall?: boolean,
    appOwner?: string,
    appBase?: string,
    apiBase?: string,
    operation?: string
  ): string {
    if (appCall === true) {
      if (!appOwner) {
        throw new RemoteError({
          code: 'UserMissing',
          message:
            "Can not invoke an app endpoint without the app owner's user handle.",
          suggestion:
            'Provide the appOwner option, or initialize your app with a lookup.',
        });
      }
      const base = appBase || baseConfig.appBase;
      if (!base) {
        throw new RemoteError({
          code: 'EndpointMissing',
          message:
            'Can not invoke an app endpoint without the App Base variable set.',
          suggestion:
            'This should automatically have a good default setting. Reach out to our NLUDB support.',
        });
      }
      // To make it easier to develop on localhost we'll pipe in the userHandle
      // in a header.
      // We want to split the '//' part.
      // const parts = base.split('//')
      // if (parts.length < 2) {
      //   throw new RemoteError({
      //     code: "EndpointInvalid",
      //     message: "You app base did not appear to begin with a valid HTTP or HTTPS protocol.",
      //     suggestion: "Make sure you've provided an app base such as https://nludb.run, with the protocol."
      //   })
      // }
      // // Now we pre-pend the app-base to the first part!
      // parts[1] = `${appOwner}.${parts[1]}`
      // const newBase = parts.join('//')
      return `${base}${operation}`;
    } else {
      return `${apiBase || baseConfig.apiBase}${operation}`;
    }
  }

  async post<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<Response<T>> {
    return this.call('POST', operation, payload, config);
  }

  async get<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<Response<T>> {
    return this.call('GET', operation, payload, config);
  }

  async call<T>(
    verb: 'POST' | 'GET',
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<Response<T>> {
    const baseConfig = await this.config;
    if (!baseConfig.apiKey) {
      throw new RemoteError({
        code: 'Authentication',
        message: 'API Key not found.',
        suggestion:
          'Please see docs.nludb.com for a variety of ways to set your API key.',
      });
    }

    const url = this._url(
      baseConfig,
      config?.appCall,
      config?.appOwner,
      config?.appBase,
      config?.apiBase,
      operation
    );

    const reqConfig = {
      headers: this._headers(
        baseConfig,
        config?.spaceId,
        config?.spaceHandle,
        config?.appOwner,
        config?.appCall,
        config?.appId,
        config?.appInstanceId
      ),
    };

    let finalPayload: undefined | unknown | { [key: string]: undefined } =
      undefined;
    if (verb == 'POST' && config?.file) {
      // Because on the server this isn't available (unlike the browser.)
      // TODO: We might not be able to import this in the browser..
      const FormData = await import('form-data');
      const formData = new FormData.default();
      formData.append('file', config?.file, { filename: config?.filename });
      const pp = payload as { [key: string]: undefined };
      for (const key of Object.keys(pp)) {
        const value = pp[key];
        if (value) {
          formData.append(key, value);
        }
      }
      finalPayload = formData;
      const boundary = formData.getBoundary();
      reqConfig.headers[
        'Content-Type'
      ] = `multipart/form-data; boundary=${boundary}`;
    } else {
      finalPayload = payload;
    }

    let resp = null;
    try {
      if (verb == 'POST') {
        resp = await axios.post(url, finalPayload, reqConfig);
      } else if (verb == 'GET') {
        resp = await axios.get(url, { ...reqConfig, params: finalPayload });
      } else {
        throw new RemoteError({ message: `Unsupported HTTP Verb: ${verb}` });
      }
    } catch (error) {
      if (error?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new RemoteError({
          message: `[${error?.response?.status}] ${JSON.stringify(
            error?.response?.data
          )}`,
        });
      } else if (error?.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new RemoteError({
          message: `A request was made to ${url} but no response was received`,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new RemoteError({
          message: `The request to ${url} could not be configured. Message: ${error?.message}`,
        });
      }
      throw new RemoteError({
        message: 'An unexpected error happened during your request.',
      });
    }

    if (!resp) {
      throw new RemoteError({ message: 'No response.' });
    }

    if (!resp.data) {
      throw new RemoteError({ message: 'No body or task status in response.' });
    }

    // Is it an error?
    if (resp.data.reason) {
      throw new RemoteError({ message: resp.data.reason });
    }
    if (resp.data.error) {
      throw new RemoteError({ ...resp.data.error });
    }

    // TODO: we might need to switch the task channel to the headers
    // to allow for async raw response! That way we can communicate
    // that the task is complete while also saving the response body for
    // binary.
    if (config?.rawResponse === true) {
      return new Response<T>(resp.data);
    }

    const task = resp?.data?.status as TaskParams;

    return new Response<T>(
      resp.data.data,
      task ? new Task<T>(this, task) : undefined,
      {
        client: this,
        responsePath: config?.responsePath,
        rawResponse: config?.rawResponse,
        expect: config?.expect,
      }
    );
  }
}
