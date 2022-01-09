import { ApiBase, Response } from './api_base';
import { ListTaskCommentRequest, ListTaskCommentResponse } from './types/task_comment';

export class Tasks {
  nludb: ApiBase;

  constructor(nludb: ApiBase) {
    this.nludb = nludb;
  }

  async listComments(params: ListTaskCommentRequest): Promise<Response<ListTaskCommentResponse>> {
    return (await this.nludb.post('task/comment/list', params)) as Response<ListTaskCommentResponse>;
  }

}
