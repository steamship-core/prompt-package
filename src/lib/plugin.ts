import { IApiBase } from './shared/BaseInterfaces.js';
import { Configuration } from './shared/Configuration.js';
import { GetParams } from './shared/Requests.js';
import { Task } from './task.js';

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new Plugin(client, data as PluginParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  return {
    plugins: ((data as any).plugins as Array<any>).map((x) =>
      _EXPECT(client, x)
    ),
  };
};

export type PluginType =
  | 'fileImporter'
  | 'corpusImporter'
  | 'corpusExporter'
  | 'blockifier'
  | 'tagger'
  | 'embedder'
  | 'exporter';

export type PluginTransport = 'jsonOverHttp';

export type TrainingPlatform = 'ecs' | 'lambda';

export interface PluginParams {
  id?: string;
  type?: PluginType;
  url?: string;
  userId?: string;
  transport?: PluginTransport;
  isPublic?: boolean;
  isTrainable?: boolean;
  trainingPlatform?: TrainingPlatform;
  handle?: string;
  description?: string;
  dimensionality?: number;
  limitAmount?: number;
  limitUnit?: string;
  apiKey?: string;
  metadata?: unknown;
  readme?: string;
  profile?: any;
  featured?: boolean;
}

export interface ListPluginParams {
  featured?: boolean;
  public?: boolean;
  type?: PluginType;
}

export interface PluginList {
  plugins?: Plugin[];
}

export interface CreatePluginParams {
  type?: PluginType;
  url?: string;
  transport?: PluginTransport;
  isPublic?: boolean;
  isTrainable?: boolean;
  trainingPlatform?: TrainingPlatform;
  handle?: string;
  description?: string;
  dimensionality?: number;
  limitAmount?: number;
  limitUnit?: string;
  apiKey?: string;
  metadata?: unknown;
  fetchIfExists?: boolean;
  workspaceId?: string;
  workspaceHandle?: string;
  readme?: string;
  profile?: any;
}

export interface UpdatePluginParams {
  id?: string;
  handle?: string;
  readme?: string;
  profile?: any;
  description?: string;
}

export class Plugin {
  id?: string;
  type?: PluginType;
  url?: string;
  transport?: PluginTransport;
  isPublic?: boolean;
  isTrainable?: boolean;
  userId?: string;
  trainingPlatform?: TrainingPlatform;
  handle?: string;
  profile?: any;
  readme?: string;
  description?: string;
  dimensionality?: number;
  limitAmount?: number;
  limitUnit?: string;
  apiKey?: string;
  featured?: boolean;
  metadata?: unknown;
  client: IApiBase;

  constructor(client: IApiBase, params: PluginParams) {
    this.client = client;
    this.id = params.id;
    this.type = params.type;
    this.url = params.url;
    this.transport = params.transport;
    this.isPublic = params.isPublic;
    this.userId = params.userId;
    this.isTrainable = params.isTrainable;
    this.trainingPlatform = params.trainingPlatform;
    this.handle = params.handle;
    this.description = params.description;
    this.dimensionality = params.dimensionality;
    this.limitAmount = params.limitAmount;
    this.limitUnit = params.limitUnit;
    this.apiKey = params.apiKey;
    this.metadata = params.metadata;
    this.readme = params.readme;
    this.profile = params.profile;
    this.featured = params.featured;
  }

  static async create(
    client: IApiBase,
    params: CreatePluginParams,
    config?: Configuration
  ): Promise<Task<Plugin>> {
    if (params.metadata != undefined) {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await client.post(
      'plugin/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'plugin',
      }
    )) as Task<Plugin>;
  }

  static async get(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<Plugin>> {
    return (await client.post(
      'plugin/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'plugin',
        ...config,
      }
    )) as Task<Plugin>;
  }

  static async list(
    client: IApiBase,
    params?: ListPluginParams,
    config?: Configuration
  ): Promise<Task<PluginList>> {
    return (await client.post(
      'plugin/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<PluginList>;
  }

  async update(config?: Configuration): Promise<Task<Plugin>> {
    const params: UpdatePluginParams = {
      id: this.id,
      handle: this.handle,
      readme: this.readme,
      profile: this.profile,
      description: this.description,
    };
    return (await this.client.post(
      'package/update',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'package',
        ...config,
      }
    )) as Task<Plugin>;
  }
}
