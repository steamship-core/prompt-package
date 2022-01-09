import { ApiBase, Response } from './api_base';
import {
  DeleteResult,
  DeleteSnapshotsResponse,
  EmbedIndexResult,
  IndexSnapshotResponse,
  InsertRequest,
  InsertResult,
  ListSnapshotsResponse,
  SearchRequest,
  SearchResult,
} from './types/embedding';

export class EmbeddingIndex {
  id: string;
  name: string;
  model: string;
  nludb: ApiBase;

  constructor(nludb: ApiBase, name: string, model: string, id: string) {
    this.name = name;
    this.model = model;
    this.id = id;
    this.nludb = nludb;
  }

  async search(params: SearchRequest): Promise<Response<SearchResult>> {
    const res = (await this.nludb.post('embedding-index/search', {
      indexId: this.id,
      ...params,
    })) as Response<SearchResult>;
    if (typeof res.data == 'undefined') {
      res.data = {} as SearchResult
    }
    if (typeof res.data.hits == 'undefined') {
      res.data.hits = [];
    }
    for (let i = 0; i < res.data.hits.length; i++) {
      try {
        if (res.data.hits[i].metadata) {
          res.data.hits[i].metadata = JSON.parse(res.data.hits[i].metadata as string);
        }
      } catch {
        // pass
      }
    }
    return res;
  }

  async insert(params: InsertRequest): Promise<Response<InsertResult>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('embedding-index/insert', {
      indexId: this.id,
      ...params,
    })) as Response<InsertResult>;
  }

  async delete(): Promise<Response<DeleteResult>> {
    return (await this.nludb.post('embedding-index/delete', {
      indexId: this.id,
    })) as Response<DeleteResult>;
  }

  async embed(): Promise<Response<EmbedIndexResult>> {
    return (await this.nludb.post(
      'embedding-index/embed',
      {
        indexId: this.id,
      }
    )) as Response<EmbedIndexResult>;
  }

  async createSnapshot(): Promise<Response<IndexSnapshotResponse>> {
    return (await this.nludb.post(
      'embedding-index/snapshot/create',
      {
        indexId: this.id,
      }
    )) as Response<IndexSnapshotResponse>;
  }

  async listSnapshots(): Promise<Response<ListSnapshotsResponse>> {
    return (await this.nludb.post('embedding-index/snapshot/list', {
      indexId: this.id,
    })) as Response<ListSnapshotsResponse>;
  }

  async deleteSnapshot(snapshotId: string): Promise<Response<DeleteSnapshotsResponse>> {
    return (await this.nludb.post('embedding-index/snapshot/delete', {
      snapshotId: snapshotId,
    })) as Response<DeleteSnapshotsResponse>;
  }

}
