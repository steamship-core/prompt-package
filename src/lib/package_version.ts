import { readFile } from './file.js';
import { IApiBase } from './shared/BaseInterfaces.js';
import { Configuration } from './shared/Configuration.js';
import { Task } from './task.js';
import { MimeTypes } from './types/file.js';

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new PackageVersion(client, data as PackageVersionParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  if (!data) {
    return [];
  }
  return {
    packageVersions: ((data as any).packageVersions as Array<any>).map((x) =>
      _EXPECT(client, x)
    ),
  };
};

export interface GetParams {
  id?: string;
  handle?: string;
  packageId?: string;
  packageHandle?: string;
}

export interface PackageVersionListParams {
  packageId?: string;
}

export interface PackageVersionList {
  packageVersions: PackageVersion[];
}

export interface PackageVersionParams {
  id?: string;
  handle?: string;
  packageId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
  configTemplate?: Record<string, any>;
}

export interface CreateParams {
  filename: string;
  packageId: string;
  handle?: string;
  configTemplate?: Record<string, any>;
}

export class PackageVersion {
  id?: string;
  handle?: string;
  packageId?: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
  description?: string;
  client: IApiBase;
  configTemplate?: Record<string, any>;

  constructor(client: IApiBase, params: PackageVersionParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.packageId = params.packageId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.isDefault = params.isDefault;
    this.description = params.description;
    this.configTemplate = params.configTemplate;
  }

  static async create(
    client: IApiBase,
    params: CreateParams,
    config?: Configuration
  ): Promise<Task<PackageVersion>> {
    if (!params.filename) {
      throw Error(
        'A filename must be provided to create a new package version.'
      );
    }
    if (!params.filename.toLowerCase().endsWith('.zip')) {
      throw Error(
        'Only .zip archives can be used to create a new package version.'
      );
    }
    let buffer: Buffer | undefined = undefined;

    buffer = await readFile(params.filename);

    return (await client.post(
      'package/version/create',
      {
        type: 'file',
        handle: params.handle,
        mimeType: MimeTypes.ZIP,
        packageId: params.packageId,
        configTemplate: JSON.stringify(params.configTemplate),
      },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'packageVersion',
        file: buffer,
        filename: params.filename,
      }
    )) as Task<PackageVersion>;
  }

  static async get(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<PackageVersion>> {
    return (await client.post(
      'package/version/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'packageVersion',
        ...config,
      }
    )) as Task<PackageVersion>;
  }

  static async list(
    client: IApiBase,
    params?: PackageVersionListParams,
    config?: Configuration
  ): Promise<Task<PackageVersionList>> {
    return (await client.post(
      'package/version/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<PackageVersionList>;
  }
}
