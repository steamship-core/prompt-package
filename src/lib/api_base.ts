import axios from 'axios';

import { NLUDBError } from './nludb_error';
import { NludbTaskStatus, TaskStatusResponse } from './types/base';

export class NludbTask<ResultType> {
  nludb: NludbApiBase;
  taskId: string;
  taskStatus: string;
  taskCreatedOn: string;
  taskLastModifiedOn: string;
  result?: ResultType;

  constructor(
    nludb: NludbApiBase,
    params: TaskStatusResponse,
    result?: ResultType
  ) {
    this.nludb = nludb;
    this.taskId = params.taskId;
    this.taskStatus = params.taskStatus;
    this.taskCreatedOn = params.taskCreatedOn;
    this.taskLastModifiedOn = params.taskLastModifiedOn;
    this.result = result;
  }

  update(data: TaskStatusResponse | NludbTask<ResultType>) {
    this.taskId = data.taskId;
    this.taskStatus = data.taskStatus;
    this.taskCreatedOn = data.taskCreatedOn;
    this.taskLastModifiedOn = data.taskLastModifiedOn;
  }

  async check() {
    const status = await (this.nludb.post(
      'task/status',
      { taskId: this.taskId },
      true
    ) as Promise<NludbTask<TaskStatusResponse>>);
    this.update(status);
  }

  async wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<void> {
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
      return;
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
        return;
      }
      await new Promise((r) =>
        setTimeout(r, 1000 * (retryDelaySeconds as number))
      );
    }
    return;
  }
}

export class NludbApiBase {
  apiKey: string;
  endpoint: string;

  constructor(apiKey: string, endpoint = 'https://api.nludb.com/api/v1') {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async post<T>(
    operation: string,
    payload: unknown,
    asynchronous = false
  ): Promise<T | NludbTask<T>> {
    if (!this.apiKey) {
      throw new NLUDBError(
        'Please set your NLUDB API key using the NLUDB_KEY environment variable!'
      );
    }

    const url = `${this.endpoint}/${operation}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    const resp = await axios.post(url, payload, config);

    if (!resp) {
      throw new NLUDBError('No response.');
    }

    if (!resp.data) {
      throw new NLUDBError('No data in response.');
    }

    if (resp.data.reason) {
      throw new NLUDBError(resp.data.reason);
    }

    // Non-asynchronous response
    if (!asynchronous) {
      if (resp.data.data) {
        return resp.data.data as T;
      }
      throw new NLUDBError('No data property was present in response');
    }

    // Asynchronous Response
    if (resp.data.status) {
      return new NludbTask<T>(this, resp.data.status, resp.data.data);
    } else {
      if (resp.data.data) {
        return resp.data.data;
      }
      throw new NLUDBError(
        'Neither data nor status property was present in task response'
      );
    }
  }
}
