
import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';


async function _readFile(filename: string): Promise<Buffer> {
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
  name?: string;
  handle?: string;
  mimeType?: string;
  corpusId?: string;
  spaceId?: string;
}

export interface UploadParams {
  filename?: string;
  content?: string | Buffer;
  type?: "file" | "url" | "value"
  name?: string;
  handle?: string;
  mimeType?: string;
  corpusId?: string;
  spaceId?: string;
}

export class File {
  id?: string;
  name?: string;
  handle?: string;
  mimeType?: string;
  corpusId?: string;
  spaceId?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: FileParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.mimeType = params.mimeType;
    this.corpusId = params.corpusId;
    this.spaceId = params.spaceId;
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

  static async upload(
    client: ApiBase,
    params: UploadParams,
    config?: Configuration
  ): Promise<Response<File>> {
    if (!params.filename && !params.name && !params.content) {
      throw Error('Either filename or name + content must be provided');
    }
    let buffer: Buffer | undefined = undefined;
    
    if (params.filename) {
      if (!params.name) {
        const parts = params.filename.split("/")
        params.name = parts[parts.length - 1]
      }
      params.type = "file"
      buffer = await _readFile(params.filename);
    } else {
      params.type = "value"
    }

    return (await client.post(
      'file/create',
      {
        name: params.name,
        type: params.type,
        handle: params.handle,
        value: params.content,
        mimeType: params.mimeType,
        corpusId: params.corpusId,
        spaceId: params.spaceId,
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
}
