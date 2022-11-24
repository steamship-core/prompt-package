import { isNode } from '../utils';

/*
 * The goal of this file is to provide a credential-loading system
 * that is safe in BOTH the command line and the browser.
 */

export interface Configuration {
  apiKey?: string;
  apiBase?: string;
  appBase?: string;
  webBase?: string;
  workspaceId?: string;
  workspaceHandle?: string;
  profile?: string;
  profiles?: { [name: string]: Configuration };
}

export interface LoadConfigParams {
  apiKey?: string;
  apiBase?: string; // https://api.steamship.com/api/v1
  appBase?: string; // https://steamship.run/
  webBase?: string; // https://app.steamship.com
  workspace?: string;
  profile?: string;
  configFile?: string; // config file on disk
  failIfWorkspaceExists?: boolean;
}

export interface SaveConfigParams {
  apiKey?: string;
  apiBase?: string;
  appBase?: string;
  webBase?: string;
  workspaceId?: string;
  workspaceHandle?: string;
  profile?: string;
  profiles?: { [name: string]: Configuration }; // Only allowed if not modifying a profile
}

export const DEFAULT_CONFIG: {
  apiBase: string;
  appBase: string;
  webBase: string;
} = {
  apiBase: 'https://api.steamship.com/api/v1/',
  appBase: 'https://steamship.run/',
  webBase: 'https://app.steamship.com/',
};

// const defaultStagingCredentials = {
//   apiBase: "https://api.staging.steamship.com/api/v1",
//   appBase: "https://staging.steamship.com/api/v1"
// }

export const CONFIG_FILENAME = '.steamship.json';

class ConfigManager {
  _readFile: undefined | ((filePath: string) => string | undefined) = undefined;
  _writeFile: undefined | ((filePath: string, data: string) => void) =
    undefined;
  _configSearchPath: string[] = [];
  _config: Configuration = {};

  async prepare() {
    // Create the _readFile function
    try {
      const fs = await import('fs');
      this._readFile = (filePath: string): string | undefined => {
        if (!fs.existsSync(filePath)) {
          return undefined;
        }
        return fs.readFileSync(filePath, 'utf8');
      };
      this._writeFile = (filePath: string, data: string) => {
        fs.writeFileSync(filePath, data);
      };
    } catch {
      // Running from the browser
      this._readFile = (): string | undefined => {
        return undefined;
      };
    }

    try {
      if (isNode()) {
        // First search for .steamship.json in the current tree.
        const os = await import('os');
        const path = await import('path');

        if (process && process.cwd) {
          let cwd = process.cwd();
          while (cwd.length > 0 && cwd != path.sep) {
            this._configSearchPath.push(path.join(cwd, CONFIG_FILENAME));
            const parts = cwd.split(path.sep);
            parts.pop();
            cwd = parts.join(path.sep).trim();
          }
        }
        // Try the home folder last.
        this._configSearchPath.push(path.join(os.homedir(), CONFIG_FILENAME));
      }
    } catch {
      // pass
    }
  }

  async _read(
    filePath?: string,
    profile?: string
  ): Promise<Configuration | undefined> {
    if (!filePath) {
      return undefined;
    }
    if (!isNode()) {
      return undefined;
    }
    if (typeof this._readFile == 'undefined') {
      return undefined;
    }

    const str = this._readFile(filePath);
    if (!str) {
      return undefined;
    }
    // Let the parsing error trickle up!
    // We want the user to know their config has a problem.
    const json = JSON.parse(str);

    if (profile) {
      if (!json['profiles']) {
        return undefined;
      }
      if (!json['profiles'][profile]) {
        return undefined;
      }
      return json['profiles'][profile] as Configuration;
    } else {
      return json as Configuration;
    }
  }

  clear() {
    this._config = {
      apiBase: DEFAULT_CONFIG.apiBase,
      appBase: DEFAULT_CONFIG.appBase,
      webBase: DEFAULT_CONFIG.webBase,
    };
  }

  async loadFromFile(filename?: string, profile?: string): Promise<boolean> {
    if (!filename) {
      return false;
    }
    const config = await this._read(filename, profile);
    if (!config) {
      return false;
    }
    if (config.apiBase) {
      this._config.apiBase = config.apiBase;
    }
    if (config.appBase) {
      this._config.appBase = config.appBase;
    }
    if (config.webBase) {
      this._config.webBase = config.webBase;
    }
    if (config.apiKey) {
      this._config.apiKey = config.apiKey;
    }
    if (config.workspaceId) {
      this._config.workspaceId = config.workspaceId;
    }
    if (config.workspaceHandle) {
      this._config.workspaceHandle = config.workspaceHandle;
    }
    return true;
  }

  async tryAutofindingFiles(profile?: string): Promise<boolean> {
    for (const configPath of this._configSearchPath) {
      const found = await this.loadFromFile(configPath, profile);
      if (found) {
        return true;
      }
    }
    return false;
  }

