/*
 * The goal of this file is to provide a credential-loading system
 * that is safe in BOTH the command line and the browser.
 */

export interface Configuration {
  apiKey?: string;
  apiBase?: string;
  appBase?: string;
  spaceId?: string;
  spaceHandle?: string;
  profile?: string;
  profiles?: { [name: string]: Configuration };
}

export interface LoadConfigParams {
  apiKey?: string;
  apiBase?: string; // https://api.nludb.com/api/v1
  appBase?: string; // https://nludb.run/api/v1
  spaceId?: string;
  spaceHandle?: string;
  profile?: string;
  configFile?: string; // config file on disk
}

const defaultProdCredentials = {
  apiBase: 'https://api.nludb.com/api/v1',
  appBase: 'https://nludb.com/api/v1',
};

// const defaultStagingCredentials = {
//   apiBase: "https://api.staging.nludb.com/api/v1",
//   appBase: "https://staging.nludb.com/api/v1"
// }

const CONFIG_FILENAME = '.steamship.json';

class ConfigLoader {
  static isNode(): boolean {
    if (
      typeof process !== 'undefined' &&
      process.release.name.search(/node|io.js/) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  _readFile: undefined | ((filePath: string) => string | undefined) = undefined;
  _configSearchPath: string[] = [];
  _config: Configuration = {}

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
    } catch {
      // Running from the browser
      this._readFile = (): string | undefined => {
        return undefined;
      };
    }

    try {
      if (ConfigLoader.isNode()) {
        // First search for .nludb.json in the current tree.
        const os = await import('os');
        const path = await import('path');

        if (process && process.cwd) {
          let cwd = process.cwd();
          while (cwd.length > 0 && cwd != path.sep) {
            this._configSearchPath.push(path.join(cwd, CONFIG_FILENAME));
            const parts = cwd.split(path.sep)
            parts.pop()
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

  async _read(filePath?: string, profile?: string): Promise<Configuration | undefined> {
    if (!filePath) {
      return undefined;
    }
    if (!ConfigLoader.isNode()) {
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
      if (!json["profiles"]) {
        return undefined
      }
      if (!json["profiles"][profile]) {
        return undefined
      }
      return json["profiles"][profile] as Configuration
    } else {
      return json as Configuration;
    }
  }

  clear() {
    this._config = {
      apiBase: defaultProdCredentials.apiBase,
      appBase: defaultProdCredentials.appBase,
    }
  }

  async loadFromFile(filename?: string, profile?: string): Promise<boolean> {
    if (!filename) {
      return false
    }
    const config = await this._read(filename, profile)
    if (!config) {
      return false
    }
    if (config.apiBase) {
      this._config.apiBase = config.apiBase
    }
    if (config.appBase) {
      this._config.appBase = config.appBase
    }
    if (config.apiKey) {
      this._config.apiKey = config.apiKey
    }
    if (config.spaceId) {
      this._config.spaceId = config.spaceId
    }
    if (config.spaceHandle) {
      this._config.spaceHandle = config.spaceHandle
    }
    return true
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
        if (process.env['NLUDB_API_BASE']) {
          this._config.apiBase = process.env['NLUDB_API_BASE'];
        }
        if (process.env['NLUDB_APP_BASE']) {
          this._config.appBase = process.env['NLUDB_APP_BASE'];
        }
        if (process.env['NLUDB_API_KEY']) {
          this._config.apiKey = process.env['NLUDB_API_KEY'];
        }
        if (process.env['NLUDB_SPACE_ID']) {
          this._config.spaceId = process.env['NLUDB_SPACE_ID'];
        }
        if (process.env['NLUDB_SPACE_HANDLE']) {
          this._config.spaceHandle = process.env['NLUDB_SPACE_HANDLE'];
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
    if (params?.apiKey) {
      this._config.apiKey = params?.apiKey;
    }
    if (params?.spaceId) {
      this._config.spaceId = params?.spaceId;
    }
    if (params?.spaceHandle) {
      this._config.spaceHandle = params?.spaceHandle;
    }
  }

  async load(params?: LoadConfigParams): Promise<Configuration> {
    await this.prepare()
    this.clear()

    // First set the profile.
    if (typeof process != 'undefined' && typeof process.env != 'undefined') {
      if (process.env['NLUDB_PROFILE']) {
        this._config.profile = process.env['NLUDB_PROFILE'];
      }
    }
    if (params?.profile) {
      this._config.profile = params?.profile
    }

    // Then load from a file if provided
    if (params?.configFile) {
      const found = await this.loadFromFile(params?.configFile, this._config.profile)
      if (!found) {
        throw Error(
          `Configuration path provided by no configuration found there. ${params?.configFile}`
        );
      }
    } else {
      await this.tryAutofindingFiles(this._config.profile)
    }

    // Apply Env Variables
    await this.loadEnvVars()

    // Apply manual overrides
    this.applyManualOverrides()

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
    return this._config;
  }
}

export async function loadConfiguration(
  params?: LoadConfigParams
): Promise<Configuration> {
  // If a file is provided, that always gets
  const configLoader = new ConfigLoader();
  return configLoader.load(params)
}
