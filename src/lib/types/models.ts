
export enum ModelType {
  embedder = "embedder",
  parser = "parser",
  classifier = "classifier"
}

export enum ModelAdapterType {
  nludbDocker = "nludbDocker",
  nludbSagemaker = "nludbSagemaker",
  huggingface = "huggingface",
  openai = "openai"
}

export enum LimitUnit {
  words = 'words',
  characters = 'characters',
  bytes = 'bytes',
}

export interface Model {
  id: string
  name: string
  modelType: string
  url: string
  adapterType: string
  isPublic: boolean
  handle: string
  description: string
  dimensionality: number
  limitAmount: number
  limitUnit: string
  apiKey: string
  metadata: string
}

export interface CreateModelRequest {
  id?: string
  name: string
  modelType: string
  url: string
  adapterType: string
  isPublic: boolean
  handle?: string
  description: string
  dimensionality?: number
  limitAmount?: number
  limitUnit?: string
  apiKey?: string
  metadata?: string
  upsert?: boolean
}

export interface DeleteModelRequest {
  modelId: string;
}

export interface ListPublicModelsRequest {
  modelType: string;
}

export interface ListPrivateModelsRequest {
  modelType: string;
}

export interface ListModelsResponse {
  models: Model[];
}
