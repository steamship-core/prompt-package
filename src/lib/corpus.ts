import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';
import { CreateParams } from './shared/CreateParams';

export interface CorpusParams {
  id?: string;
  name?: string;
  handle?: string;
}

export class Corpus {
  client: ApiBase;
  id?: string;
  name?: string;
  handle?: string;

  constructor(client: ApiBase, params: CorpusParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
  }

  async delete(configuration?: Configuration) {
    return (await this.client.post(
      'corpus/delete',
      {
        id: this.id,
      },
      configuration
    )) as Response<CorpusParams>;
  }

  static async create(
    client: ApiBase,
    params: CreateParams,
    config?: Configuration
  ): Promise<Response<CorpusParams>> {
    return (await client.post(
      'corpus/create',
      params,
      config
    )) as Response<CorpusParams>;
  }
}