  async loadEnvVars() {
    if (typeof process != 'undefined' && typeof process.env != 'undefined') {
      try {
        if (process.env['STEAMSHIP_API_BASE']) {
          this._config.apiBase = process.env['STEAMSHIP_API_BASE'];
        }
        if (process.env['STEAMSHIP_APP_BASE']) {
          this._config.appBase = process.env['STEAMSHIP_APP_BASE'];
        }
        if (process.env['STEAMSHIP_WEB_BASE']) {
          this._config.webBase = process.env['STEAMSHIP_WEB_BASE'];
        }
        if (process.env['STEAMSHIP_API_KEY']) {
          this._config.apiKey = process.env['STEAMSHIP_API_KEY'];
        }
        if (process.env['STEAMSHIP_WORKSPACE_ID']) {
          this._config.workspaceId = process.env['STEAMSHIP_WORKSPACE_ID'];
        }
        if (process.env['STEAMSHIP_WORKSPACE_HANDLE']) {
          this._config.workspaceHandle =
            process.env['STEAMSHIP_WORKSPACE_HANDLE'];
        }
      } catch {
        // pass
      }
    }
  }

  applyManualOverrides(params?: LoadConfigParams) {
    if (params?.apiBase) {
      this._config.apiBase = params?.apiBase;
    }
    if (params?.appBase) {
      this._config.appBase = params?.appBase;
    }
    if (params?.webBase) {
      this._config.webBase = params?.webBase;
    }
    if (params?.apiKey) {
      this._config.apiKey = params?.apiKey;
    }
    if (params?.workspace) {
      this._config.workspaceHandle = params?.workspace;
    }
  }

  async load(params?: LoadConfigParams): Promise<Configuration> {
    await this.prepare();
    this.clear();

    // First set the profile.
    if (typeof process != 'undefined' && typeof process.env != 'undefined') {
      if (process.env['STEAMSHIP_PROFILE']) {
        this._config.profile = process.env['STEAMSHIP_PROFILE'];
      }
    }
    if (params?.profile) {
      this._config.profile = params?.profile;
    }

    // Then load from a file if provided
    if (params?.configFile) {
      const found = await this.loadFromFile(
        params?.configFile,
        this._config.profile
      );
      if (!found) {
        throw `Configuration path provided but no configuration found at '${params?.configFile}'`;
      }
    } else {
      await this.tryAutofindingFiles(this._config.profile);
    }

    // Apply Env Variables
    await this.loadEnvVars();

    // Apply manual overrides
    this.applyManualOverrides(params);

    // Fix the base
    if (this._config.apiBase) {
      if (this._config.apiBase[this._config.apiBase.length - 1] != '/') {
        this._config.apiBase = `${this._config.apiBase}/`;
      }
    }
    if (this._config.appBase) {
      if (this._config.appBase[this._config.appBase.length - 1] != '/') {
        this._config.appBase = `${this._config.appBase}/`;
      }
    }
    if (this._config.webBase) {
      if (this._config.webBase[this._config.webBase.length - 1] != '/') {
        this._config.webBase = `${this._config.webBase}/`;
      }
    }
    return this._config;
  }

  async modifyConfiguration(
    values: SaveConfigParams,
    profile?: string,
    configFile?: string
  ) {
    await this.prepare();
    if (
      !isNode() ||
      typeof this._readFile == 'undefined' ||
      typeof this._writeFile == 'undefined'
    ) {
      throw 'Could not save configuration, no filesystem found.';
    }

    const os = await import('os');
    const path = await import('path');

    // Load the config file from the given path or the default path
    // If the file does not exist, create a new config

    if (typeof configFile === 'string' && configFile.trim() === '') {
      throw 'An invalid save location was given.';
    }

    if (!configFile) {
      configFile = path.join(os.homedir(), CONFIG_FILENAME);
    }
    const str = this._readFile(configFile);
    let newConfig: Configuration = { ...DEFAULT_CONFIG };
    if (str) {
      try {
        newConfig = JSON.parse(str) as Configuration;
      } catch (e) {
        // If there is an issue with the config, we just use the default
      }
    }

    // Now set the desired values. If there is a profile, only do this to that
    // profile. Otherwise, override the fields.
    if (profile) {
      if (!newConfig.profiles) {
        newConfig.profiles = {}; // Add the profiles field if it does not exist
      }
      if (!Object.keys(newConfig.profiles).includes(profile)) {
        newConfig.profiles[profile] = { profile: profile }; // Adds this specific profile
      }
      Object.keys(values).forEach((key: string) => {
        if (key === 'profiles') {
          throw 'Cannot save a profiles list within a profile itself. A `profiles` modification is only allowed on the default config (i.e. leave `profile` blank)';
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newConfig.profiles[profile][key] =
          values[key as keyof SaveConfigParams];
      });
    } else {
      Object.keys(values).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newConfig[key] = values[key as keyof SaveConfigParams];
      });
    }

    // Finally, save the configuration
    this._writeFile(configFile, JSON.stringify(newConfig, undefined, 2));
  }
}

export async function loadConfiguration(
  params?: LoadConfigParams
): Promise<Configuration> {
  const configManager = new ConfigManager();
  return await configManager.load(params);
}

/**
 * Modifies or creates a configuration given the desired values. Allows
 * modifying the default profile, or modifying individual profiles by
 * providing a `profile` parameter. If no configFile is given, defaults
 * to the default location (home directory / .steamship.json).
 * Note: If the configFile already exists, the existing file is modified.
 *       If the file is corrupt or missing, a new file is created
 * @param values The values to save to the config or profile
 * @param profile (Optional) The profile to override. Defaults to the default
 *                profile.
 * @param configFile (Optional) The absolute location to the file to save
 *                   to. Defaults to (home directory / .steamship.json)
 */
export async function saveConfiguration(
  values: SaveConfigParams,
  profile?: string,
  configFile?: string
): Promise<void> {
  const configManager = new ConfigManager();
  await configManager.modifyConfiguration(values, profile, configFile);
}
