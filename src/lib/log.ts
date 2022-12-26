import { Logger } from 'tslog';

import { IApiBase } from './shared/BaseInterfaces';
import { Configuration } from './shared/Configuration';
import { Task } from './task';
import { isNode } from './utils';

export default function getLogger(name: string) {
  if (isNode()) {
    const log: Logger = new Logger({ name });
    return log;
  } else {
    const log: Logger = new Logger({
      suppressStdOutput: true,
      type: 'json',
    });
    return log;
  }
}

export interface LogEntryParams {
  id?: string;
  message?: string;
  level?: string;
  timestamp: string;
  pluginId?: string;
  pluginInstanceId?: string;
  pluginVersionId?: string;
  userId?: string;
  tenantId?: string;
  workspaceId?: string;
  sessionId?: string;
  contextId?: string;
  pluginHandle?: string;
  pluginVersionHandle?: string;
  pluginInstanceHandle?: string;
  userHandle?: string;
  invocableHandle?: string;
  invocableType?: string;
  invocableVersionHandle?: string;
  httpMethod?: string;
  elapsedTimeSeconds?: string;
  component?: string;
  environment?: string;
  file?: string;
  function?: string;
  label?: string;
  line?: string;
  location?: string;
  path?: string;
  route?: string;
}

export interface LogEntryListParams {
  from?: number;
  size?: number;
}

export interface LogEntryList {
  count?: number;
  from?: number;
  entries?: LogEntryParams[];
}

export class LogEntry {
  public static async list(
    client: IApiBase,
    params?: LogEntryListParams,
    config?: Configuration
  ): Promise<Task<LogEntryList>> {
    return (await client.get(
      'logs',
      { ...params },
      {
        ...config,
      }
    )) as Task<LogEntryList>;
  }
}
