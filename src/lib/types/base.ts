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

export interface ConnectionParams {
  // The full NLUDB base endpoint, including the version number
  // For example:
  // https://api.nludb.com/api/v1
  apiDomain?:string; // e.g. https://api.nludb.com/
  apiVersion?:string; // e.g. 1
  apiKey?:string;
}

export type Metadata = unknown
