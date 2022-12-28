import { Logger } from 'tslog';

import getLogger from './log.js';
import {
  IApiBase,
  ITask,
  PostConfig,
  SwitchWorkspaceParams,
  Verb,
} from './shared/BaseInterfaces.js';
import {
  Configuration,
  LoadConfigParams,
  loadConfiguration,
} from './shared/Configuration.js';
import { SteamshipError } from './steamship_error.js';
import { Task } from './task.js';
import { TaskParams, TaskState } from './types/base.js';
import { isNode } from './utils.js';

// type FetchType = (url: any, opts: any) => Promise<Response>;
type FetchType = (opts: any) => Promise<Response>;
type NodeFetchType = { default: FetchType };
let _nodeFetch: NodeFetchType;

// async function doFetch(url: any, opts: any): Promise<Response> {
//   if (!_nodeFetch) {
//     _nodeFetch = (await import('got-fetch')) as any as NodeFetchType;
//   }
//   return _nodeFetch.default(url, opts);
// }

async function doFetch(url: any, opts: any): Promise<Response> {
  if (!_nodeFetch) {
    _nodeFetch = (await import('got')) as any as NodeFetchType;
  }
  const gotOpts = {
    url,
    headers: opts.headers,
    body: opts.body,
    method: opts.method,
  };
  return _nodeFetch.default(gotOpts);
}

const log: Logger = getLogger('Steamship:ApiBase');

const MAX_BODY_LENGTH = 100000 * 1000;

const _IS_LOCAL = (base: string): boolean => {
  for (const s of [
    'localhost',
    '127.0.0.1',
    '0:0:0:0',
    ':3000',
    'steamship.local',
    'host.docker.internal',
    '/test:',
  ]) {
    if (base.includes(s)) {
      return true;
    }
  }
  return false;
};

/* Should be a FormData object */
function addMultiparts(formData: any, path: string, value: any) {
  /* Decode any object into a series of HTTP Multi-part segments that Vapor will consume.
    https://github.com/vapor/multipart-kit

    When sending a JSON object in a MultiPart request, Vapor wishes to see multi part segments as follows:
    single_key
    array_key[idx]
    obj_key[prop]

    So a File with a list of one tag with kind=Foo would be transmitted as setting the part:
    [tags][0][kind]
  */
  const type = typeof value;
  if (type == 'string' || type == 'boolean' || type == 'number') {
    formData.append(path, value);
  } else if (Array.isArray(value)) {
    value.forEach((subValue, index) => {
      addMultiparts(formData, `${path}[${index}]`, subValue);
    });
  } else {
    for (const key in value) {
      addMultiparts(formData, `${path}[${key}]`, value[key]);
    }
  }
}

export interface SwitchConfigWorkspaceParams {
  workspaceHandle?: string;
  failIfWorkspaceExists?: boolean;
  config: Configuration;
}

export class ApiBase implements IApiBase {
  config: Promise<Configuration> | Configuration;

  public constructor(params?: LoadConfigParams) {
    this.config = loadConfiguration(params).then((config) => {
      if (config.apiKey) {
        return this._switchConfigWorkspace({
          workspaceHandle: params?.workspace,
          failIfWorkspaceExists: params?.failIfWorkspaceExists === true,
          config,
        });
      } else {
        return config;
      }
    });
  }

  async switchWorkspace(params?: SwitchWorkspaceParams) {
    const config = await this._switchConfigWorkspace({
      ...params,
      config: await this.config,
    });
    this.config = Promise.resolve(config);
    log.info(
      `Switched to workspace ${config.workspaceHandle}/${config.workspaceId}`
    );
  }

