import { ApiBase, Response } from './api_base';
import {
  CreateIndexRequest,
  DeleteResult,
  DeleteSnapshotsResponse,
  EmbeddingIndexParams,
  EmbedIndexResult,
  IndexSnapshotResponse,
  InsertRequest,
  InsertResult,
  ListSnapshotsResponse,
  SearchRequest,
  EmbeddingHit,
} from './types/embedding';
import {Configuration} from "./shared/Configuration";
import {QueryResults} from "./types/base";

const _EXPECT = (client: ApiBase, data: unknown): EmbeddingIndex => {
  return new EmbeddingIndex(client, data as EmbeddingIndexParams)
}

export class EmbeddingIndex {
  id?: string;
  name?: string;
  handle?: string;
  client: ApiBase;

  constructor(client: ApiBase, params?: EmbeddingIndexParams) {
    this.client = client;
    this.id = params?.id;
    this.name = params?.name;
    this.handle = params?.handle;
  }

  static async create(
    client: ApiBase,
    params: CreateIndexRequest,
    config?: Configuration
  ): Promise<Response<EmbeddingIndex>> {
    return (await client.post(
      'embedding-index/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'index',
      }
    )) as Response<EmbeddingIndex>;
  }

  async search(params: SearchRequest): Promise<Response<QueryResults<EmbeddingHit>>> {
    const res = (await this.client.post('embedding-index/search', {
      id: this.id,
      ...params,
    })) as Response<QueryResults<EmbeddingHit>>;
    if (typeof res.data == 'undefined') {
      res.data = {} as QueryResults<EmbeddingHit>;
    }
    if (typeof res.data.items == 'undefined') {
      res.data.items = [];
    }
    for (let i = 0; i < res.data.items.length; i++) {
      try {
        if (res.data.items[i].value) {
          if (res.data.items[i].value!.metadata) {
            res.data.items[i].value!.metadata = JSON.parse(
              res.data.items[i].value!.metadata as string
            );
          }
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
    return (await this.client.post('embedding-index/item/create', {
      indexId: this.id,
      ...params,
    })) as Response<InsertResult>;
  }

  async delete(): Promise<Response<DeleteResult>> {
    return (await this.client.post('embedding-index/delete', {
      id: this.id,
    })) as Response<DeleteResult>;
  }

  async embed(): Promise<Response<EmbedIndexResult>> {
    return (await this.client.post('embedding-index/embed', {
      id: this.id,
    })) as Response<EmbedIndexResult>;
  }

  async createSnapshot(): Promise<Response<IndexSnapshotResponse>> {
    return (await this.client.post('embedding-index/snapshot/create', {
      indexId: this.id,
    })) as Response<IndexSnapshotResponse>;
  }

  async listSnapshots(): Promise<Response<ListSnapshotsResponse>> {
    return (await this.client.post('embedding-index/snapshot/list', {
      indexId: this.id,
    })) as Response<ListSnapshotsResponse>;
  }

  async deleteSnapshot(
    snapshotId: string
  ): Promise<Response<DeleteSnapshotsResponse>> {
    return (await this.client.post('embedding-index/snapshot/delete', {
      snapshotId: snapshotId,
    })) as Response<DeleteSnapshotsResponse>;
  }
}
