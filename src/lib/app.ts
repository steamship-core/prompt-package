import {ApiBase, Response} from './api_base';
import {Configuration} from './shared/Configuration';
import {GetParams} from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new App(client, data as AppParams)
}

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  return {
    apps: ((data as any).apps as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface AppList {
  apps: App[]
}

export interface AppParams {
  id?: string;
  handle?: string;
  userId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isPublic?: boolean;
  upsert?: boolean
}

export class App {
  id?: string;
  handle?: string;
  isPublic?: boolean;
  userId?: string;
  userHandle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: AppParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.isPublic = params.isPublic;
    this.description = params.description;
  }

  static async create(
    client: ApiBase,
    params?: AppParams,
    config?: Configuration
  ): Promise<Response<App>> {
    return (await client.post(
      'app/create',
      {...params},
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

  static async list(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<AppList>> {
    return (await client.post(
      'app/list',
      {...params},
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<AppList>;
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
}
