import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  CONFIG_FILENAME,
  Configuration,
  loadConfiguration,
  saveConfiguration,
} from '../src/lib/shared/Configuration';

let DEFAULT_CONFIG_WITHOUT_CUSTOMIZATION: Configuration = {
  apiBase: 'https://api.steamship.com/api/v1/',
  appBase: 'https://steamship.run/',
  webBase: 'https://app.steamship.com/'
};

let DEFAULT_CONFIG: Configuration = {
  apiKey: '1234-5678-9123-4567',
  apiBase: 'https://api.steamship.com/api/v1/',
  appBase: 'https://steamship.run/',
  webBase: 'https://app.steamship.com/',
  spaceId: '9876-5432-100',
};

let DEFAULT_CONFIG_WITH_PROFILE: Configuration = {
  apiKey: 'some new key',
  apiBase: 'https://api.steamship.com/api/v1/',
  appBase: 'https://steamship.run/',
  webBase: 'https://app.steamship.com/',
  spaceId: 'some space id',
  spaceHandle: 'the space name',
  // profile: this key will be attached upon load
  profiles: {
    my_profile: {
      apiKey: 'some special profile api key',
      apiBase: 'https://other.steamship.com/api/v1/',
      appBase: 'https://other.steamship.com/api/v1/',
      webBase: 'http://app.steamship.com/',
      spaceId: 'some new space id',
      spaceHandle: 'the new space name',
    },
  },
};

function mockDefaultConfigFile(config?: Configuration): {
  anotherFile: string;
} {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'steam-test'));

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

function restoreMocks() {
  jest.restoreAllMocks();
}

/**
 * Tests the following use cases and edge cases
 * - Adding a new profile when other profiles exist
 * - Adding a new profile when no profiles exist
 * - Save to a corrupted config file
 */
