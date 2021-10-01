import { NludbApiBase, NludbResponse } from './api_base';
import { ListTaskCommentRequest, ListTaskCommentResponse } from './types/task_comment';

export class Tasks {
  nludb: NludbApiBase;

  constructor(nludb: NludbApiBase) {
    this.nludb = nludb;
  }

  async listComments(params: ListTaskCommentRequest): Promise<NludbResponse<ListTaskCommentResponse>> {
    return (await this.nludb.post('task/comment/list', params)) as NludbResponse<ListTaskCommentResponse>;
  }

}
