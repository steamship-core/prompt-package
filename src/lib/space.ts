import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { CreateParams } from './shared/CreateParams';

export interface SpaceParams {
  id?: string;
  name?: string;
  handle?: string;
}

export class Space {
  client: ApiBase;
  id?: string;
  name?: string;
  handle?: string;

  constructor(client: ApiBase, params: SpaceParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
  }

  async delete(configuration?: Configuration) {
    return (await this.client.post(
      'space/delete',
      {
        id: this.id,
      },
      configuration
    )) as Response<SpaceParams>;
  }

  static async create(
    client: ApiBase,
    params: CreateParams,
    config?: Configuration
  ): Promise<Response<SpaceParams>> {
    return (await client.post(
      'space/create',
      params,
      config
    )) as Response<SpaceParams>;
  }
}
