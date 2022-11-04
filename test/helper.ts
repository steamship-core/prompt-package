import {Steamship} from '../src/lib/steamship';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {CONFIG_FILENAME, Configuration,} from '../src/lib/shared/Configuration';

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export function randomName(): string {
  const id = generateRandomString(10);
  return `test-${id}`;
}

export function steamshipClient(workspace?: string): Steamship {
  return new Steamship({profile: 'test', workspace});
}

export const DEFAULT_CONFIG: Configuration = {
  apiKey: '1234-5678-9123-4567',
  apiBase: 'https://api.steamship.com/api/v1/',
  appBase: 'https://steamship.com/api/v1/',
  workspaceId: '9876-5432-100',
};

export const DEFAULT_CONFIG_WITH_PROFILE: Configuration = {
  apiKey: 'some new key',
  apiBase: 'https://api.steamship.com/api/v1/',
  appBase: 'https://steamship.com/api/v1/',
  workspaceId: 'some space id',
  workspaceHandle: 'the space name',
  // profile: this key will be attached upon load
  profiles: {
    my_profile: {
      apiKey: 'some special profile api key',
      apiBase: 'https://other.steamship.com/api/v1/',
      appBase: 'https://other.steamship.com/api/v1/',
      workspaceId: 'some new space id',
      workspaceHandle: 'the new space name',
    },
  },
};

export function mockDefaultConfigFile(config?: Configuration): {
  anotherFile: string;
} {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'steamship-tests'));

  jest.spyOn(os, 'homedir').mockImplementation((): string => {
    return tmpDir;
  });

  jest.spyOn(process, 'cwd').mockImplementation((): string => {
    return tmpDir;
  });

  if (!config) {
    config = DEFAULT_CONFIG;
  }

  let defaultLocation = path.join(os.homedir(), CONFIG_FILENAME);
  fs.writeFileSync(defaultLocation, JSON.stringify(config), {flag: 'w+'});
  let otherConfig = JSON.parse(JSON.stringify(config));
  otherConfig.apiKey = 'special location';
  const anotherTmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'another-steam-test')
  );
  fs.writeFileSync(
    path.join(anotherTmpDir, CONFIG_FILENAME),
    JSON.stringify(otherConfig),
    {flag: 'w+'}
  );
  return {anotherFile: path.join(anotherTmpDir, CONFIG_FILENAME)};
}

export function restoreMocks() {
  jest.restoreAllMocks();
}
