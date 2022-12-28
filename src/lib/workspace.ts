import { IApiBase } from './shared/BaseInterfaces.js';
import { Configuration } from './shared/Configuration.js';
import { CreateParams, GetParams } from './shared/Requests.js';
import { Task } from './task.js';

export interface WorkspaceParams {
  id?: string;
  handle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new Workspace(client, data as WorkspaceParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  return {
    workspaces: ((data as any).workspaces as Array<any>).map((x) =>
      _EXPECT(client, x)
    ),
  };
};

export interface WorkspaceList {
  workspaces: Workspace[];
}

export class Workspace {
  client: IApiBase;
  id?: string;
  handle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(client: IApiBase, params: WorkspaceParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
  }

  static async create(
    client: IApiBase,
    params?: CreateParams,
    config?: Configuration
  ): Promise<Task<Workspace>> {
    return (await client.post(
      'workspace/create',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'workspace',
        ...config,
      }
    )) as Task<Workspace>;
  }

  static async get(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<Workspace>> {
    return (await client.post(
      'workspace/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'workspace',
        ...config,
      }
    )) as Task<Workspace>;
  }

  static async list(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<WorkspaceList>> {
    return (await client.post(
      'workspace/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<WorkspaceList>;
  }

  async delete(config?: Configuration) {
    return (await this.client.post(
      'workspace/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'workspace',
        ...config,
      }
    )) as Task<Workspace>;
  }
}
