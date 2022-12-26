import { IApiBase } from '../shared/BaseInterfaces';

export enum TaskState {
  waiting = 'waiting',
  running = 'running',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface TaskParams<T> {
  taskId?: string;
  userId?: string;
  workspaceId?: string;
  version?: string;
  name?: string;
  input?: string;
  maxRetries?: number;
  retries?: number;
  output?: any;
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
}

export type Metadata = unknown;

export interface QueryResult<T> {
  value?: T;
  score?: number;
  index?: number;
  id?: string;
}

export interface QueryResults<T> {
  items: QueryResult<T>[];
}
