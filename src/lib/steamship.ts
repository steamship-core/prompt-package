import { Logger } from 'tslog';

import { ApiBase } from './api_base.js';
import getLogger from './log.js';
import { PackageInstance } from './package_instance.js';
import { PluginInstance } from './plugin_instance.js';
import { LoadConfigParams } from './shared/Configuration.js';
import { SteamshipError } from './steamship_error.js';
import { Task } from './task.js';
import { CreateLoginAttemptResponse } from './types/account.js';

const log: Logger = getLogger('Steamship');

export class Steamship extends ApiBase {
  public constructor(config?: LoadConfigParams) {
    super(config);
  }

  /**
   * Create a login attempt token, useful for logging in a client from the CLI
   * @returns A response object with a "token" field
   */
  async createLoginAttempt(): Promise<Task<CreateLoginAttemptResponse>> {
    return (await this.post(
      'account/create_login_attempt',
      {}
    )) as Task<CreateLoginAttemptResponse>;
  }

  /**
   * Creates/loads an instance of package `packageHandle`.
   *
   * The instance is named `instanceHandle` and located in the Workspace named
   * `instanceHandle`.
   *
   * For example, one may write the following to always get back the same package
   * instance, no matter how many times you run it, scoped into its own workspace:
   *
   * ```javascript
   * let package = Steamship.use('package-handle', 'instance-handle')
   * ```
   *
   * If you wish to override the usage of a workspace named `instanceHandle`,
   * you can provide the `workspaceHandle` parameter.
   *
   * @param packageHandle - The package to use
   * @param instanceHandle - The identifier for your instance and its state
   * @param config - A config object parameterizing this package instance
   * @param version - Optional version handle
   * @param reuse - Whether to reuse the existing instance by the provided handle if it exists. Default: true
   * @param workspaceHandle - The workspace to create/use in which this instance should exist. Defaults to `instanceHandle`
   *
   * @returns PackageInstance
   */
  public static async use(
    packageHandle: string,
    instanceHandle?: string,
    config?: Record<string, unknown>,
    version?: string,
    reuse?: boolean,
    workspaceHandle?: string
  ): Promise<PackageInstance> {
    const fixedInstanceHandle = instanceHandle || packageHandle;
    const workspace = workspaceHandle || fixedInstanceHandle;
    log.info(
      `Steamship.use using workspace ${workspace}, instanceHandle ${fixedInstanceHandle}`
    );
    const client = new Steamship({ workspace });
    return client.use(
      packageHandle,
      fixedInstanceHandle,
      config,
      version,
      reuse
    );
  }

  /**
   * Creates/loads an instance of package `packageHandle`.
   * The instance is named `instanceHandle` and located in the workspace this
   * client is anchored to instanceHandle."""
   * @returns PackageInstance
   */
  public async use(
    packageHandle: string,
    instanceHandle?: string,
    config?: Record<string, unknown>,
    version?: string,
    reuse?: boolean
  ): Promise<PackageInstance> {
    const fixedInstanceHandle = instanceHandle || packageHandle;
    if (typeof reuse == 'undefined') {
      reuse = true;
    }
    const response = await PackageInstance.create(this, {
      handle: fixedInstanceHandle,
      packageHandle: packageHandle,
      packageVersionHandle: version,
      fetchIfExists: reuse,
      config: config,
    });
    if (!response.output) {
      throw new SteamshipError({
        statusMessage:
          'Unable to create an instance of your package -- an empty object was returned.',
      });
    }
    return response.output;
  }

  /**
   * Creates/loads an instance of plugin `pluginHandle`.
   *
   * The instance is named `instanceHandle` and located in the Workspace named `instanceHandle`.
   *
   * For example, one may write the following to always get back the same package instance, no matter how many
   * times you run it, scoped into its own workspace:
   *
   * ```javascript
   * let plugin = Steamship.usePlugin('plugin-handle', 'instance-handle')
   * ```
   *
   * If you wish to override the usage of a workspace named `instanceHandle`,
   * you can provide the `workspaceHandle` parameter.
   * @returns PluginInstance
   */
  public static async usePlugin(
    pluginHandle: string,
    instanceHandle?: string,
    config?: Record<string, unknown>,
    version?: string,
    reuse?: boolean,
    workspaceHandle?: string
  ): Promise<PluginInstance> {
    const fixedInstanceHandle = instanceHandle || pluginHandle;
    const configArgs: LoadConfigParams = {
      workspace: workspaceHandle || fixedInstanceHandle,
    };
    const client = new Steamship(configArgs);
    return client.usePlugin(
      pluginHandle,
      fixedInstanceHandle,
      config,
      version,
      reuse
    );
  }

  /**
   * Creates/loads an instance of plugin `pluginHandle`.
   * The instance is named `instanceHandle` and located in the workspace this
   * client is anchored to instanceHandle."""
   * @returns PluginInstance
   */
  public async usePlugin(
    pluginHandle: string,
    instanceHandle?: string,
    config?: Record<string, unknown>,
    version?: string,
    reuse?: boolean
  ): Promise<PluginInstance> {
    const fixedInstanceHandle = instanceHandle || pluginHandle;
    if (typeof reuse == 'undefined') {
      reuse = true;
    }
    const response = await PluginInstance.create(this, {
      handle: fixedInstanceHandle,
      pluginHandle: pluginHandle,
      pluginVersionHandle: version,
      fetchIfExists: reuse,
      config: config,
    });
    if (!response.output) {
      throw new SteamshipError({
        statusMessage:
          'Unable to create an instance of your plugin -- an empty object was returned.',
      });
    }
    return response.output;
  }
}
