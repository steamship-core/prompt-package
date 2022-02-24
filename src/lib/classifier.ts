import { ApiBase, Response } from './api_base';
import { RemoteError } from './nludb_error';
import { ClassifyRequest, ClassifyResult } from './types/classifier';

export class Classifier {
  id?: string;
  name?: string;
  model?: string;
  labels?: string[];
  client: ApiBase;

  constructor(
    client: ApiBase,
    name?: string,
    model?: string,
    id?: string,
    labels?: string[]
  ) {
    if (!id && !model) {
      throw new RemoteError({ statusMessage: 'Either an ID or a model must be provided' });
    }

    this.name = name;
    this.model = model;
    this.id = id;
    this.client = client;
    this.labels = labels;
  }

  async classify(params: ClassifyRequest): Promise<Response<ClassifyResult>> {
    // There are two cases: an ID and no labels (assumption: saved classifier) or a model and labels (zero shot)
    if (!this.id && !this.model) {
      throw new RemoteError({
        statusMessage: 'Neither an ID nor a model was found on the classifier object. Please reinitialize with one or the other.'
      });
    }
    if (!this.id && !params.labels && !this.labels) {
      throw new RemoteError({
        statusMessage: 'Since you are calling a stateless classifier, please include output labels in your classify request.'
      });
    }
    if (this.id && params.labels) {
      throw new RemoteError({
        statusMessage: 'Since you are calling a stateful classifier, you can not include in-line labels in your classify request. Please add them first.'
      });
    }

    const res = (await this.client.post('classifier/classify', {
      labels: this.labels,
      ...params,
      model: this.model,
      classifierId: this.id,
    })) as Response<ClassifyResult>;

    if (typeof res.data == 'undefined') {
      res.data = {} as ClassifyResult;
    }
    if (typeof res.data.hits == 'undefined') {
      res.data.hits = [];
    }
    for (let i = 0; i < res.data.hits.length; i++) {
      for (let j = 0; j < res.data.hits[i].length; j++) {
        try {
          if (res.data.hits[i][j].metadata) {
            res.data.hits[i][j].metadata = JSON.parse(
              res.data.hits[i][j].metadata as string
            );
          }
        } catch {
          // pass
        }
      }
    }
    return res;
  }

  // async insertLabel(params: InsertLabelRequest): Promise<Response<InsertLabelResult>> {
  //   throw new RemoteError(
  //     'Feature not yet supported'
  //   );
  //   if (typeof params.metadata == 'object') {
  //     params.metadata = JSON.stringify(params.metadata);
  //   }
  //   return (await this.client.post('classifier/insert', {
  //     ...params,
  //     classifierId: this.id,
  //   })) as Response<InsertLabelResult>;
  // }

  // async delete(): Promise<Response<DeleteClassifierResult>> {
  //   throw new RemoteError(
  //     'Feature not yet supported'
  //   );
  //   return (await this.client.post('classifier/delete', {
  //     classifierId: this.id,
  //   })) as Response<DeleteClassifierResult>;
  // }
}
