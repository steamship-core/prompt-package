import { ApiBase, Response } from './api_base';
import { Classifier } from './classifier';
import { EmbeddingIndex } from './embedding_index';
import { Models } from './models';
import { RemoteError } from './nludb_error';
import { LoadConfigParams } from './shared/Configuration';
import { Tasks } from './tasks';
import { CreateLoginAttemptResponse } from './types/account';
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
import { ParsingModel } from './types/parsing_model';

export class Client extends ApiBase {
  models: Models;
  tasks: Tasks;

  public constructor(config?: LoadConfigParams) {
    super(config);
    this.models = new Models(this);
    this.tasks = new Tasks(this);
  }

  async embed(params: EmbedRequest): Promise<Response<EmbedResult>> {
    return this.post('embedding/create', params) as Promise<
      Response<EmbedResult>
    >;
  }

  async embedAndSearch(
    params: EmbedAndSearchRequest
  ): Promise<Response<EmbedAndSearchResult>> {
    return this.post('embedding/search', params) as Promise<
      Response<EmbedAndSearchResult>
    >;
  }

  async createIndex(params: CreateIndexRequest): Promise<EmbeddingIndex> {
    const res = (await this.post(
      'embedding-index/create',
      params
    )) as Response<CreateIndexResult>;
    if (!res.data?.id) {
      throw new RemoteError({
        message: 'createIndex did not result in an Index ID',
      });
    }
    return new EmbeddingIndex(this, params.name, params.model, res.data.id);
  }

  async createClassifier(params: CreateClassifierRequest): Promise<Classifier> {
    if (params.save === false) {
      return new Classifier(
        this,
        params.name,
        params.model,
        undefined,
        params.labels
      );
    } else {
      throw new RemoteError({ message: 'Feature not yet supported' });
      // const res = (await this.post(
      //   'classifier/create',
      //   params
      // )) as Response<CreateClassifierResult>;
      // return new Classifier(this, params.name, params.model, res.data?.classifierId);
    }
  }

  async parse(params: ParseRequest): Promise<Response<ParseResponse>> {
    return (await this.post('parser/parse', {
      model: ParsingModel.EN_DEFAULT,
      includeTokens: true,
      includeParseData: true,
      includeEntities: false,
      ...params,
    })) as Response<ParseResponse>;
  }

  /**
   * Create a login attempt token, useful for logging in a client from the CLI
   * @returns A response object with a "token" field
   */
  async createLoginAttempt(): Promise<Response<CreateLoginAttemptResponse>> {
    return await this.post('account/create_login_attempt', {});
  }
}
