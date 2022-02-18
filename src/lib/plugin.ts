import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new Plugin(client, data as PluginParams);
};

export interface PluginParams {
  id?: string;
  name?: string;
  type?: string;
  url?: string;
  transport?: string;
  isPublic?: boolean;
  handle?: string;
  description?: string;
  dimensionality?: number;
  limitAmount?: number;
  limitUnit?: string;
  apiKey?: string;
  metadata?: unknown;
}

export interface CreatePluginParams {
  name?: string;
  type?: string;
  url?: string;
  transport?: string;
  isPublic?: boolean;
  handle?: string;
  description?: string;
  dimensionality?: number;
  limitAmount?: number;
  limitUnit?: string;
  apiKey?: string;
  metadata?: unknown;
  upsert?: boolean;
  spaceId?: string;
  spaceHandle?: string;
}

export class Plugin {
  id?: string;
  name?: string;
  type?: string;
  url?: string;
  transport?: string;
  isPublic?: boolean;
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
    this.name = params.name;
    this.type = params.type;
    this.url = params.url;
    this.transport = params.transport;
    this.isPublic = params.isPublic;
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
}