describe('Configuration', () => {
  test('it should load an existing config file from the default location', async () => {
    mockDefaultConfigFile();
    let config = await loadConfiguration();
    expect(config).toEqual(DEFAULT_CONFIG);
    restoreMocks();
  });

  test('it should load an existing config profile from the default location', async () => {
    mockDefaultConfigFile(DEFAULT_CONFIG_WITH_PROFILE);
    let config = await loadConfiguration({profile: 'my_profile'});
    let expected = JSON.parse(
      JSON.stringify(
        DEFAULT_CONFIG_WITH_PROFILE.profiles
          ? DEFAULT_CONFIG_WITH_PROFILE.profiles['my_profile']
          : {}
      )
    );
    expected.profile = 'my_profile';
    expect(config).toEqual(expected);
    restoreMocks();
  });

  test('it should load an existing config profile and override', async () => {
    mockDefaultConfigFile(DEFAULT_CONFIG_WITH_PROFILE);
    let config = await loadConfiguration({
      profile: 'my_profile',
      apiKey: 'my override key',
    });
    let expected = JSON.parse(
      JSON.stringify(
        DEFAULT_CONFIG_WITH_PROFILE.profiles
          ? DEFAULT_CONFIG_WITH_PROFILE.profiles['my_profile']
          : {}
      )
    );
    expected.profile = 'my_profile';
    expected.apiKey = 'my override key';
    expect(config).toEqual(expected);
    restoreMocks();
  });

  test('it should modify the config file in the default location', async () => {
    mockDefaultConfigFile();
    await saveConfiguration({apiKey: 'from saving'});
    let config = await loadConfiguration();
    let expected = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    expected.apiKey = 'from saving';
    expect(config).toEqual(expected);
    restoreMocks();
  });

  test('it should create a new config when the existing config is corrupted', async () => {
    mockDefaultConfigFile();
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'corrupted-config'));
    let newFile = path.join(tmpDir, CONFIG_FILENAME);
    fs.writeFileSync(newFile, 'I am not JSON!');
    await saveConfiguration({apiKey: 'from saving'}, undefined, newFile);
    let config = await loadConfiguration({configFile: newFile});
    let expected = {
      apiBase: 'https://api.steamship.com/api/v1/',
      appBase: 'https://steamship.run/',
      webBase: 'https://app.steamship.com/',
      apiKey: 'from saving',
    };
    expect(config).toEqual(expected);
    restoreMocks();
  });

  test('it should modify the config file profile in the default location', async () => {
    mockDefaultConfigFile(DEFAULT_CONFIG_WITH_PROFILE);
    await saveConfiguration({apiKey: 'from saving'}, 'my_profile');
    let config = await loadConfiguration({profile: 'my_profile'});
    let expected = JSON.parse(JSON.stringify(DEFAULT_CONFIG_WITH_PROFILE))
      .profiles['my_profile'];
    expected.apiKey = 'from saving';
    expected.profile = 'my_profile';
    expect(config).toEqual(expected);
    restoreMocks();
  });

  test('it should modify the config file profile in a specific location', async () => {
    mockDefaultConfigFile();
    // TODO: Sometimes this test is flaky, still looking into this...
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'new-location-test'));
    let newFile = path.join(tmpDir, CONFIG_FILENAME);
    await saveConfiguration({...DEFAULT_CONFIG}, 'my_profile', newFile);
    let profileConfig = await loadConfiguration({
      profile: 'my_profile',
      configFile: newFile,
    });
    let expectedProfile = {
      ...JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
      profile: 'my_profile',
    };
    expect(profileConfig).toEqual(expectedProfile);

    // Let's also test loading the config WITHOUT a profile.
    let entireConfig = await loadConfiguration({configFile: newFile});

    // It should be the default config WITHOUT any customization, we never provided
    // anything explicit to set here.
    expect(entireConfig).toEqual(DEFAULT_CONFIG_WITHOUT_CUSTOMIZATION);

    restoreMocks();
  });

  test('it should throw an error when saved in a bad location', async () => {
    mockDefaultConfigFile();
    expect.assertions(1);
    try {
      await saveConfiguration({...DEFAULT_CONFIG}, 'my_profile', '');
    } catch (e) {
      expect(e).toEqual('An invalid save location was given.');
    }
    restoreMocks();
  });

  test('it should throw an error when saving profiles in profiles', async () => {
    mockDefaultConfigFile();
    expect.assertions(1);
    try {
      await saveConfiguration({profiles: {hello: {}}}, 'my_profile');
    } catch (e) {
      expect(e).toContain(
        'Cannot save a profiles list within a profile itself'
      );
    }
    restoreMocks();
  });

  test('it should throw an error when reading from a bad location', async () => {
    mockDefaultConfigFile();
    expect.assertions(1);
    try {
      await loadConfiguration({configFile: 'nothing_here'});
    } catch (e) {
      expect(e).toEqual(
        "Configuration path provided but no configuration found at 'nothing_here'"
      );
    }
    restoreMocks();
  });

  test('it should read the config file in a specific location', async () => {
    const {anotherFile} = mockDefaultConfigFile();
    let config = await loadConfiguration({
      configFile: anotherFile,
    });
    let expected = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    expected.apiKey = 'special location';
    expect(config).toEqual(expected);
    restoreMocks();
  });

  test('it should override the config with env vars', async () => {
    mockDefaultConfigFile();
    process.env['STEAMSHIP_API_KEY'] = 'overridden by env var';
    let config = await loadConfiguration();
    let expected = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    expected.apiKey = 'overridden by env var';
    expect(config).toEqual(expected);
    delete process.env['STEAMSHIP_API_KEY'];
    restoreMocks();
  });

  test('it should select the profile with env vars', async () => {
    mockDefaultConfigFile(DEFAULT_CONFIG_WITH_PROFILE);
    process.env['STEAMSHIP_PROFILE'] = 'my_profile';
    let config = await loadConfiguration();
    let expected = JSON.parse(
      JSON.stringify(
        DEFAULT_CONFIG_WITH_PROFILE.profiles
          ? DEFAULT_CONFIG_WITH_PROFILE.profiles['my_profile']
          : {}
      )
    );
    expected.profile = 'my_profile';
    expect(config).toEqual(expected);
    delete process.env['STEAMSHIP_PROFILE'];
    restoreMocks();
  });
});
