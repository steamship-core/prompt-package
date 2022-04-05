import { ApiBase, Response } from './api_base';
import { readFile } from './file';
import { Configuration } from './shared/Configuration';
import { MimeTypes } from './types/file';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new PluginVersion(client, data as PluginVersionParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  if (!data) {
    return []
  }
  return {
    pluginVersions: ((data as any).pluginVersions as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface GetParams {
  id?: string;
  name?: string;
  handle?: string;
  pluginId?: string;
}

export interface PluginVersionListParams {
  pluginId?: string
}

export interface PluginVersionList {
  pluginVersions: PluginVersion[]
}

export interface PluginVersionParams {
  id?: string;
  name?: string;
  handle?: string;
  pluginId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
}

export interface CreateParams {
  filename: string;
  pluginId: string;
  name?: string;
  handle?: string;
}

export class PluginVersion {
  id?: string;
  name?: string;
  handle?: string;
  pluginId?: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
  description?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: PluginVersionParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.pluginId = params.pluginId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.isDefault = params.isDefault;
    this.description = params.description;

  }

  async delete(config?: Configuration): Promise<Response<PluginVersion>> {
    return (await this.client.post(
      'plugin/version/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'pluginVersion',
        ...config,
      }
    )) as Response<PluginVersion>;
  }

  static async create(
    client: ApiBase,
    params: CreateParams,
    config?: Configuration
  ): Promise<Response<PluginVersion>> {
    if (!params.filename) {
      throw Error('A filename must be provided to create a new plugin version.');
    }
    if (!params.filename.toLowerCase().endsWith('.zip')) {
      throw Error(
        'Only .zip archives can be used to create a new plugin version.'
      );
    }
    let buffer: Buffer | undefined = undefined;

    if (!params.name) {
      const parts = params.filename.split('/');
      params.name = parts[parts.length - 1];
    }
    buffer = await readFile(params.filename);

    return (await client.post(
      'plugin/version/create',
      {
        name: params.name,
        type: 'file',
        handle: params.handle,
        mimeType: MimeTypes.ZIP,
        pluginId: params.pluginId,
      },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'pluginVersion',
        file: buffer,
        filename: params.filename,
      }
    )) as Response<PluginVersion>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<PluginVersion>> {
    return (await client.post(
      'plugin/version/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'pluginVersion',
        ...config,
      }
    )) as Response<PluginVersion>;
  }

  static async list(
    client: ApiBase,
    params?: PluginVersionListParams,
    config?: Configuration
  ): Promise<Response<PluginVersionList>> {
    return (await client.post(
      'plugin/version/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<PluginVersionList>;
  }
}
