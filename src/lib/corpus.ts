import {ApiBase, Response} from './api_base';
import {Configuration} from './shared/Configuration';
import {CreateParams, GetParams} from './shared/Requests';

export interface CorpusParams {
  id?: string;
  handle?: string;
}

const _EXPECT = (client: ApiBase, data: unknown) => {
  return new Corpus(client, data as CorpusParams)
}

export class Corpus {
  client: ApiBase;
  id?: string;
  handle?: string;

  constructor(client: ApiBase, params: CorpusParams) {
    this.client = client;
    this.id = params.id;
    this.handle = params.handle;
  }

  static async create(
    client: ApiBase,
    params?: CreateParams,
    config?: Configuration
  ): Promise<Response<Corpus>> {
    return (await client.post(
      'corpus/create',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'corpus',
        ...config
      },
    )) as Response<Corpus>;
  }

  static async get(
    client: ApiBase,
    params?: GetParams,
    config?: Configuration
  ): Promise<Response<Corpus>> {
    return (await client.post(
      'corpus/get',
      {...params},
      {
        expect: _EXPECT,
        responsePath: 'corpus',
        ...config
      },
    )) as Response<Corpus>;
  }

  async delete(config?: Configuration) {
    return (await this.client.post(
      'corpus/delete',
      {
        id: this.id,
      },
      {
        expect: _EXPECT,
        responsePath: 'corpus',
        ...config
      }
    )) as Response<Corpus>;
  }
}
