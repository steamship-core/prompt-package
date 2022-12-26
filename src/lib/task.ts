import {
  IApiBase,
  ITask,
  TaskList,
  TaskListParams,
} from './shared/BaseInterfaces';
import { Configuration } from './shared/Configuration';
import { TaskParams, TaskState } from './types/base';
import {
  AddTaskCommentRequest,
  DeleteTaskCommentRequest,
  ListTaskCommentResponse,
  TaskCommentResponse,
} from './types/task_comment';

const _EXPECT_TASK = (client: IApiBase, data: unknown): ITask<unknown> => {
  return new Task(client, data as TaskParams<unknown>);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown): TaskList => {
  if (!data) {
    return { tasks: [] };
  }
  return {
    tasks: ((data as any).tasks as Array<any>).map((x) =>
      _EXPECT_TASK(client, x)
    ),
  };
};

export class Task<T> implements TaskParams<T>, ITask<T> {
  client: IApiBase;
  taskId?: string;
  userId?: string;
  workspaceId?: string;
  version?: string;
  name?: string;
  input?: string;
  output?: T;
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
  responsePath?: string;
  rawResponse?: boolean;
  objectConstructor?: (client: IApiBase, data: unknown) => T;

  constructor(client: IApiBase, params?: TaskParams<T>) {
    this.client = client;
    this.update(params);

    // Only set these the first time.
    this.responsePath = params?.responsePath;
    this.rawResponse = params?.rawResponse;
    this.objectConstructor = params?.objectConstructor;
  }

  static async list(
    client: IApiBase,
    params?: TaskListParams,
    config?: Configuration
  ): Promise<Task<TaskList>> {
    return (await client.post(
      '/task/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<TaskList>;
  }

  update(params?: TaskParams<T>): ITask<T> {
    if (params) {
      this.taskId = params?.taskId;
      this.userId = params?.userId;
      this.workspaceId = params?.workspaceId;
      this.version = params?.version;
      this.name = params?.name;
      this.input = params?.input;
      this.maxRetries = params?.maxRetries;
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
      this.setData(params?.output);
    }

    return this;
  }

  setData(data?: any) {
    if (typeof data != 'undefined') {
      if (data && this.responsePath) {
        if ((data as Record<string, unknown>)[this.responsePath]) {
          data = (data as Record<string, unknown>)[this.responsePath];
        }
      }

      if (data && this.objectConstructor) {
        this.output = this.objectConstructor(this.client, data);
      } else {
        this.output = data as T;
      }
    }
  }

  completed(): boolean {
    return this.state == TaskState.succeeded || this.state == TaskState.failed;
  }

  failed(): boolean {
    return this.state == TaskState.failed;
  }

  async wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<Task<T>> {
    // Bailout and defaults
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
    if (this.completed() === true) {
      return this;
    }

    // Start the wait loop.
    const start = Date.now(); // ms since epoch
    await this.check();
    if (this.completed() === true) {
      return this;
    }

    while ((Date.now() - start) / 1000.0 < maxTimeoutSeconds) {
      await new Promise((r) =>
        setTimeout(r, 1000 * (retryDelaySeconds as number))
      );
      await this.check();
      if (this.completed() === true) {
        return this;
      }
    }
    // If we're here, we timed out.
    return this;
  }

  async check(): Promise<Task<T> | undefined> {
    const result = await (this.client.post('task/status', {
      taskId: this.taskId,
    }) as Promise<Task<T>>);
    if (result) {
      this.update(result);
    }
    return this;
  }

  async addComment(
    params: AddTaskCommentRequest
  ): Promise<Task<TaskCommentResponse>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.client.post('task/comment/create', {
      taskId: this.taskId,
      ...params,
    })) as Task<TaskCommentResponse>;
  }

  async listComments(): Promise<Task<ListTaskCommentResponse>> {
    return (await this.client.post('task/comment/list', {
      taskId: this.taskId,
    })) as Task<ListTaskCommentResponse>;
  }

  async deleteComment(
    params: DeleteTaskCommentRequest
  ): Promise<Task<TaskCommentResponse>> {
    return (await this.client.post(
      'task/comment/delete',
      params
    )) as Task<TaskCommentResponse>;
  }
}
