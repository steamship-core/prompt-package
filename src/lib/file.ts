import fs from 'fs';
import util from 'util';

import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const readFile = util.promisify(fs.readFile);

export interface FileParams {
  id?: string;
  name?: string;
  handle?: string;
  format?: string;
  corpusId?: string;
  spaceId?: string;
}

export interface UploadParams {
  filename?: string;
  content?: string | Buffer;

  name?: string;
  handle?: string;
  format?: string;
  corpusId?: string;
  spaceId?: string;
}

export class File {
  id?: string;
  name?: string;
  handle?: string;
  format?: string;
  corpusId?: string;
  spaceId?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: FileParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
    this.format = params.format;
    this.corpusId = params.corpusId;
    this.spaceId = params.spaceId;
  }

  async delete(configuration?: Configuration) {
    return (await this.client.post(
      'file/delete',
      {
        id: this.id,
      },
      configuration
    )) as Response<FileParams>;
  }

  async clear(configuration?: Configuration) {
    return (await this.client.post(
      'file/clear',
      {
        id: this.id,
      },
      configuration
    )) as Response<FileParams>;
  }

  static async upload(
    client: ApiBase,
    params: UploadParams,
    configuration?: Configuration
  ) {
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
        format: params.format,
        corpusId: params.corpusId,
        spaceId: params.spaceId,
      },
      configuration
    )) as Response<FileParams>;
  }
}
