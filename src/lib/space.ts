import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { CreateParams, GetParams } from './shared/Requests';

export interface SpaceParams {
  id?: string;
  handle?: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new Space(client, data as SpaceParams)
}

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  return {
    spaces: ((data as any).spaces as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface SpaceList {
  spaces: Space[]
}

export class Space {
  client: ApiBase;
  id?: string;
  name?: string;
  handle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(client: ApiBase, params: SpaceParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
  }

  async delete(
    config?: Configuration) {
    return (await this.client.post(
      'space/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'space',
        ...config
      }
    )) as Response<Space>;
  }

  static async create(
    client: ApiBase,
    params?: CreateParams,
    config?: Configuration
  ): Promise<Response<Space>> {
    return (await client.post(
      'space/create',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'space',
        ...config
      },
    )) as Response<Space>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<Space>> {
    return (await client.post(
      'space/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'space',
        ...config
      },
    )) as Response<Space>;
  }

  static async list(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<SpaceList>> {
    return (await client.post(
      'space/list',
      {...params},
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<SpaceList>;
  }
}
