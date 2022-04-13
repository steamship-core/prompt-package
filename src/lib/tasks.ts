import {ApiBase, Response} from './api_base';
import {
  ListTaskCommentRequest,
  ListTaskCommentResponse,
} from './types/task_comment';

export class Tasks {
  client: ApiBase;

  constructor(client: ApiBase) {
    this.client = client;
  }

  async listComments(
    params: ListTaskCommentRequest
  ): Promise<Response<ListTaskCommentResponse>> {
    return (await this.client.post(
      'task/comment/list',
      params
    )) as Response<ListTaskCommentResponse>;
  }
}
