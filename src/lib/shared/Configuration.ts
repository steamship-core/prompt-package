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
  profiles?: { [name: string]: Configuration };
}

export interface LoadConfigParams {
  apiKey?: string;
  apiBase?: string; // https://api.nludb.com/api/v1
  appBase?: string; // https://nludb.run/api/v1
  spaceId?: string;
  spaceHandle?: string;
  filename?: string; // config file on disk
}

const defaultProdCredentials = {
  apiBase: 'https://api.nludb.com/api/v1',
  appBase: 'https://nludb.com/api/v1',
};

// const defaultStagingCredentials = {
//   apiBase: "https://api.staging.nludb.com/api/v1",
//   appBase: "https://staging.nludb.com/api/v1"
// }

const CONFIG_FILENAME = '.nludb.json';

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
      // Runing from the browser
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
            cwd = path.join(...cwd.split(path.sep)).trim();
          }
        }
        // Try the home folder last.
        this._configSearchPath.push(path.join(os.homedir(), CONFIG_FILENAME));
      }
    } catch {
      // pass
    }
  }

  async _read(filePath?: string): Promise<Configuration | undefined> {
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
    return json as Configuration;
  }
}

export async function loadConfiguration(
  params?: LoadConfigParams
): Promise<Configuration> {
  // If a file is provided, that always gets
  let ret: Configuration | undefined = undefined;
  const configLoader = new ConfigLoader();
  await configLoader.prepare();

  // First, we either use the filename (if provided) or try to find a file default.
  if (params?.filename) {
    ret = await configLoader._read(params?.filename);
    if (!ret) {
      throw Error(
        `Configuration path provided by no configuration found there. ${params?.filename}`
      );
    }
  } else {
    // Try to walk through the default paths.
    for (const configPath of configLoader._configSearchPath) {
      const config = await configLoader._read(configPath);
      if (config) {
        ret = config;
        break;
      }
    }
  }

  // Next, if we haven't been successful, we initialize a minimum viable config
  if (!ret) {
    // If there's still no
    ret = {
      apiBase: defaultProdCredentials.apiBase,
      appBase: defaultProdCredentials.appBase,
    };
  }

  // If a profile has been selected, use that
  if (typeof process != 'undefined' && typeof process.env != 'undefined') {
    try {
      if (process.env['NLUDB_PROFILE']) {
        const profile = process.env['NLUDB_PROFILE'] as string;
        if (
          typeof ret.profiles != 'undefined' &&
          typeof ret.profiles[profile] != 'undefined'
        ) {
          const profileData = ret.profiles[profile];
          if (profileData.apiBase) {
            ret.apiBase = profileData.apiBase;
          }
          if (profileData.appBase) {
            ret.appBase = profileData.appBase;
          }
          if (profileData.apiKey) {
            ret.apiKey = profileData.apiKey;
          }
          if (profileData.spaceId) {
            ret.spaceId = profileData.spaceId;
          }
          if (profileData.spaceHandle) {
            ret.spaceHandle = profileData.spaceHandle;
          }
        }
      }
    } catch {
      // pass
    }
  }

  // If environment variables have been set, then we apply those.
  if (typeof process != 'undefined' && typeof process.env != 'undefined') {
    try {
      if (process.env['NLUDB_API_BASE']) {
        ret.apiBase = process.env['NLUDB_API_BASE'];
      }
      if (process.env['NLUDB_APP_BASE']) {
        ret.appBase = process.env['NLUDB_APP_BASE'];
      }
      if (process.env['NLUDB_API_KEY']) {
        ret.apiKey = process.env['NLUDB_API_KEY'];
      }
      if (process.env['NLUDB_SPACE_ID']) {
        ret.spaceId = process.env['NLUDB_SPACE_ID'];
      }
      if (process.env['NLUDB_SPACE_HANDLE']) {
        ret.spaceHandle = process.env['NLUDB_SPACE_HANDLE'];
      }
    } catch {
      // pass
    }
  }

  // Finally if manual overrides were requested, we apply those.
  if (params?.apiBase) {
    ret.apiBase = params?.apiBase;
  }
  if (params?.appBase) {
    ret.appBase = params?.appBase;
  }
  if (params?.apiKey) {
    ret.apiKey = params?.apiKey;
  }
  if (params?.spaceId) {
    ret.spaceId = params?.spaceId;
  }
  if (params?.spaceHandle) {
    ret.spaceHandle = params?.spaceHandle;
  }

  // Not needed; trim excess.
  delete ret.profiles;

  // Fix the base
  if (params?.apiBase) {
    if (params.apiBase[params.apiBase.length - 1] != '/') {
      params.apiBase = `${params.apiBase}/`;
    }
  }
  if (params?.appBase) {
    if (params.appBase[params.appBase.length - 1] != '/') {
      params.appBase = `${params.appBase}/`;
    }
  }

  return ret;
}
