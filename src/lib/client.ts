import {ApiBase, Response} from './api_base';
import {LoadConfigParams} from './shared/Configuration';
import {Tasks} from './tasks';
import {CreateLoginAttemptResponse} from './types/account';
import {
  EmbedAndSearchRequest,
  EmbeddingHit,
  EmbedRequest,
  EmbedResult,
} from './types/embedding';
import {TagResponse} from './types/tagging';
import {QueryResults} from "./types/base";

export class Client extends ApiBase {
  tasks: Tasks;

  public constructor(config?: LoadConfigParams) {
    super(config);
    this.tasks = new Tasks(this);
  }

  async embed(params: EmbedRequest): Promise<Response<EmbedResult>> {
    return this.post('embedding/create', params) as Promise<Response<EmbedResult>>;
  }

  async embedAndSearch(
    params: EmbedAndSearchRequest
  ): Promise<Response<QueryResults<EmbeddingHit>>> {
    return this.post('embedding/search', params) as Promise<Response<QueryResults<EmbeddingHit>>>;
  }

  //This mirrors the current Python version, which also assumes inline, which probably isn't what we want.
  async tag(doc: string, pluginInstance: string): Promise<Response<TagResponse>> {

    return (await this.post('plugin/instance/tag', {
      type: "inline",
      pluginInstance: pluginInstance,
      file: {
        blocks: [
          {text: doc}
        ]
      }
    })) as Response<TagResponse>
  }

  /**
   * Create a login attempt token, useful for logging in a client from the CLI
   * @returns A response object with a "token" field
   */
  async createLoginAttempt(): Promise<Response<CreateLoginAttemptResponse>> {
    return await this.post('account/create_login_attempt', {});
  }
}
