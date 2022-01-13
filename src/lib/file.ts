import fs from 'fs';
import util from 'util';

import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const readFile = util.promisify(fs.readFile);

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
    if (params.filename) {
      params.name = params.filename;
      params.content = await readFile(params.filename);
    }

    return (await client.post(
      'file/create',
      {
        name: params.name,
        handle: params.handle,
        mimeType: params.mimeType,
        corpusId: params.corpusId,
        spaceId: params.spaceId,
      },
      {
        expect: _EXPECT,
        responsePath: 'file',
        ...config
      }
    )) as Response<File>;
  }
}
