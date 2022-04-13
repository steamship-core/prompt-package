import axios from 'axios';
import {
  Configuration,
  LoadConfigParams,
  loadConfiguration,
} from './shared/Configuration';
import {TaskParams, TaskState} from './types/base';
import {
  AddTaskCommentRequest,
  DeleteTaskCommentRequest,
  ListTaskCommentResponse,
  TaskCommentResponse,
} from './types/task_comment';
import {RemoteError} from "./steamship_error";

const _EXPECT_TASK = (client: ApiBase, data: unknown): Task<unknown> => {
  return new Task(client, data as TaskParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown): TaskList => {
  if (!data) {
    return {tasks: []}
  }
  return {
    tasks: ((data as any).tasks as Array<any>).map(x => _EXPECT_TASK(client, x))
  }
}

export interface TaskListParams {
  // The task ID
  id?: string
  // The space in which the task lives
  spaceId?: string
  // The state of the task
  state?: TaskState
}

export interface TaskList {
  tasks: Task<any>[]
}

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
  userId?: string;
  spaceId?: string;
  version?: string;
  name?: string;
  input?: string;
  maxRetries?: number;
  retries?: number;
  state?: string;
  statusMessage?: string;
  statusCode?: string;
  statusSuggestion?: string;
  taskCreatedOn?: string;
  taskLastModifiedOn?: string;
  taskExecutor?: string;
  taskType?: string;
  assignedWorker?: string;
  startedAt?: string


  constructor(client: ApiBase, params?: TaskParams) {
    this.client = client;
    this.update(params)
  }

  static async list(
    client: ApiBase,
    params?: TaskListParams,
    config?: Configuration
  ): Promise<Response<TaskList>> {
    return (await client.post(
      "/task/list",
      {...params},
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<TaskList>;
  }

  update(params?: TaskParams): Task<T> {
    if (params) {
      this.taskId = params?.taskId;
      this.userId = params?.userId;
      this.spaceId = params?.spaceId;
      this.version = params?.version;
      this.name = params?.name;
      this.input = params?.input;
      this.maxRetries = params?.maxRetries;
      this.retries = params?.retries;
      this.state = params?.state;
      this.statusMessage = params?.statusMessage;
      this.statusCode = params?.statusCode;
      this.statusSuggestion = params?.statusSuggestion;
      this.taskCreatedOn = params?.taskCreatedOn;
      this.taskLastModifiedOn = params?.taskLastModifiedOn;
      this.taskExecutor = params?.taskExecutor;
      this.taskType = params?.taskType;
      this.assignedWorker = params?.assignedWorker;
      this.startedAt = params?.startedAt;
    }
    return this;
  }

  completed(): boolean {
    return (
      this.state == TaskState.succeeded ||
      this.state == TaskState.failed
    );
  }

  failed(): boolean {
    return this.state == TaskState.failed;
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
    let {maxTimeoutSeconds, retryDelaySeconds} = params;
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
        statusMessage: "Can't add comment: no saved task was found for this item.",
      });
    return this.task.addComment(params);
  }

  async listComments(): Promise<Response<ListTaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        statusMessage: "Can't list comments: no saved task was found for this item.",
      });
    return this.task.listComments();
  }

  async deleteComment(
    params: DeleteTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (!this.task)
      throw new RemoteError({
        statusMessage: "Can't delete comment: no saved task was found for this item.",
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
          statusCode: 'UserMissing',
          statusMessage:
            "Can not invoke an app endpoint without the app owner's user handle.",
          statusSuggestion:
            'Provide the appOwner option, or initialize your app with a lookup.',
        });
      }
      let base = appBase || baseConfig.appBase;
      if (!base) {
        throw new RemoteError({
          statusCode: 'EndpointMissing',
          statusMessage:
            'Can not invoke an app endpoint without the App Base variable set.',
          statusSuggestion:
            'This should automatically have a good default setting. Reach out to our Steamship support.',
        });
      }

      const isLocalhost = base.includes('//localhost') ||
        base.includes('//127.0.0.1') ||
        base.includes('//0:0:0:0');

      if (isLocalhost) {
        // To make it easier to develop on localhost we'll pipe in the userHandle
        // in a header.
      } else {
        // Rewrite the base to be https://user.base
        const parts = base.split('//')
        if (parts.length < 2) {
          throw new RemoteError({
            statusCode: "EndpointInvalid",
            statusMessage: "You app base did not appear to begin with a valid HTTP or HTTPS protocol.",
            statusSuggestion: "Make sure you've provided an app base such as https://steamship.run, with the protocol."
          })
        }
        // Now we pre-pend the app-base to the first part!
        parts[1] = `${appOwner}.${parts[1]}`
        base = parts.join('//')
      }

      // Guard against a double // after the domain
      if ((base[base.length - 1] == '/') && operation && (operation[0] == '/')) {
        operation = operation?.slice(1)
      }
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
        statusCode: 'Authentication',
        statusMessage: 'API Key not found.',
        statusSuggestion:
          'Please see docs.steamship.com for a variety of ways to set your API key.',
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
      formData.append('file', config?.file, {filename: config?.filename});
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
        resp = await axios.get(url, {...reqConfig, params: finalPayload});
      } else {
        throw new RemoteError({statusMessage: `Unsupported HTTP Verb: ${verb}`});
      }
    } catch (error) {
      if ((error as any)?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new RemoteError({
          statusMessage: `[${(error as any)?.response?.status}] ${JSON.stringify(
            (error as any)?.response?.data
          )}`,
        });
      } else if ((error as any)?.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new RemoteError({
          statusMessage: `A request was made to ${url} but no response was received`,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new RemoteError({
          statusMessage: `The request to ${url} could not be configured. Message: ${(error as any)?.message}`,
        });
      }
      throw new RemoteError({
        statusMessage: 'An unexpected error happened during your request.',
      });
    }

    if (!resp) {
      throw new RemoteError({statusMessage: 'No response.'});
    }

    if (!resp.data) {
      throw new RemoteError({statusMessage: 'No body or task status in response.'});
    }

    // Is it an error?
    if (resp.data.reason) {
      throw new RemoteError({statusMessage: resp.data.reason});
    }

    // TODO: we might need to switch the task channel to the headers
    // to allow for async raw response! That way we can communicate
    // that the task is complete while also saving the response body for
    // binary.
    if (config?.rawResponse === true) {
      return new Response<T>(resp.data);
    }

    const task = resp?.data?.status as TaskParams;
    if (task?.state == TaskState.failed) {
      throw new RemoteError({...resp.data.error});
    }

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
