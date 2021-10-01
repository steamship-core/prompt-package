import axios from 'axios';

import { NLUDBError } from './nludb_error';
import { ConnectionParams, NludbTaskStatus, TaskStatusResponse } from './types/base';
import { AddTaskCommentRequest, DeleteTaskCommentRequest, ListTaskCommentResponse, TaskCommentResponse } from './types/task_comment';

export class NludbTask<ResultType> implements TaskStatusResponse {
  nludb: NludbApiBase;
  taskId?: string;
  taskStatus?: string;
  taskCreatedOn?: string;
  taskLastModifiedOn?: string;

  constructor(
    nludb: NludbApiBase,
    params?: TaskStatusResponse,
  ) {
    this.nludb = nludb;
    this.taskId = params?.taskId;
    this.taskStatus = params?.taskStatus;
    this.taskCreatedOn = params?.taskCreatedOn;
    this.taskLastModifiedOn = params?.taskLastModifiedOn;
  }

  update(data?: TaskStatusResponse | NludbResponse<TaskStatusResponse>): NludbTask<ResultType> {
    if (!data) {
      return this;
    }
    if ((data as NludbResponse<TaskStatusResponse>).task) {
      // Invoke update on just the task
      this.update((data as NludbResponse<TaskStatusResponse>).task)
      return this
    }

    const task = data as TaskStatusResponse
    this.taskId = task.taskId;
    this.taskStatus = task.taskStatus;
    this.taskCreatedOn = task.taskCreatedOn;
    this.taskLastModifiedOn = task.taskLastModifiedOn;
    return this
  }

  async check(): Promise<NludbTask<ResultType>> {
    const status = await (this.nludb.post(
      'task/status',
      { taskId: this.taskId }
    ) as Promise<NludbResponse<TaskStatusResponse>>);
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

  async addComment(params: AddTaskCommentRequest): Promise<NludbResponse<TaskCommentResponse>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('task/comment/create', {
      taskId: this.taskId,
      ...params,
    })) as NludbResponse<TaskCommentResponse>;
  }

  async listComments(): Promise<NludbResponse<ListTaskCommentResponse>> {
    return (await this.nludb.post('task/comment/list', {
      taskId: this.taskId,
    })) as NludbResponse<ListTaskCommentResponse>;
  }

  async deleteComment(params: DeleteTaskCommentRequest): Promise<NludbResponse<TaskCommentResponse>> {
    return (await this.nludb.post('task/comment/delete', params)) as NludbResponse<TaskCommentResponse>;
  }

}

export class NludbResponse<ResultType> {
  data?: ResultType;
  task?: NludbTask<ResultType>

  public constructor(data?: ResultType, task?: NludbTask<ResultType>) {
    this.data = data
    this.task = task
  }

  async wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<NludbTask<ResultType> | undefined> {
    if (this.task) {
      return this.task.wait(params)
    }
    return undefined
  }

  update(data: TaskStatusResponse | NludbResponse<TaskStatusResponse>): NludbTask<ResultType> | undefined {
    if (this.task) {
      return this.task.update(data)
    }
    return undefined
  }

  async check(): Promise<NludbTask<ResultType> | undefined> {
    if (this.task) {
      return this.task.check()
    }
    return undefined
  }

  async addComment(params: AddTaskCommentRequest): Promise<NludbResponse<TaskCommentResponse>> {
    if (!this.task) throw new NLUDBError("Can't add comment: no saved task was found for this item.")
    return this.task.addComment(params)
  }

  async listComments(): Promise<NludbResponse<ListTaskCommentResponse>> {
    if (!this.task) throw new NLUDBError("Can't list comments: no saved task was found for this item.")
    return this.task.listComments()
  }

  async deleteComment(params: DeleteTaskCommentRequest): Promise<NludbResponse<TaskCommentResponse>> {
    if (!this.task) throw new NLUDBError("Can't delete comment: no saved task was found for this item.")
    return this.task.deleteComment(params)
  }

}

export class NludbApiBase {
  connectionParams: ConnectionParams;

  public constructor(connectionParams: ConnectionParams) {
    this.connectionParams = connectionParams
  }

  private apiPrefix() : string {
    let domain = this.connectionParams?.apiDomain || 'https://api.nludb.com/'
    if (domain[domain.length - 1] != '/') {
      domain = `${domain}/`
    }
    const version = this.connectionParams?.apiVersion || '1'
    domain = `${domain}api/v${version}/`
    if (domain[domain.length - 1] != '/') {
      domain = `${domain}/`
    }
    return domain
  }

  async post<T>(
    operation: string,
    payload: unknown
  ): Promise<NludbResponse<T>> {
    if (!this.connectionParams.apiKey) {
      throw new NLUDBError(
        'Please set your NLUDB API key using the NLUDB_KEY environment variable!'
      );
    }

    const url = `${this.apiPrefix()}${operation}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.connectionParams.apiKey}`,
      },
    };

    let resp = null;
    try {
      resp = await axios.post(url, payload, config);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new NLUDBError(`[${error.response.status}] ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new NLUDBError(`A request was made to ${url} but no response was received`);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new NLUDBError(`The request to ${url} could not be configured. Message: ${error.mesage}`);
      }
      throw new NLUDBError("An unexpected error happened during your request.")
    }

    if (!resp) {
      throw new NLUDBError('No response.');
    }

    if (!resp.data) {
      throw new NLUDBError('No body or task status in response.');
    }

    // Is it an error?
    if (resp.data.reason) {
      throw new NLUDBError(resp.data.reason);
    }

    return new NludbResponse<T>(
      resp.data.data as T,
      new NludbTask<T>(this, resp.data.status as TaskStatusResponse)
    )
  }
}