  /*
    Switches this client to the requested workspace, possibly creating it. If all arguments are None, the client
    actively switches into the default workspace.

    - API calls are performed manually to not result in circular imports.
    - Note that the default workspace is technically not necessary for API usage; it will be assumed by the Engine
      in the absense of a Workspace ID or Handle being manually specified in request headers.
   */
  async _switchConfigWorkspace(
    params: SwitchConfigWorkspaceParams
  ): Promise<Configuration> {
    let workspace: any | undefined = undefined;
    const p: SwitchWorkspaceParams = { ...params };

    if (!p.workspaceHandle) {
      p.workspaceHandle = 'default';
    }

    if (p.failIfWorkspaceExists) {
      log.info(`Creating workspace with handle: ${p.workspaceHandle}.`);
    } else {
      log.info(
        `Creating/Fetching workspace with handle: ${p.workspaceHandle}.`
      );
    }

    // Zero out the workspace_handle on the config block in case we're being invoked from
    // `init` (otherwise we'll attempt to create the sapce IN that nonexistant workspace)
    const oldConfig = params.config;

    const activeConfig = {
      ...oldConfig,
      workspaceHandle: undefined,
      workspaceId: undefined,
    };

    workspace = await this.post(
      'workspace/create',
      {
        handle: p.workspaceHandle,
        fetchIfExists: !(p.failIfWorkspaceExists === true),
      },
      {
        responsePath: 'workspace',
      },
      activeConfig
    );

    if (!workspace || !workspace.output) {
      throw new SteamshipError({
        statusMessage:
          'Was unable to switch to new workspace: server returned empty Workspace.',
      });
    }

    const returnId: string = workspace.output.id;
    const returnHandle: string = workspace.output.handle;

    if (!returnHandle || !returnId) {
      log.error(workspace);
      throw new SteamshipError({
        statusMessage: `${JSON.stringify(
          workspace
        )} Unable to switch to workspace ${
          p.workspaceHandle
        } with failIfWorkspaceExists ${
          p.failIfWorkspaceExists
        }: server returned empty ID and Handle.`,
      });
    }

    // Finally, set the new workspace
    return {
      ...oldConfig,
      workspaceHandle: returnHandle,
      workspaceId: returnId,
    };
  }

  _headers<T>(
    config: Configuration,
    postConfig?: PostConfig<T>
  ): { [name: string]: string } {
    const ret: { [name: string]: string } = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };

    if (postConfig?.workspaceId) {
      ret['X-Workspace-Id'] = postConfig?.workspaceId;
    } else if (config.workspaceId) {
      ret['X-Workspace-Id'] = config.workspaceId;
    } else if (config.workspaceHandle) {
      ret['X-Workspace-Handle'] = config.workspaceHandle;
    }

    if (postConfig?.isPackageCall === true) {
      if (postConfig?.packageOwner) {
        ret['X-Package-Owner-Handle'] = postConfig.packageOwner;
      }
      if (postConfig?.packageId) {
        ret['X-Package-Id'] = postConfig.packageId;
      }
      if (postConfig?.packageInstanceId) {
        ret['X-Package-Instance-Id'] = postConfig.packageInstanceId;
      }
    }

