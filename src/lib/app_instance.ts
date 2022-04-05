import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new AppInstance(client, data as AppInstanceParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  if (!data) {
    return []
  }
  return {
    appInstances: ((data as any).appInstances as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface GetParams {
  id?: string;
  name?: string;
  handle?: string;
  appHandle?: string;
}

export interface AppInstanceListParams {
  appId?: string
  appVersionId?: string
}

export interface AppInstanceList {
  appInstances: AppInstance[]
}

export interface AppInstanceParams {
  id?: string;
  name?: string;
  handle?: string;
  appId?: string;
  appInstanceId?: string;
  appVersionId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  userHandle?: string;
  spaceId?: string;
  invocationURL?: string;
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
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  client: ApiBase;
  invocationURL?: string;

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
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
    this.invocationURL = params.invocationURL;
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

  async get(
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
        rawResponse: true,
      }
    );
  }

  static async list(
    client: ApiBase,
    params?: AppInstanceListParams,
    config?: Configuration
  ): Promise<Response<AppInstanceList>> {
    return (await client.post(
      'app/instance/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<AppInstanceList>;
  }

  async post(
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
        rawResponse: true
      }
    );
  }

  /**
   * Creates the URL that maps to a plugin to a specific instance
   * @param pluginEndpoint The endpoint in the plugin to run as the plugin
   * @param pluginHandle The handle to the plugin (not the plugin instance)
   * @returns A URL used to register a plugin
   */
  invocationUrl(pluginEndpoint: string) {
    // This is what we want for localhost development to avoid having to
    // set up dynamic subdomains on localhost.
    return `${this.invocationURL}${pluginEndpoint}`;
  }
}
