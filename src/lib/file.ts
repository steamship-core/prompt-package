import {ApiBase, Response} from './api_base';
import {Configuration} from './shared/Configuration';


export async function readFile(filename: string): Promise<Buffer> {
  const fs = await import('fs')
  const util = await import('util')
  const readFile = util.promisify(fs.readFile);
  const content = await readFile(filename)
  return content
}

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new File(client, data as FileParams)
}

export interface FileParams {
  id?: string;
  handle?: string;
  mimeType?: string;
  corpusId?: string;
  workspaceId?: string;
}

export interface UploadParams {
  filename?: string;
  content?: string | Buffer;
  type?: "file" | "url" | "value"
  handle?: string;
  mimeType?: string;
  corpusId?: string;
  workspaceId?: string;
}

export class File {
  id?: string;
  handle?: string;
  mimeType?: string;
  corpusId?: string;
  workspaceId?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: FileParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
    this.mimeType = params.mimeType;
    this.corpusId = params.corpusId;
    this.workspaceId = params.workspaceId;
  }

  static async upload(
    client: ApiBase,
    params: UploadParams,
    config?: Configuration
  ): Promise<Response<File>> {
    if (!params.filename && !params.content) {
      throw Error('Either filename or content must be provided');
    }
    let buffer: Buffer | undefined = undefined;

    if (params.filename) {
      params.type = "file"
      buffer = await readFile(params.filename);
    } else {
      params.type = "value"
    }

    return (await client.post(
      'file/create',
      {
        type: params.type,
        filename: params.filename,
        handle: params.handle,
        value: params.content,
        mimeType: params.mimeType,
        corpusId: params.corpusId,
        workspaceId: params.workspaceId,
      },
      {
        ...config,
        expect: _EXPECT,
        responsePath: 'file',
        file: buffer,
        filename: params.filename
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
        ...config
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
        rawResponse: true
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
        ...config
      }
    )) as Response<File>;
  }
}
