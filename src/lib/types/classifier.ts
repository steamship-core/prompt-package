import { SearchHit } from './base';

export interface CreateClassifierRequest {
  model: string;
  name?: string;
  upsert?: boolean;
  save?: boolean;
  labels?: string[];
}

export interface CreateClassifierResult {
  classifierId?: string;
}

export interface ClassifyRequest {
  classifierId?: string;
  model?: string;
  docs: string[];
  labels?: string[];
}

export interface ClassifyResult {
  hits: SearchHit[][];
}

export interface InsertLabelRequest {
  value: string;
  externalId?: string;
  externalType?: string;
  metadata?: unknown;
}

export interface InsertLabelResult {
  labelId: string;
  value: string;
  externalId?: string;
  externalType?: string;
  metadata?: unknown;
}

export interface DeleteClassifierResult {
  classifierId: string;
}
