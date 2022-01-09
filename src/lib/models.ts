import { ApiBase, Response } from './api_base';
import {
  CreateModelRequest, DeleteModelRequest, ListModelsResponse, ListPrivateModelsRequest, ListPublicModelsRequest, Model,
} from './types/models';

export class Models {
  nludb: ApiBase;

  constructor(nludb: ApiBase) {
    this.nludb = nludb;
  }

  async create(params: CreateModelRequest): Promise<Response<Model>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('model/create', {
      ...params,
    })) as Response<Model>;
  }

  async listPublic(params?: ListPublicModelsRequest): Promise<Response<ListModelsResponse>> {
    return (await this.nludb.post('model/public', {
      ...params
    })) as Response<ListModelsResponse>;
  }

  async listPrivate(params?: ListPrivateModelsRequest): Promise<Response<ListModelsResponse>> {
    return (await this.nludb.post('model/private', {
      ...params
    })) as Response<ListModelsResponse>;
  }

  async delete(params: DeleteModelRequest): Promise<Response<Model>> {
    return (await this.nludb.post('model/delete', {
      ...params
    })) as Response<Model>;
  }
}
