import { ApiBase, Response } from './api_base';
import { readFile } from './file';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';
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

export interface AppVersionListParams {
  appId?: string
}

export interface AppVersionList {
  appVersions: AppVersion[]
}

export interface AppVersionParams {
  id?: string;
  name?: string;
  handle?: string;
  appId?: string;
}

export interface CreateParams {
  filename: string;
  appId: string;
  name?: string;
  handle?: string;
}

export class AppVersion {
  id?: string;
  name?: string;
  handle?: string;
  appId?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: AppVersionParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.appId = params.appId;
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

  static async create(
    client: ApiBase,
    params: CreateParams,
    config?: Configuration
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

    if (!params.name) {
      const parts = params.filename.split('/');
      params.name = parts[parts.length - 1];
    }
    buffer = await readFile(params.filename);

    return (await client.post(
      'app/version/create',
      {
        name: params.name,
        type: 'file',
        handle: params.handle,
        mimeType: MimeTypes.ZIP,
        appId: params.appId,
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
      'app/version/list',
      {...params},
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<AppVersionList>;
  }
}
