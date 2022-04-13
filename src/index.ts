export { Client } from './lib/client';
export { RemoteError } from './lib/steamship_error';

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
  TaskState as TaskStatus,
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
} from './lib/types/models';

export { App } from './lib/app';
export { AppVersion, AppVersionList, AppVersionListParams, AppVersionParams } from './lib/app_version';
export { AppInstance, AppInstanceList, AppInstanceListParams, AppInstanceParams, CreateAppInstance } from './lib/app_instance';
export { Plugin } from './lib/plugin';
export { PluginInstance, PluginInstanceList, PluginInstanceListParams, PluginInstanceParams, CreatePluginInstance } from './lib/plugin_instance';
export { PluginVersion, PluginVersionList, PluginVersionListParams, PluginVersionParams } from './lib/plugin_version';
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
