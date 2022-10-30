import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new Plugin(client, data as PluginParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
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
}

export class Plugin {
  id?: string;
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
  client: ApiBase;

  constructor(client: ApiBase, params: PluginParams) {
    this.client = client;
    this.id = params.id;
    this.type = params.type;
    this.url = params.url;
    this.transport = params.transport;
    this.isPublic = params.isPublic;
    this.isTrainable = params.isTrainable;
    this.trainingPlatform = params.trainingPlatform;
    this.handle = params.handle;
    this.description = params.description;
    this.dimensionality = params.dimensionality;
    this.limitAmount = params.limitAmount;
    this.limitUnit = params.limitUnit;
    this.apiKey = params.apiKey;
    this.metadata = params.metadata;
  }

  static async create(
    client: ApiBase,
    params: CreatePluginParams,
    config?: Configuration
  ): Promise<Response<Plugin>> {
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
    )) as Response<Plugin>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<Plugin>> {
    return (await client.post(
      'plugin/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'plugin',
        ...config,
      }
    )) as Response<Plugin>;
  }

  static async list(
    client: ApiBase,
    params?: any,
    config?: Configuration
  ): Promise<Response<PluginList>> {
    return (await client.post(
      'plugin/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Response<PluginList>;
  }
}
