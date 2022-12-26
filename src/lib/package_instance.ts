import { IApiBase, Verb } from './shared/BaseInterfaces';
import { Configuration } from './shared/Configuration';
import { Task } from './task';
import { Workspace } from './workspace';

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new PackageInstance(client, data as PackageInstanceParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  if (!data) {
    return [];
  }
  return {
    packageInstances: ((data as any).packageInstances as Array<any>).map((x) =>
      _EXPECT(client, x)
    ),
  };
};

export interface GetParams {
  id?: string;
  handle?: string;
  packageHandle?: string;
}

export interface PackageInstanceListParams {
  packageId?: string;
  packageVersionId?: string;
  includeWorkspace?: boolean;
  acrossWorkspaces?: boolean;
}

export interface PackageInstanceList {
  packageInstances: PackageInstance[];
}

export interface PackageInstanceParams {
  id?: string;
  handle?: string;
  packageId?: string;
  packageHandle?: string;
  packageInstanceId?: string;
  packageVersionId?: string;
  packageVersionHandle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  userHandle?: string;
  workspaceId?: string;
  workspaceHandle?: string;
  invocationURL?: string;
  config?: Record<string, any>;
}

export interface CreatePackageInstance {
  id?: string;
  handle?: string;
  packageId?: string;
  packageHandle?: string;
  packageVersionId?: string;
  packageVersionHandle?: string;
  workspaceId?: string;
  fetchIfExists?: boolean;
  config?: Record<string, any>;
}

export class PackageInstance {
  id?: string;
  handle?: string;
  packageId?: string;
  packageHandle?: string;
  packageVersionId?: string;
  packageVersionHandle?: string;
  workspaceId?: string;
  workspaceHandle?: string;
  userId?: string;
  userHandle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  client: IApiBase;
  invocationURL?: string;
  config?: Record<string, any>;

  constructor(client: IApiBase, params: PackageInstanceParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.packageId = params.packageId;
    this.packageHandle = params.packageHandle;
    this.packageVersionId = params.packageVersionId;
    this.packageVersionHandle = params.packageVersionHandle;
    this.workspaceId = params.workspaceId;
    this.workspaceHandle = params.workspaceHandle;
    this.userId = params.userId;
    this.userHandle = params.userHandle;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
    this.invocationURL = params.invocationURL;
    this.config = params.config;
  }

  public static async create(
    client: IApiBase,
    params: CreatePackageInstance,
    config?: Configuration
  ): Promise<Task<PackageInstance>> {
    return (await client.post(
      'package/instance/create',
      { ...params },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'packageInstance',
      }
    )) as Task<PackageInstance>;
  }

  public static async get(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<PackageInstance>> {
    return (await client.post(
      'package/instance/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'packageInstance',
        ...config,
      }
    )) as Task<PackageInstance>;
  }

  public static async list(
    client: IApiBase,
    params?: PackageInstanceListParams,
    config?: Configuration
  ): Promise<Task<PackageInstanceList>> {
    return (await client.post(
      'package/instance/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<PackageInstanceList>;
  }

  public async delete(config?: Configuration): Promise<Task<PackageInstance>> {
    return (await this.client.post(
      'package/instance/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'packageInstance',
        ...config,
      }
    )) as Task<PackageInstance>;
  }

  private async loadMissingWorkspaceHandle() {
    if (this.client && !this.workspaceHandle && this.workspaceId) {
      const workspace = await Workspace.get(this.client, {
        id: this.workspaceId,
      });
      if (workspace && workspace.output) {
        this.workspaceHandle = workspace.output.handle;
      }
    }
  }

  /**
   * Invokes a method on a Package, to be run in the cloud.
   *
   * @param path - The method name (HTTP path) being invoked. E.g. `greet`
   * @param params - A dictionary of parameters to provide to the method
   * @param verb? - An optional HTTP verb, either GET or POST. Default: POST.
   * @returns unknown - Depends upon method implementation
   */
  public async invoke(
    path: string,
    params?: Record<string, unknown>,
    verb: Verb = 'POST'
  ): Promise<unknown> {
    await this.loadMissingWorkspaceHandle();

    // Trim the leading / from path if there.
    if (path[0] == '/') {
      path = path.slice(1);
    }

    return this.client.call(
      verb,
      `/${this.workspaceHandle}/${this.handle}/${path}`,
      { ...params },
      {
        isPackageCall: true,
        packageOwner: this.userHandle,
        packageId: this.packageId,
        packageInstanceId: this.id,
        rawResponse: true,
        workspaceId: this.workspaceId,
      }
    );
  }

  /**
   * Returns the HTTP invocation URL for a method a Package, to be run in the cloud.
   *
   * @param path - The method name (HTTP path) being invoked. E.g. `greet`
   * @returns string
   */
  public async invocationUrl(path: string): Promise<string> {
    await this.loadMissingWorkspaceHandle();
    const baseConfig = await this.client.config;
    const postConfig = {
      isPackageCall: true,
      packageOwner: this.userHandle,
      packageId: this.packageId,
      packageInstanceId: this.id,
      rawResponse: true,
      workspaceId: this.workspaceId,
    };
    return this.client._url(baseConfig, postConfig, path);
  }
}
