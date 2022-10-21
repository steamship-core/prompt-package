import {ApiBase, Response} from './api_base';
import {Configuration} from './shared/Configuration';
import {CreateParams, GetParams} from './shared/Requests';

export interface WorkspaceParams {
  id?: string;
  handle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new Workspace(client, data as WorkspaceParams)
}

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
  return {
    workspaces: ((data as any).workspaces as Array<any>).map(x => _EXPECT(client, x))
  }
}

export interface WorkspaceList {
  workspaces: Workspace[]
}

export class Workspace {
  client: ApiBase;
  id?: string;
  handle?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(client: ApiBase, params: WorkspaceParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.description = params.description;
  }

  static async create(
    client: ApiBase,
    params?: CreateParams,
    config?: Configuration
  ): Promise<Response<Workspace>> {
    return (await client.post(
      'workspace/create',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'workspace',
        ...config
      },
    )) as Response<Workspace>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<Workspace>> {
    return (await client.post(
      'workspace/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'workspace',
        ...config
      },
    )) as Response<Workspace>;
  }

  static async list(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<WorkspaceList>> {
    return (await client.post(
      'workspace/list',
      {...params},
      {
        expect: _EXPECT_LIST,
        ...config
      },
    )) as Response<WorkspaceList>;
  }

  async delete(
    config?: Configuration) {
    return (await this.client.post(
      'workspace/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'workspace',
        ...config
      }
    )) as Response<Workspace>;
  }
}
