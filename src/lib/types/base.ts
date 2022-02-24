export enum TaskStatus {
  waiting = 'waiting',
  running = 'running',
  succeeded = 'succeeded',
  failed = 'failed',
}
export interface TaskParams {
  taskId?: string;
  status?: string;
  statusMessage?: string;
  statusCode?: string;
  statusSuggestion?: string;
  taskCreatedOn?: string;
  taskLastModifiedOn?: string;
}

export interface SearchHit {
  value?: string;
  score?: number;
  id?: string;
  index?: number;
  indexSource?: string;
  externalId?: string;
  externalType?: string;
  metadata?: unknown;
  query?: string;
}

export type Metadata = unknown;
