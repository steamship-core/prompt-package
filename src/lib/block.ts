import { IApiBase } from './shared/BaseInterfaces.js';
import { Configuration } from './shared/Configuration.js';
import { Tag, TagParams } from './tag.js';
import { Task } from './task.js';

export interface BlockParams {
  id?: string;
  workspaceId?: string;
  fileId?: string;
  text?: string;
  tags?: Tag[] | TagParams[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlockList {
  blocks: Block[];
}

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new Block(client, data as BlockParams);
};

export interface UploadParams {
  fileId?: string;
  text?: string;
  tags?: TagParams[];
}

export class Block {
  id?: string;
  fileId?: string;
  text?: string;
  tags?: Tag[];
  createdAt?: string;
  updatedAt?: string;
  client: IApiBase;

  constructor(client: IApiBase, params: BlockParams) {
    this.client = client;
    this.id = params.id;
    this.fileId = params.fileId;
    this.text = params.text;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.tags = [];

    if (params.tags) {
      for (const tag of params.tags) {
        if (tag instanceof Tag) {
          this.tags.push(tag);
        } else {
          this.tags.push(new Tag(client, tag));
        }
      }
    }
  }

  static async create(
    client: IApiBase,
    params: UploadParams,
    config?: Configuration
  ): Promise<Task<Block>> {
    return (await client.post('block/create', params, {
      ...config,
      expect: _EXPECT,
      responsePath: 'block',
    })) as Task<Block>;
  }

  async delete(config?: Configuration): Promise<Task<Block>> {
    return (await this.client.post(
      'block/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'block',
        ...config,
      }
    )) as Task<Block>;
  }
}
