
import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => { 
  return new App(client, data as AppParams) 
}

export interface AppParams {
  id?: string;
  name?: string;
  handle?: string;
  userId?: string;
  upsert?: boolean
}

export class App {
  id?: string;
  name?: string;
  handle?: string;
  userId?: string;
  userHandle?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: AppParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.userId = params.userId;
  }

  async delete(config?: Configuration): Promise<Response<App>> {
    return (await this.client.post(
      'app/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'app',
        ...config
      }
    )) as Response<App>;
  }

  static async create(
    client: ApiBase,
    params?: AppParams,
    config?: Configuration
  ): Promise<Response<App>> {
    return (await client.post(
      'app/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'app',
      }
    )) as Response<App>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<App>> {
    return (await client.post(
      'app/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'app',
        ...config
      },
    )) as Response<App>;
  }
}