export enum NludbTaskStatus {
  waiting = 'waiting',
  running = 'running',
  succeeded = 'succeeded',
  failed = 'failed',
}
export interface TaskStatusResponse {
  taskId?: string;
  taskStatus?: string;
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
