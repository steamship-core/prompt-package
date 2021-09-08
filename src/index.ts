export { NLUDB } from './lib/nludb';
export { NLUDBError } from './lib/nludb_error';

export { EmbeddingIndex } from './lib/embedding_index';
export { EmbeddingModel } from './lib/types/embedding_model';
export type {
  CreateIndexRequest,
  SearchResult,
  SearchRequest,
  InsertRequest,
  InsertResult
} from './lib/types/embedding'

export { Classifier } from './lib/classifier';
export { ClassifierModel } from './lib/types/classifier_model';

export type {
  ParseRequest,
  ParseResponse
} from './lib/types/parsing'
export { ParsingModel } from './lib/types/parsing_model';

export type { ConnectionParams, SearchHit } from './lib/types/base'
