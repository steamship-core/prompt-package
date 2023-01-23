import { AxiosResponse } from 'axios';

import { TaskParams, TaskState } from '../types/base.js';

import { Configuration } from './Configuration.js';

export interface ITask<T> extends TaskParams<T> {
  update(params?: TaskParams<T>): ITask<T>;
  setData(data?: any): void;
  completed(): boolean;
  failed(): boolean;
  wait(params?: {
    maxTimeoutSeconds?: number;
    retryDelaySeconds?: number;
  }): Promise<ITask<T>>;
  check(): Promise<ITask<T> | undefined>;
}

export interface TaskListParams {
  // The task ID
  id?: string;
  // The workspace in which the task lives
  workspaceId?: string;
  // The state of the task
  state?: TaskState;
}

export interface TaskList {
  tasks: ITask<any>[];
}

export type Verb = 'POST' | 'GET';

export type AllowedFileTypes = Blob | File | string | Buffer;

export interface PostConfig<T> extends Configuration {
  responsePath?: string;
  rawResponse?: boolean;
  file?: AllowedFileTypes;
  filename?: string;
  expect?: (client: IApiBase, data: unknown) => T;
  isPackageCall?: boolean;
  asBackgroundTask?: boolean;
  packageOwner?: string;
  packageId?: string;
  packageInstanceId?: string;
  responseType?: 'blob' | 'arraybuffer' // For Axios
}

export interface SwitchWorkspaceParams {
  workspaceHandle?: string;
  failIfWorkspaceExists?: boolean;
}

export interface IApiBase {
  config: Promise<Configuration> | Configuration;
  switchWorkspace(params?: SwitchWorkspaceParams): Promise<void>;
  post<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>,
    overrideConfig?: Configuration
  ): Promise<AxiosResponse | ITask<T>>;
  get<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<AxiosResponse | ITask<T>>;
  call<T>(
    verb: Verb,
    operation: string,
    payload: unknown,
    config?: PostConfig<T>,
    overrideConfig?: Configuration
  ): Promise<AxiosResponse | ITask<T>>;
  _url<T>(
    baseConfig: Configuration,
    postConfig?: PostConfig<T>,
    operation?: string
  ): string;
}
