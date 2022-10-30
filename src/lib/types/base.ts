export enum TaskState {
  waiting = 'waiting',
  running = 'running',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface TaskParams {
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
