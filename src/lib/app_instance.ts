
import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => { 
  return new AppInstance(client, data as AppInstanceParams) 
}

export interface AppInstanceParams {
  id?: string;
  name?: string;
  handle?: string;
  appInstanceId?: string;
  appVersionId?: string;
  spaceId?: string;
}

export interface CreateAppInstance {
  id?: string;
  name?: string;
  handle?: string;
  appInstanceId?: string;
  appVersionId?: string;
  spaceId?: string;
  upsert?: boolean;
}

export class AppInstance {
  id?: string;
  name?: string;
  handle?: string;
  appInstanceId?: string;
  appVersionId?: string;
  spaceId?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: AppInstanceParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.appInstanceId = params.appInstanceId;
    this.appVersionId = params.appVersionId;
    this.spaceId = params.appInstanceId;
  }

  async delete(config?: Configuration): Promise<Response<AppInstance>> {
    return (await this.client.post(
      'app/instance/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'appInstance',
        ...config
      }
    )) as Response<AppInstance>;
  }

  static async create(
    client: ApiBase,
    params: CreateAppInstance,
    config?: Configuration
  ): Promise<Response<AppInstance>> {
    return (await client.post(
      'app/instance/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'appInstance',
      }
    )) as Response<AppInstance>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<AppInstance>> {
    return (await client.post(
      'app/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'appVersion',
        ...config
      },
    )) as Response<AppInstance>;
  }
}
