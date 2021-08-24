import { NludbApiBase } from './api_base';
import { NLUDBError } from './nludb_error';
import { ClassifyRequest, ClassifyResult, DeleteClassifierResult, InsertLabelRequest, InsertLabelResult } from './types/classifier';

export class Classifier {
  id?: string;
  name?: string;
  model?: string;
  labels?: string[];
  nludb: NludbApiBase;

  constructor(nludb: NludbApiBase, name?: string, model?: string, id?: string, labels?: string[]) {
    if ((! id) && (! model)) {
      throw new NLUDBError(
        'Either an ID or a model must be provided'
      );
    }

    this.name = name;
    this.model = model;
    this.id = id;
    this.nludb = nludb;
    this.labels = labels;
  }

  async classify(params: ClassifyRequest): Promise<ClassifyResult> {
    // There are two cases: an ID and no labels (assumption: saved classifier) or a model and labels (zero shot)
    if ((! this.id) && (! this.model)) {
      throw new NLUDBError(
        'Neither an ID nor a model was found on the classifier object. Please reinitialize with one or the other.'
      );
    }
    if ((! this.id) && (! params.labels) && (! this.labels)) {
      throw new NLUDBError(
        'Since you are calling a stateless classifier, please include output labels in your classify request.'
      );
    }
    if ((this.id) && (params.labels)) {
      throw new NLUDBError(
        'Since you are calling a stateful classifier, you can not include in-line labels in your classify request. Please add them first.'
      );
    }

    const res = (await this.nludb.post('classifier/classify', {
      labels: this.labels,
      ...params,
      model: this.model,
      classifierId: this.id,
    })) as ClassifyResult;
    if (typeof res.hits == 'undefined') {
      res.hits = [];
    }
    for (let i = 0; i < res.hits.length; i++) {
      for (let j = 0; j < res.hits[i].length; j++) {
        try {
          if (res.hits[i][j].metadata) {
            res.hits[i][j].metadata = JSON.parse(res.hits[i][j].metadata as string);
          }
        } catch {
          // pass
        }
      }
    }
    return res;
  }

  async insertLabel(params: InsertLabelRequest): Promise<InsertLabelResult> {
    throw new NLUDBError(
      'Feature not yet supported'
    );
    if (typeof params.metadata == 'object') {
      params.metadata = JSON.stringify(params.metadata);
    }
    return (await this.nludb.post('classifier/insert', {
      ...params,
      classifierId: this.id,
    })) as InsertLabelResult;
  }

  async delete(): Promise<DeleteClassifierResult> {
    throw new NLUDBError(
      'Feature not yet supported'
    );
    return (await this.nludb.post('classifier/delete', {
      classifierId: this.id,
    })) as DeleteClassifierResult;
  }
}
