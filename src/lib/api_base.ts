import axios from 'axios';
import { Category } from 'typescript-logging-category-style/dist/bundle/src/typescript/main/api/Category';

import { logger } from './log_config';
import {
  Configuration,
  LoadConfigParams,
  loadConfiguration,
} from './shared/Configuration';
import { SteamshipError } from './steamship_error';
import { TaskParams, TaskState } from './types/base';
import {
  AddTaskCommentRequest,
  DeleteTaskCommentRequest,
  ListTaskCommentResponse,
  TaskCommentResponse,
} from './types/task_comment';

const MAX_BODY_LENGTH = 100000 * 1000;

const _EXPECT_TASK = (client: ApiBase, data: unknown): Task<unknown> => {
  return new Task(client, data as TaskParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown): TaskList => {
  if (!data) {
    return { tasks: [] };
  }
  return {
    tasks: ((data as any).tasks as Array<any>).map((x) =>
      _EXPECT_TASK(client, x)
    ),
  };
};

const _IS_LOCAL = (base: string): boolean => {
  for (const s of [
    'localhost',
    '127.0.0.1',
    '0:0:0:0',
    'host.docker.internal',
    '/test:',
  ]) {
    if (base.includes(s)) {
      return true;
    }
  }
  return false;
};

export type Verb = 'POST' | 'GET';

export interface TaskListParams {
  // The task ID
  id?: string;
  // The workspace in which the task lives
  workspaceId?: string;
  // The state of the task
  state?: TaskState;
}

export interface TaskList {
  tasks: Task<any>[];
}

export interface PostConfig<T> extends Configuration {
  responsePath?: string;
  rawResponse?: boolean;
  file?: Buffer;
  filename?: string;
  expect?: (client: ApiBase, data: unknown) => T;
  isPackageCall?: boolean;
  asBackgroundTask?: boolean;
  packageOwner?: string;
  packageId?: string;
  packageInstanceId?: string;
}

export class Task<T> implements TaskParams {
  client: ApiBase;
  taskId?: string;
  userId?: string;
  workspaceId?: string;
  version?: string;
  name?: string;
  input?: string;
  maxRetries?: number;
  retries?: number;
  state?: TaskState;
  statusMessage?: string;
  statusCode?: string;
  statusSuggestion?: string;
  taskCreatedOn?: string;
  taskLastModifiedOn?: string;
  taskExecutor?: string;
  taskType?: string;
  assignedWorker?: string;
  startedAt?: string;

  constructor(client: ApiBase, params?: TaskParams) {
    this.client = client;
    this.update(params);
  }

  static async list(
    client: ApiBase,
    params?: TaskListParams,
    config?: Configuration
  ): Promise<Response<TaskList>> {
    return (await client.post(
      '/task/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Response<TaskList>;
  }

  update(params?: TaskParams): Task<T> {
    if (params) {
      this.taskId = params?.taskId;
      this.userId = params?.userId;
      this.workspaceId = params?.workspaceId;
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
    return this.state == TaskState.succeeded || this.state == TaskState.failed;
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
      throw new SteamshipError({
        statusMessage:
          "Can't add comment: no saved task was found for this item.",
      });
    return this.task.addComment(params);
  }

  async listComments(): Promise<Response<ListTaskCommentResponse>> {
    if (!this.task)
      throw new SteamshipError({
        statusMessage:
          "Can't list comments: no saved task was found for this item.",
      });
    return this.task.listComments();
  }

  async deleteComment(
    params: DeleteTaskCommentRequest
  ): Promise<Response<TaskCommentResponse>> {
    if (!this.task)
      throw new SteamshipError({
        statusMessage:
          "Can't delete comment: no saved task was found for this item.",
      });
    return this.task.deleteComment(params);
  }
}

export interface SwitchWorkspaceParams {
  workspaceHandle?: string;
  workspaceId?: string;
  failIfWorkspaceExists?: boolean;
}

export class ApiBase {
  config: Promise<Configuration>;
  logger: Category;
  public constructor(params?: LoadConfigParams) {
    this.logger = logger.getChildCategory('ApiBase');
    this.config = loadConfiguration(params);
    this.config.then(() => {
      this.switchWorkspace({
        workspaceHandle: params?.workspace,
        failIfWorkspaceExists: params?.failIfWorkspaceExists === true,
      });
    });
  }

  /*
    Switches this client to the requested workspace, possibly creating it. If all arguments are None, the client
    actively switches into the default workspace.

    - API calls are performed manually to not result in circular imports.
    - Note that the default workspace is technically not necessary for API usage; it will be assumed by the Engine
      in the absense of a Workspace ID or Handle being manually specified in request headers.
   */
  async switchWorkspace(params?: SwitchWorkspaceParams) {
    let workspace: any | undefined = undefined;
    const p: SwitchWorkspaceParams = { ...params };

    if (!p.workspaceHandle && !p.workspaceId) {
      // Switch to the default workspace since no named or ID'ed workspace was provided
      p.workspaceHandle = 'default';
    }

    if (p.failIfWorkspaceExists) {
      this.logger.info(
        `Creating workspace with handle/id: ${p.workspaceHandle}/${p.workspaceId}.`
      );
    } else {
      this.logger.info(
        `Creating/Fetching workspace with handle/id: ${p.workspaceHandle}/${p.workspaceId}.`
      );
    }

    // Zero out the workspace_handle on the config block in case we're being invoked from
    // `init` (otherwise we'll attempt to create the sapce IN that nonexistant workspace)
    const oldWorkspaceHandle = (await this.config).workspaceHandle;
    (await this.config).workspaceHandle = undefined;

    try {
      if (p.workspaceHandle && p.workspaceId) {
        const getParams = {
          handle: p.workspaceHandle,
          id: p.workspaceId,
        };
        workspace = await this.post('workspace/get', getParams);
      } else if (p.workspaceHandle) {
        const getParams = {
          handle: p.workspaceHandle,
          id: p.workspaceId,
          fetchIfExists: !(p.failIfWorkspaceExists === true),
        };
        workspace = await this.post('workspace/create', getParams);
      } else if (p.workspaceId) {
        const getParams = {
          id: p.workspaceId,
        };
        workspace = await this.post('workspace/get', getParams);
      }
    } catch (e) {
      (await this.config).workspaceHandle = oldWorkspaceHandle;
      throw e;
    }

    if (!workspace) {
      throw new SteamshipError({
        statusMessage:
          'Was unable to switch to new workspace: server returned empty Workspace.',
      });
    }

    let returnId = null;
    let returnHandle = null;

    if (workspace && workspace['data'] && workspace['data']['workspace']) {
      returnId = workspace['data']['workspace']['id'];
      returnHandle = workspace['data']['workspace']['handle'];
    }

    if (!returnHandle || !returnId) {
      throw new SteamshipError({
        statusMessage:
          'Was unable to switch to new workspace: server returned empty ID and Handle.',
      });
    }

    // Finally, set the new workspace
    // (await this.config).workspaceHandle = returnHandle
    // (await this.config).workspaceId = returnId

    this.logger.info(`Switched to workspace ${returnHandle}/${returnId}`);
  }

  _headers<T>(
    config: Configuration,
    postConfig?: PostConfig<T>
  ): { [name: string]: string } {
    const ret: { [name: string]: string } = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };

    if (postConfig?.workspaceId) {
      ret['X-Workspace-Id'] = postConfig?.workspaceId;
    } else if (config.workspaceId) {
      ret['X-Workspace-Id'] = config.workspaceId;
    } else if (config.workspaceHandle) {
      ret['X-Workspace-Handle'] = config.workspaceHandle;
    }

    if (postConfig?.isPackageCall === true) {
      if (postConfig?.packageOwner) {
        ret['X-Package-Owner-Handle'] = postConfig.packageOwner;
      }
      if (postConfig?.packageId) {
        ret['X-Package-Id'] = postConfig.packageId;
      }
      if (postConfig?.packageInstanceId) {
        ret['X-Package-Instance-Id'] = postConfig.packageInstanceId;
      }
    }

    if (postConfig?.asBackgroundTask === true) {
      // Will result in the engine persisting the inbound HTTP request as a Task for deferred
      // execution. The client will receive task information back instead of the synchronous API response.
      // That task can be polled for eventual completion.
      ret['X-Task-Background'] = 'true';
    }
    return ret;
  }

  _url<T>(
    baseConfig: Configuration,
    postConfig?: PostConfig<T>,
    operation?: string
  ): string {
    let base: string | undefined = '';

    if (!(postConfig?.isPackageCall === true)) {
      // It's an API call
      base = postConfig?.apiBase || baseConfig.apiBase;
    } else {
      // It's a package call
      if (!postConfig?.packageOwner) {
        throw new SteamshipError({
          statusCode: 'UserMissing',
          statusMessage:
            "Can not invoke an package endpoint without the package owner's user handle.",
          statusSuggestion:
            'Provide the packageOwner option, or initialize your package with a lookup.',
        });
      }

      base = postConfig?.appBase || baseConfig.appBase;

      if (!base) {
        throw new SteamshipError({
          statusCode: 'EndpointMissing',
          statusMessage:
            'Can not invoke an package endpoint without the App Base variable set.',
          statusSuggestion:
            'This should automatically have a good default setting. Reach out to our Steamship support.',
        });
      }

      if (!_IS_LOCAL(base)) {
        // Rewrite the base to be https://user.base
        const parts = base.split('//');
        if (parts.length < 2) {
          throw new SteamshipError({
            statusCode: 'EndpointInvalid',
            statusMessage:
              'You package base did not appear to begin with a valid HTTP or HTTPS protocol.',
            statusSuggestion:
              "Make sure you've provided an app base such as https://steamship.run, with the protocol.",
          });
        }
        // Now we pre-pend the app-base to the first part!
        parts[1] = `${postConfig?.packageOwner}.${parts[1]}`;
        base = parts.join('//');
      }
    }

    // Guard against a double // after the domain

    if (base && base[base.length - 1] == '/') {
      base = base.slice(0, base.length - 1);
    }
    if (operation && operation[0] == '/') {
      operation = operation.slice(1);
    }
    return `${base}/${operation}`;
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
    verb: Verb,
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<Response<T>> {
    const baseConfig = await this.config;
    if (!baseConfig.apiKey) {
      throw new SteamshipError({
        statusCode: 'Authentication',
        statusMessage: 'API Key not found.',
        statusSuggestion:
          'Please see docs.steamship.com for a variety of ways to set your API key.',
      });
    }

    const url = this._url(baseConfig, config, operation);
    const headers = this._headers(baseConfig, config);

    const reqConfig = {
      headers: headers,
      maxContentLength: MAX_BODY_LENGTH,
      maxBodyLength: MAX_BODY_LENGTH,
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
        throw new SteamshipError({
          statusMessage: `Unsupported HTTP Verb: ${verb}`,
        });
      }
    } catch (error) {
      let httpStatus = '';
      if ((error as any)?.response?.status) {
        httpStatus = `[HTTP ${(error as any)?.response?.status}] `;
      }
      const origMessage = `${httpStatus}${
        (error as Error).message
      }. When calling ${verb} ${url}`;
      let statusMessage = 'An unexpected error happened during your request.';

      if ((error as any)?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = (error as any)?.response?.data;
        if (data) {
          if (data.status) {
            statusMessage = JSON.stringify(data.status);
          } else {
            statusMessage = `${data}`;
          }
        }
      } else if ((error as any)?.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        statusMessage = `A request was made to ${url} but no response was received.`;
      } else {
        // Something happened in setting up the request that triggered an Error
        statusMessage = `The request to ${url} could not be configured.`;
      }
      throw new SteamshipError({
        statusMessage: statusMessage,
        origMessage: origMessage,
      });
    }

    if (!resp) {
      throw new SteamshipError({ statusMessage: 'No response.' });
    }

    if (!resp.data) {
      throw new SteamshipError({
        statusMessage: 'No body or task status in response.',
      });
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
      throw new SteamshipError({ statusMessage: task?.statusMessage });
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
