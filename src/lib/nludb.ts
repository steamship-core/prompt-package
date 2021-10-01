import { NludbApiBase, NludbResponse } from './api_base';
import { Classifier } from './classifier';
import { EmbeddingIndex } from './embedding_index';
import { Models } from './models';
import { NLUDBError } from './nludb_error';
import { ConnectionParams } from './types/base'
import { CreateClassifierRequest } from './types/classifier';
import {
  CreateIndexRequest,
  CreateIndexResult,
  EmbedAndSearchRequest,
  EmbedAndSearchResult,
  EmbedRequest,
  EmbedResult,
} from './types/embedding';
import { ParseRequest, ParseResponse } from './types/parsing';
import { ParsingModel } from './types/parsing_model'

export class NLUDB extends NludbApiBase {
  models: Models;

  public constructor(connectionParams: ConnectionParams) {
    super(connectionParams);
    this.models = new Models(this);
  }

  async embed(params: EmbedRequest): Promise<NludbResponse<EmbedResult>> {
    return this.post('embedding/create', params) as Promise<NludbResponse<EmbedResult>>;
  }

  async embedAndSearch(
    params: EmbedAndSearchRequest
  ): Promise<NludbResponse<EmbedAndSearchResult>> {
    return this.post(
      'embedding/search',
      params
    ) as Promise<NludbResponse<EmbedAndSearchResult>>;
  }

  async createIndex(params: CreateIndexRequest): Promise<EmbeddingIndex> {
    const res = (await this.post(
      'embedding-index/create',
      params
    )) as NludbResponse<CreateIndexResult>;
    if (!res.data?.id) {
      throw new NLUDBError("createIndex did not result in an Index ID");
    }
    return new EmbeddingIndex(this, params.name, params.model, res.data.id);
  }

  async createClassifier(params: CreateClassifierRequest): Promise<Classifier> {
    if (params.save === false) {
      return new Classifier(this, params.name, params.model, undefined, params.labels)
    } else {
      throw new NLUDBError(
        'Feature not yet supported'
      );
      // const res = (await this.post(
      //   'classifier/create',
      //   params
      // )) as NludbResponse<CreateClassifierResult>;
      // return new Classifier(this, params.name, params.model, res.data?.classifierId);
    }
  }

  async parse(params: ParseRequest): Promise<NludbResponse<ParseResponse>> {
    return await this.post(
      'parser/parse',
      {
        model: ParsingModel.EN_DEFAULT,
        includeTokens: true,
        includeParseData: true,
        includeEntities: false,
        ...params
      }
    ) as NludbResponse<ParseResponse>;
  }
}
