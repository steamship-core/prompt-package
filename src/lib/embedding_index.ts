import { NludbApiBase, NludbResponse } from './api_base';
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
  nludb: NludbApiBase;

  constructor(nludb: NludbApiBase, name: string, model: string, id: string) {
    this.name = name;
    this.model = model;
    this.id = id;
    this.nludb = nludb;
  }

  async search(params: SearchRequest): Promise<NludbResponse<SearchResult>> {
    const res = (await this.nludb.post('embedding-index/search', {
      indexId: this.id,
      ...params,
    })) as NludbResponse<SearchResult>;
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

  async insert(params: InsertRequest): Promise<NludbResponse<InsertResult>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('embedding-index/insert', {
      indexId: this.id,
      ...params,
    })) as NludbResponse<InsertResult>;
  }

  async delete(): Promise<NludbResponse<DeleteResult>> {
    return (await this.nludb.post('embedding-index/delete', {
      indexId: this.id,
    })) as NludbResponse<DeleteResult>;
  }

  async embed(): Promise<NludbResponse<EmbedIndexResult>> {
    return (await this.nludb.post(
      'embedding-index/embed',
      {
        indexId: this.id,
      }
    )) as NludbResponse<EmbedIndexResult>;
  }

  async createSnapshot(): Promise<NludbResponse<IndexSnapshotResponse>> {
    return (await this.nludb.post(
      'embedding-index/snapshot/create',
      {
        indexId: this.id,
      }
    )) as NludbResponse<IndexSnapshotResponse>;
  }

  async listSnapshots(): Promise<NludbResponse<ListSnapshotsResponse>> {
    return (await this.nludb.post('embedding-index/snapshot/list', {
      indexId: this.id,
    })) as NludbResponse<ListSnapshotsResponse>;
  }

  async deleteSnapshot(snapshotId: string): Promise<NludbResponse<DeleteSnapshotsResponse>> {
    return (await this.nludb.post('embedding-index/snapshot/delete', {
      snapshotId: snapshotId,
    })) as NludbResponse<DeleteSnapshotsResponse>;
  }

}
