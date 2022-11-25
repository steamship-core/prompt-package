import { ApiBase, Response } from './api_base';
import { IBlock } from './block';
import { Configuration } from './shared/Configuration';
import { GetParams } from './shared/Requests';
import { ITag } from './tag';

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

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new File(client, data as FileParams);
};

const _EXPECT_LIST = (client: ApiBase, data: unknown) => {
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
  content?: string | Buffer | Blob | Uint8Array;
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
  client: ApiBase;

  constructor(client: ApiBase, params: FileParams) {
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
    client: ApiBase,
    params: UploadParams,
    config?: Configuration
  ): Promise<Response<File>> {
    if (!params.filename && !params.content) {
      throw Error('Either filename or content must be provided');
    }

    let buffer: Buffer | Blob | Uint8Array | undefined = undefined;

    if (params.filename) {
      params.type = 'file';
      buffer = await readFile(params.filename);
      delete params.content;
    } else if (
      params.content instanceof Buffer ||
      params.content instanceof Uint8Array
    ) {
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
    )) as Response<File>;
  }

  async delete(config?: Configuration): Promise<Response<File>> {
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
    )) as Response<File>;
  }

  async raw(config?: Configuration): Promise<Response<unknown>> {
    return (await this.client.post(
      'file/raw',
      {
        id: this.id,
      },
      {
        ...config,
        rawResponse: true,
      }
    )) as Response<unknown>;
  }

  async clear(config?: Configuration): Promise<Response<File>> {
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
    )) as Response<File>;
  }

  static async list(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<FileList>> {
    return (await client.post(
      'file/list',
      { ...params },
      {
        expect: _EXPECT_LIST,
        ...config,
      }
    )) as Response<FileList>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<File>> {
    return (await client.post(
      'file/get',
      { ...params },
      {
        expect: _EXPECT,
        responsePath: 'file',
        ...config,
      }
    )) as Response<File>;
  }
}
