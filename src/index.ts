export { Client } from './lib/nludb';
export { RemoteError } from './lib/nludb_error';

// Embedding
export { EmbeddingIndex } from './lib/embedding_index';
export { EmbeddingModel } from './lib/types/embedding_model';
export type {
  CreateIndexRequest,
  SearchResult,
  SearchRequest,
  InsertRequest,
  InsertResult,
  IndexSnapshotRequest,
  IndexSnapshotResponse,
} from './lib/types/embedding';

// Classifiers
export { Classifier } from './lib/classifier';
export { ClassifierModel } from './lib/types/classifier_model';
export type {
  CreateClassifierRequest,
  CreateClassifierResult,
} from './lib/types/classifier';

export { ParsingModel } from './lib/types/parsing_model';
export type { ParseRequest, ParseResponse } from './lib/types/parsing';

export type {
  SearchHit,
  TaskStatus,
  TaskParams,
  Metadata,
} from './lib/types/base';

export type {
  AddTaskCommentRequest,
  TaskCommentResponse,
  ListTaskCommentRequest,
  ListTaskCommentResponse,
  DeleteTaskCommentRequest,
} from './lib/types/task_comment';

export { Task, Response } from './lib/api_base';

export type {
  CreateModelRequest,
  Model,
  ModelAdapterType,
  ModelType,
  ListModelsResponse,
  ListPrivateModelsRequest,
  ListPublicModelsRequest,
  DeleteModelRequest,
} from './lib/types/Models';

export { App } from './lib/app';
export { AppVersion } from './lib/app_version';
export { AppInstance } from './lib/app_instance';
export { User } from './lib/user';

export { Space } from './lib/space';

export type {
  Configuration,
  LoadConfigParams,
  SaveConfigParams,
} from './lib/shared/Configuration';

export {
  CONFIG_FILENAME,
  DEFAULT_CONFIG,
  loadConfiguration,
  saveConfiguration,
} from './lib/shared/Configuration';

export { default as regeneratorRuntime } from 'regenerator-runtime';
