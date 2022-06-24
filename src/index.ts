export {Client} from './lib/client';
export {RemoteError} from './lib/steamship_error';

// Embedding
export {EmbeddingIndex} from './lib/embedding_index';
export type {
  CreateIndexRequest,
  EmbeddingHit,
  SearchRequest,
  InsertRequest,
  InsertResult,
  IndexSnapshotRequest,
  IndexSnapshotResponse,
} from './lib/types/embedding';

export type {
  TaskState as TaskStatus,
  TaskParams,
  QueryResult,
  QueryResults,
  Metadata,
} from './lib/types/base';

export type {
  AddTaskCommentRequest,
  TaskCommentResponse,
  ListTaskCommentRequest,
  ListTaskCommentResponse,
  DeleteTaskCommentRequest,
} from './lib/types/task_comment';

export {Task, Response} from './lib/api_base';

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

export {App} from './lib/app';
export {
  AppVersion
} from './lib/app_version';
export type {
  AppVersionList, AppVersionListParams, AppVersionParams
} from './lib/app_version';
export {
  AppInstance
} from './lib/app_instance';
export type {
  AppInstanceList,
  AppInstanceListParams,
  AppInstanceParams,
  CreateAppInstance
} from './lib/app_instance';
export type {
  TrainingPlatform,
  PluginType,
  PluginTransport
} from './lib/plugin';
export {
  Plugin,
} from './lib/plugin';
export {
  PluginInstance
} from './lib/plugin_instance';
export type {
  PluginInstanceList,
  PluginInstanceListParams,
  PluginInstanceParams,
  CreatePluginInstance
} from './lib/plugin_instance';
export {
  PluginVersion
} from './lib/plugin_version';
export type {
  PluginVersionList,
  PluginVersionListParams,
  PluginVersionParams
} from './lib/plugin_version';
export {User} from './lib/user';

export {Space} from './lib/space';

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

export {default as regeneratorRuntime} from 'regenerator-runtime';
