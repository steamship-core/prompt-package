import { IApiBase } from './shared/BaseInterfaces.js';
import { Configuration } from './shared/Configuration.js';
import { Task } from './task.js';

export interface TagList {
  tags: Tag[];
}

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new Tag(client, data as TagParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  return {
    tags: ((data as any).tags as Array<any>).map((x) => _EXPECT(client, x)),
  };
};

export interface TagParams {
  id?: string;
  workspaceId?: string;
  fileId?: string;
  blockId?: string;
  startIdx?: number;
  endIdx?: number;
  kind: string;
  name?: string;
  value?: any;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UploadParams {
  fileId?: string;
  blockId?: string;
  startIdx?: number;
  endIdx?: number;
  kind: string;
  name?: string;
  value?: any;
  text?: string;
}

export class Tag {
  id?: string;
  fileId?: string;
  blockId?: string;
  workspaceId?: string;
  startIdx?: number;
  endIdx?: number;
  kind: string;
  name?: string;
  value?: any;
  text?: string;
  createdAt?: string;
  updatedAt?: string;
  client: IApiBase;

  constructor(client: IApiBase, params: TagParams) {
    this.client = client;
    this.id = params.id;
    this.fileId = params.fileId;
    this.blockId = params.blockId;
    this.workspaceId = params.workspaceId;
    this.startIdx = params.startIdx;
    this.endIdx = params.endIdx;
    this.kind = params.kind;
    this.name = params.name;
    this.value = params.value;
    this.text = params.text;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static async create(
    client: IApiBase,
    params: UploadParams,
    config?: Configuration
  ): Promise<Task<Tag>> {
    return (await client.post('tag/create', params, {
      ...config,
      expect: _EXPECT,
      responsePath: 'tag',
    })) as Task<Tag>;
  }

  async delete(config?: Configuration): Promise<Task<Tag>> {
    return (await this.client.post(
      'tag/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'tag',
        ...config,
      }
    )) as Task<Tag>;
  }

  static async query(
    client: IApiBase,
    tagFilterQuery: string,
    config?: Configuration
  ): Promise<Task<TagList>> {
    return (await client.post(
      'tag/query',
      { tagFilterQuery },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<TagList>;
  }
}