    if (postConfig?.asBackgroundTask === true) {
      // Will result in the engine persisting the inbound HTTP request as a Task for deferred
      // execution. The client will receive task information back instead of the synchronous API response.
      // That task can be polled for eventual completion.
      ret['X-Task-Background'] = 'true';
    }
    return ret;
  }

  _url<T>(
    baseConfig: Configuration,
    postConfig?: PostConfig<T>,
    operation?: string
  ): string {
    let base: string | undefined = '';

    if (!(postConfig?.isPackageCall === true)) {
      // It's an API call
      base = postConfig?.apiBase || baseConfig.apiBase;
    } else {
      // It's a package call
      if (!postConfig?.packageOwner) {
        throw new SteamshipError({
          statusCode: 'UserMissing',
          statusMessage:
            "Can not invoke an package endpoint without the package owner's user handle.",
          statusSuggestion:
            'Provide the packageOwner option, or initialize your package with a lookup.',
        });
      }

      base = postConfig?.appBase || baseConfig.appBase;

      if (!base) {
        throw new SteamshipError({
          statusCode: 'EndpointMissing',
          statusMessage:
            'Can not invoke an package endpoint without the App Base variable set.',
          statusSuggestion:
            'This should automatically have a good default setting. Reach out to our Steamship support.',
        });
      }

      if (!_IS_LOCAL(base)) {
        // Rewrite the base to be https://user.base
        const parts = base.split('//');
        if (parts.length < 2) {
          throw new SteamshipError({
            statusCode: 'EndpointInvalid',
            statusMessage:
              'You package base did not appear to begin with a valid HTTP or HTTPS protocol.',
            statusSuggestion:
              "Make sure you've provided an app base such as https://steamship.run, with the protocol.",
          });
        }
        // Now we pre-pend the app-base to the first part!
        parts[1] = `${postConfig?.packageOwner}.${parts[1]}`;
        base = parts.join('//');
      }
    }

    // Guard against a double // after the domain

    if (base && base[base.length - 1] == '/') {
      base = base.slice(0, base.length - 1);
    }
    if (operation && operation[0] == '/') {
      operation = operation.slice(1);
    }
    return `${base}/${operation}`;
  }

  async post<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>,
    overrideConfig?: Configuration
  ): Promise<Response | ITask<T>> {
    return this.call('POST', operation, payload, config, overrideConfig);
  }

  async get<T>(
    operation: string,
    payload: unknown,
    config?: PostConfig<T>
  ): Promise<Response | ITask<T>> {
    return this.call('GET', operation, payload, config);
  }

  async _makeError<T>({
    error,
    response,
    task,
  }: {
    error?: Error;
    response?: Response;
    task?: ITask<T>;
  }): Promise<Error> {
    if (error) {
      return error;
    } else if (response) {
      try {
        const j = await response.json();
        if (j.status) {
          return new SteamshipError({
            statusMessage: j.status.statusMessage,
            statusCode: j.status.statusCode,
            statusSuggestion: j.status.statusSuggestion,
          });
        }
      } catch {
        return new SteamshipError({
          statusMessage: 'Bad response from server',
        });
      }
      return new SteamshipError({ statusMessage: 'Bad response from server' });
    } else if (task) {
      return new SteamshipError({
        statusMessage: task.statusMessage,
        statusCode: task.statusCode,
        statusSuggestion: task.statusSuggestion,
      });
    }
    return new SteamshipError({ statusMessage: 'Bad response' });

    // console.log("Got error", error);
    //
    // let httpStatus = '';
    // if ((error as any)?.response?.status) {
    //   httpStatus = `[HTTP ${(error as any)?.response?.status}] `;
    // }
    // const origMessage = `${httpStatus}${
    //   (error as Error).message
    // }. When calling ${verb} ${url}`;
    // let statusMessage = 'An unexpected error happened during your request.';
    //
    // if ((error as any)?.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   const data = (error as any)?.response?.data;
    //   if (data) {
    //     if (data.status) {
    //       statusMessage = JSON.stringify(data.status);
    //     } else {
    //       statusMessage = `${data}`;
    //     }
    //   }
    // } else if ((error as any)?.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   statusMessage = `A request was made to ${url} but no response was received.`;
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   statusMessage = `The request to ${url} could not be configured.`;
    // }
    // throw new SteamshipError({
    //   statusMessage: statusMessage,
    //   origMessage: origMessage,
    // });
  }

  async _makeResponse<T>({
    response,
    rawResponse,
    objectConstructor,
    responsePath,
  }: {
    response: Response;
    rawResponse?: boolean;
    responsePath?: string;
    objectConstructor?: (client: any, data: any) => T;
  }): Promise<Task<T> | Response> {
    if (!response) {
      throw new SteamshipError({ statusMessage: 'No response.' });
    }

    if (!response.ok) {
      const err = await this._makeError({ response });
      throw err;
    }

    if (rawResponse === true) {
      return response;
    }

    let json: any;
    try {
      json = JSON.parse((response as any).body);
      // json = await response.json(); // for the fetch style
    } catch (error: any) {
      throw await this._makeError({ error });
    }

    if (typeof json == 'undefined' || json == null) {
      throw new SteamshipError({ statusMessage: 'Empty response.' });
    }

    const taskParams: TaskParams<T> = json?.status as TaskParams<T>;
    let task: Task<T>;

    if (typeof taskParams?.state != 'undefined') {
      task = new Task(this, {
        ...taskParams,
        responsePath: responsePath,
        rawResponse: rawResponse,
        objectConstructor: objectConstructor,
      });
      if (task?.state == TaskState.failed) {
        throw await this._makeError({ task });
      }
    } else {
      task = new Task(this, {
        responsePath: responsePath,
        rawResponse: rawResponse,
        objectConstructor: objectConstructor,
      });
    }

    task.setData(json?.data);
    return task;
  }

  async call<T>(
    verb: Verb,
    operation: string,
    payload: unknown,
    config?: PostConfig<T>,
    overrideConfig?: Configuration
  ): Promise<Response | Task<T>> {
    // This overrideConfig var is necessary for the switch config operation at init
    const baseConfig = overrideConfig || (await this.config);
    if (!baseConfig.apiKey) {
      throw new SteamshipError({
        statusCode: 'Authentication',
        statusMessage: 'API Key not found.',
        statusSuggestion:
          'Please see docs.steamship.com for a variety of ways to set your API key.',
      });
    }

    let url = this._url(baseConfig, config, operation);
    const headers = this._headers(baseConfig, config);

    const reqConfig = {
      headers: headers,
      maxContentLength: MAX_BODY_LENGTH,
      maxBodyLength: MAX_BODY_LENGTH,
    };

    let finalPayload: undefined | unknown | { [key: string]: undefined } =
      undefined;
    if (verb == 'POST' && config?.file) {
      let contentType = undefined;
      if (typeof config.file != 'string') {
        contentType = 'binary/octet-stream';
      }

      // Important so proper boundary can be set;
      delete reqConfig.headers['Content-Type'];

      if (isNode()) {
        const FormDataNode = await import('form-data');
        const formData = new FormDataNode.default();
        formData.append('file', Buffer.from(config.file as any), {
          filename: config?.filename,
          contentType: contentType,
        });
        const pp = payload as { [key: string]: undefined };
        for (const key of Object.keys(pp)) {
          const value = pp[key];
          addMultiparts(formData, key, value);
        }
        finalPayload = formData;

        // This only needs to happen on Node.
        // And the .getHeaders method is unavilabile in the browser.
        // NOTE: This is untested in the unit tests; it will show up as a failure in the browser.
        // TODO: We need to start running tests inside a browser runtime too.
        reqConfig.headers = { ...reqConfig.headers, ...formData.getHeaders() };
      } else {
        const formData = new FormData();
        /*
         * The config.file as any cast below is because FormData does not support Buffer.
         * In general, file as a Buffer should only be done from within the NodeJS environment,
         * not from within the browser. In the browser, Blob should be used instead.
         *
         * TODO: Figure out if there's a way to strongly type (or at least runtime check) this
         * so that we get back intelligent errors that are environment-dependent.
         */
        formData.append('file', config.file as any, config?.filename);
        const pp = payload as { [key: string]: undefined };
        for (const key of Object.keys(pp)) {
          const value = pp[key];
          addMultiparts(formData, key, value);
        }
        finalPayload = formData;
      }
    } else if (typeof payload == 'object') {
      finalPayload = JSON.stringify(payload);
    } else {
      finalPayload = payload;
    }

    let resp: Response;

    try {
      if (verb == 'POST') {
        resp = await doFetch(url, {
          method: verb,
          body: finalPayload as any,
          headers: reqConfig.headers,
        });
        // resp = await axios.post(url, finalPayload, reqConfig);
      } else if (verb == 'GET') {
        // TODO: Incorporate params into the query string
        if (payload) {
          url = url + '?' + new URLSearchParams(payload as any);
        }
        resp = await doFetch(url, {
          method: verb,
          headers: reqConfig.headers,
        });
        // resp = await axios.get(url, { ...reqConfig, params: finalPayload });
      } else {
        throw new SteamshipError({
          statusMessage: `Unsupported HTTP Verb: ${verb}`,
        });
      }
    } catch (error: any) {
      throw this._makeError({ error });
    }

    return this._makeResponse({
      response: resp,
      rawResponse: config?.rawResponse,
      objectConstructor: config?.expect,
      responsePath: config?.responsePath,
    });
  }
}
