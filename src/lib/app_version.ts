import { ApiBase, Response } from './api_base';
import { readFile } from './file';
import { Configuration } from './shared/Configuration';
import { MimeTypes } from './types/file';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new AppVersion(client, data as AppVersionParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  if (!data) {
    return []
  }
  return {
    appVersions: ((data as any).appVersions as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface GetParams {
  id?: string;
  handle?: string;
  appId?: string;
}

export interface AppVersionListParams {
  appId?: string
}

export interface AppVersionList {
  appVersions: AppVersion[]
}

export interface AppVersionParams {
  id?: string;
  handle?: string;
  appId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
  configTemplate?: Record<string, any>
}

export interface CreateParams {
  filename: string;
  appId: string;
  handle?: string;
  configTemplate?: Record<string, any>
}

export class AppVersion {
  id?: string;
  handle?: string;
  appId?: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
  description?: string;
  client: ApiBase;
  configTemplate?: Record<string, any>

  constructor(client: ApiBase, params: AppVersionParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.appId = params.appId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.isDefault = params.isDefault;
    this.description = params.description;
    this.configTemplate = params.configTemplate
  }

  static async create(
    client: ApiBase,
    params: CreateParams,
    config?: Configuration,
  ): Promise<Response<AppVersion>> {
    if (!params.filename) {
      throw Error('A filename must be provided to create a new app version.');
    }
    if (!params.filename.toLowerCase().endsWith('.zip')) {
      throw Error(
        'Only .zip archives can be used to create a new app version.'
      );
    }
    let buffer: Buffer | undefined = undefined;

    buffer = await readFile(params.filename);

    return (await client.post(
      'app/version/create',
      {
        type: 'file',
        handle: params.handle,
        mimeType: MimeTypes.ZIP,
        appId: params.appId,
        configTemplate: JSON.stringify(params.configTemplate)
      },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'appVersion',
        file: buffer,
        filename: params.filename,
      }
    )) as Response<AppVersion>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<AppVersion>> {
    return (await client.post(
      'app/version/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'appVersion',
        ...config,
      }
    )) as Response<AppVersion>;
  }

  static async list(
    client: ApiBase,
    params?: AppVersionListParams,
    config?: Configuration
  ): Promise<Response<AppVersionList>> {
    return (await client.post(
      "app/version/list",
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<AppVersionList>;
  }

  async delete(config?: Configuration): Promise<Response<AppVersion>> {
    return (await this.client.post(
      'app/version/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'appVersion',
        ...config,
      }
    )) as Response<AppVersion>;
  }
}
