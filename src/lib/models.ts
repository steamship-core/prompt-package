import { NludbApiBase } from './api_base';
import {
  CreateModelRequest, DeleteModelRequest, ListModelsResponse, ListPrivateModelsRequest, ListPublicModelsRequest, Model,
} from './types/models';

export class Models {
  nludb: NludbApiBase;

  constructor(nludb: NludbApiBase) {
    this.nludb = nludb;
  }

  async create(params: CreateModelRequest): Promise<Model> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('model/create', {
      ...params,
    })) as Model;
  }

  async listPublic(params?: ListPublicModelsRequest): Promise<ListModelsResponse> {
    return (await this.nludb.post('model/public', {
      ...params
    })) as ListModelsResponse;
  }

  async listPrivate(params?: ListPrivateModelsRequest): Promise<ListModelsResponse> {
    return (await this.nludb.post('model/private', {
      ...params
    })) as ListModelsResponse;
  }

  async delete(params: DeleteModelRequest): Promise<Model> {
    return (await this.nludb.post('model/delete', {
      ...params
    })) as Model;
  }
}
