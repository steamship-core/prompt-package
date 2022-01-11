import { Metadata, SearchHit } from './base';

export interface CreateIndexRequest {
  name: string;
  model: string;
  upsert?: boolean;
}

export interface EmbedRequest {
  texts: string[];
  model: string;
}

export interface EmbedResult {
  embeddings: number[][];
}

export interface EmbedAndSearchRequest {
  docs: string[];
  query: string;
  model: string;
  k?: number;
  includeMetadata?: boolean;
}

export interface EmbedAndSearchResult {
  hits: SearchHit[];
}

export interface CreateIndexResult {
  id: string;
}

export interface SearchRequest {
  query?: string;
  queries?: string[];
  k?: number;
  includeMetadata?: boolean;
}

export interface SearchResult {
  hits: SearchHit[];
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
