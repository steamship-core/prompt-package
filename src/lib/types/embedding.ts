import {Metadata} from './base';

export interface EmbeddingIndexParams {
  id?: string;
  name?: string;
  handle?: string;
}

export interface CreateIndexRequest {
  pluginInstance: string;
  name?: string;
  handle?: string;
  externalId?: string;
  externalType?: string;
  metadata?: Metadata;
  upsert?: boolean;
}

export interface EmbedRequest {
  texts: string[];
  model: string;
}

export type Embedding = number[]

export interface EmbedResult {
  embeddings: Embedding[];
}

export interface EmbedAndSearchRequest {
  docs: string[]
  query: string;
  model: string;
  k?: number;
  includeMetadata?: boolean;
}

export interface EmbeddingHit {
  value?: string;
  indexSource?: string;
  externalId?: string;
  externalType?: string;
  metadata?: unknown;
  query?: string;
}

export interface SearchRequest {
  query?: string;
  queries?: string[];
  k?: number;
  includeMetadata?: boolean;
}

export interface InsertRequest {
  value: string;
  externalId?: string;
  externalType?: string;
  metadata?: Metadata;
  reindex?: boolean;
}

export interface InsertResult {
  indexId: string;
  id: string;
}

export interface DeleteResult {
  indexId: string;
}

export interface EmbedIndexResult {
  indexId: string;
}

export interface IndexSnapshotRequest {
  indexId: string;
}

export interface IndexSnapshotResponse {
  indexId: string;
  snapshotId: string;
}

export interface ListSnapshotsRequest {
  indexId: string;
}

export interface ListSnapshotsResponse {
  snapshots: IndexSnapshotResponse[];
}

export interface DeleteSnapshotsRequest {
  snapshotId: string;
}

export interface DeleteSnapshotsResponse {
  snapshotId: string;
}

