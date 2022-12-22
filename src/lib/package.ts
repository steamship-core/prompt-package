import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new Package(client, data as PackageParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  return {
    packages: ((data as any).packages as Array<any>).map((x) =>
      _EXPECT(client, x)
    ),
  };
};

export interface PackageList {
  packages: Package[];
}

export interface ListPackageParams {
  featured?: boolean;
  public?: boolean;
}

export interface PackageParams {
  id?: string;
  handle?: string;
  userId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isPublic?: boolean;
  fetchIfExists?: boolean;
  readme?: string;
  profile?: any;
  featured?: boolean;
}

export interface UpdatePackageParams {
  id?: string;
  handle?: string;
  readme?: string;
  profile?: any;
  description?: string;
}

export class Package {
  id?: string;
  handle?: string;
  description?: string;
  profile?: any;
  readme?: string;
  isPublic?: boolean;
  userId?: string;
  userHandle?: string;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
  client: ApiBase;

  constructor(client: ApiBase, params: PackageParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.isPublic = params.isPublic;
    this.description = params.description;
    this.readme = params.readme;
    this.profile = params.profile;
    this.featured = params.featured;
  }

  static async create(
    client: ApiBase,
    params?: PackageParams,
    config?: Configuration
  ): Promise<Response<Package>> {
    return (await client.post(
      'package/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'package',
      }
    )) as Response<Package>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<Package>> {
    return (await client.post(
      'package/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'package',
        ...config,
      }
    )) as Response<Package>;
  }

  async update(config?: Configuration): Promise<Response<Package>> {
    const params: UpdatePackageParams = {
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
    )) as Response<Package>;
  }

  static async list(
    client: ApiBase,
    params?: ListPackageParams,
    config?: Configuration
  ): Promise<Response<PackageList>> {
    return (await client.post(
      'package/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Response<PackageList>;
  }
}
