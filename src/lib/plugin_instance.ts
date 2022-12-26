import { IApiBase } from './shared/BaseInterfaces';
import { Configuration } from './shared/Configuration';
import { Task } from './task';

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new PluginInstance(client, data as PluginInstanceParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  if (!data) {
    return [];
  }
  return {
    pluginInstances: ((data as any).pluginInstances as Array<any>).map((x) =>
      _EXPECT(client, x)
    ),
  };
};

export interface GetParams {
  id?: string;
  handle?: string;
  pluginHandle?: string;
}

export interface PluginInstanceListParams {
  pluginId?: string;
  pluginVersionId?: string;
  includeWorkspace?: boolean;
  acrossWorkspaces?: boolean;
}

export interface PluginInstanceList {
  pluginInstances: PluginInstance[];
}

export interface PluginInstanceParams {
  id?: string;
  handle?: string;
  pluginId?: string;
  pluginHandle?: string;
  pluginInstanceId?: string;
  pluginVersionHandle?: string;
  pluginVersionId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  userHandle?: string;
  workspaceId?: string;
  workspaceHandle?: string;
  config?: Record<string, any>;
}

export interface CreatePluginInstance {
  id?: string;
  handle?: string;
  pluginId?: string;
  pluginHandle?: string;
  pluginVersionId?: string;
  pluginVersionHandle?: string;
  workspaceId?: string;
  fetchIfExists?: boolean;
  config?: Record<string, any>;
}

export class PluginInstance {
  id?: string;
  handle?: string;
  pluginId?: string;
  pluginHandle?: string;
  pluginVersionId?: string;
  pluginVersionHandle?: string;
  workspaceId?: string;
  workspaceHandle?: string;
  userId?: string;
  userHandle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  client: IApiBase;
  config?: Record<string, any>;

  constructor(client: IApiBase, params: PluginInstanceParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.pluginId = params.pluginId;
    this.pluginHandle = params.pluginHandle;
    this.pluginVersionId = params.pluginVersionId;
    this.pluginVersionHandle = params.pluginVersionHandle;
    this.workspaceId = params.pluginInstanceId;
    this.workspaceHandle = params.workspaceHandle;
    this.userId = params.userId;
    this.userHandle = params.userHandle;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
    this.config = params.config;
  }

  static async create(
    client: IApiBase,
    params: CreatePluginInstance,
    config?: Configuration
  ): Promise<Task<PluginInstance>> {
    return (await client.post(
      'plugin/instance/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'pluginInstance',
      }
    )) as Task<PluginInstance>;
  }

  static async get(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<PluginInstance>> {
    return (await client.post(
      'plugin/instance/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'pluginInstance',
        ...config,
      }
    )) as Task<PluginInstance>;
  }

  static async list(
    client: IApiBase,
    params?: PluginInstanceListParams,
    config?: Configuration
  ): Promise<Task<PluginInstanceList>> {
    return (await client.post(
      'plugin/instance/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<PluginInstanceList>;
  }

  async delete(config?: Configuration): Promise<Task<PluginInstance>> {
    return (await this.client.post(
      'plugin/instance/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'pluginInstance',
        ...config,
      }
    )) as Task<PluginInstance>;
  }
}
