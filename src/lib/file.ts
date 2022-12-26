import { IBlock } from './block';
import { AllowedFileTypes, IApiBase } from './shared/BaseInterfaces';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';
import { ITag } from './tag';
import { Task } from './task';

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export async function readFile(filename: string): Promise<Buffer> {
  const fs = await import('fs');
  const util = await import('util');
  const readFile = util.promisify(fs.readFile);
  const content = await readFile(filename);
  return content;
}

export interface FileList {
  files: File[];
}

const _EXPECT = (client: IApiBase, data: unknown) => {
  return new File(client, data as FileParams);
};

const _EXPECT_LIST = (client: IApiBase, data: unknown) => {
  return {
    files: ((data as any).files as Array<any>).map((x) => _EXPECT(client, x)),
  };
};

export interface FileParams {
  id?: string;
  handle?: string;
  mimeType?: string;
  workspaceId?: string;
  tenantId?: string;
  userId?: string;
  blocks?: IBlock[];
  tags?: ITag[];
}

export interface UploadParams {
  filename?: string;
  content?: AllowedFileTypes;
  type?: 'file' | 'url' | 'value';
  tags?: ITag[];
  handle?: string;
  mimeType?: string;
  workspaceId?: string;
}

export class File {
  id?: string;
  handle?: string;
  mimeType?: string;
  userId?: string;
  workspaceId?: string;
  blocks?: IBlock[];
  tags?: ITag[];
  client: IApiBase;

  constructor(client: IApiBase, params: FileParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.mimeType = params.mimeType;
    this.workspaceId = params.workspaceId;
    this.blocks = params.blocks;
    this.tags = params.tags;
    this.userId = params.userId;
  }

  static async upload(
    client: IApiBase,
    params: UploadParams,
    config?: Configuration
  ): Promise<Task<File>> {
    if (!params.content) {
      throw Error('Content must be provided');
    }

    const contentIsFile = !((params.content as any) instanceof String);

    let buffer: AllowedFileTypes | undefined = undefined;

    if (contentIsFile) {
      params.type = 'file';
      buffer = params.content as any;
      delete params.content;
    } else {
      params.type = 'value';
    }

    return (await client.post(
      'file/create',
      {
        type: params.type,
        filename: params.filename,
        handle: params.handle,
        tags: params.tags,
        value: params.content,
        mimeType: params.mimeType,
        workspaceId: params.workspaceId,
      },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'file',
        file: buffer,
        // Filename MUST be non-undefined! Otherwise the request library will
        // not work.
        filename: params.filename || params.handle || generateRandomString(),
      }
    )) as Task<File>;
  }

  async delete(config?: Configuration): Promise<Task<File>> {
    return (await this.client.post(
      'file/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'file',
        ...config,
      }
    )) as Task<File>;
  }

  async raw(config?: Configuration): Promise<Response> {
    return (await this.client.post(
      'file/raw',
      {
        id: this.id,
      },
      {
        ...config,
        rawResponse: true,
      }
    )) as Response;
  }

  async clear(config?: Configuration): Promise<Task<File>> {
    return (await this.client.post(
      'file/clear',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'config',
        ...config,
      }
    )) as Task<File>;
  }

  static async list(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<FileList>> {
    return (await client.post(
      'file/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Task<FileList>;
  }

  static async get(
    client: IApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Task<File>> {
    return (await client.post(
      'file/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'file',
        ...config,
      }
    )) as Task<File>;
  }
}
