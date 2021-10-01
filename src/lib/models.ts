import { NludbApiBase, NludbResponse } from './api_base';
import {
  CreateModelRequest, DeleteModelRequest, ListModelsResponse, ListPrivateModelsRequest, ListPublicModelsRequest, Model,
} from './types/models';

export class Models {
  nludb: NludbApiBase;

  constructor(nludb: NludbApiBase) {
    this.nludb = nludb;
  }

  async create(params: CreateModelRequest): Promise<NludbResponse<Model>> {
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('model/create', {
      ...params,
    })) as NludbResponse<Model>;
  }

  async listPublic(params?: ListPublicModelsRequest): Promise<NludbResponse<ListModelsResponse>> {
    return (await this.nludb.post('model/public', {
      ...params
    })) as NludbResponse<ListModelsResponse>;
  }

  async listPrivate(params?: ListPrivateModelsRequest): Promise<NludbResponse<ListModelsResponse>> {
    return (await this.nludb.post('model/private', {
      ...params
    })) as NludbResponse<ListModelsResponse>;
  }

  async delete(params: DeleteModelRequest): Promise<NludbResponse<Model>> {
    return (await this.nludb.post('model/delete', {
      ...params
    })) as NludbResponse<Model>;
  }
}
