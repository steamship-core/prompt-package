import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new AppInstance(client, data as AppInstanceParams);
};

export interface AppInstanceParams {
  id?: string;
  name?: string;
  handle?: string;
  appId?: string;
  appInstanceId?: string;
  appVersionId?: string;
  userId?: string;
  userHandle?: string;
  spaceId?: string;
}

export interface CreateAppInstance {
  id?: string;
  name?: string;
  handle?: string;
  appId?: string;
  appVersionId?: string;
  spaceId?: string;
  upsert?: boolean;
}

export class AppInstance {
  id?: string;
  name?: string;
  handle?: string;
  appId?: string;
  appVersionId?: string;
  spaceId?: string;
  userId?: string;
  userHandle?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: AppInstanceParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.appId = params.appId;
    this.appVersionId = params.appVersionId;
    this.spaceId = params.appInstanceId;
    this.userId = params.userId;
    this.userHandle = params.userHandle;
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
        ...config,
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
      'app/instance/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'appInstance',
        ...config,
      }
    )) as Response<AppInstance>;
  }

  get(
    path: string,
    params?: Record<string, unknown>,
    config?: Configuration
  ): Promise<unknown> {
    return this.client.get(
      `/_/_/${path[0] == '/' ? path.slice(1) : path}`,
      { ...params },
      {
        ...config,
        appCall: true,
        appOwner: this.userHandle,
        appId: this.appId,
        appInstanceId: this.id,
      }
    );
  }

  post(
    path: string,
    params?: Record<string, unknown>,
    config?: Configuration
  ): Promise<unknown> {
    return this.client.post(
      `/_/_/${path[0] == '/' ? path.slice(1) : path}`,
      { ...params },
      {
        ...config,
        appCall: true,
        appOwner: this.userHandle,
        appId: this.appId,
        appInstanceId: this.id,
      }
    );
  }

  async full_url_for(path: string, appHandle: string, useSubdomain = true) {
    const appBase = (await this.client.config).appBase;
    if (appBase === undefined) {
      throw `No appBase found in config. Try logging in with "ship login"`;
    }

    let base = appBase;
    if (useSubdomain) {
      let parts = appBase.split('://');
      // TODO(eob): In the Python client, I think there is a bug?
      if (parts?.length == 1) {
        parts = ['https', parts[0]];
      }
      base = `${parts[0]}://${this.userHandle}.${parts[1]}`;
    }

    if (!base.endsWith('/')) {
      base = base + '/';
    }

    if (!useSubdomain) {
      base = `${base}@${this.userHandle}`;
    }

    return `${base}${appHandle}/${this.handle}/${path}`;
  }
}
