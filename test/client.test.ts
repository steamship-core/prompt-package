import axios from 'axios';
import {Steamship} from '../src/lib/steamship';
import {
  mockDefaultConfigFile,
  randomName,
  restoreMocks,
  steamshipClient
} from './helper';

describe('Steamship Client', () => {
  test('it should be running with the `test` profile', async () => {
    const steamship = steamshipClient();
    let config = await steamship.config;
    expect(config.profile).toBe('test');
  });

  test('it should be able to create a login attempt token', async () => {
    mockDefaultConfigFile();

    jest.spyOn(axios, 'post');

    // @ts-ignore
    axios.post.mockResolvedValue({
      data: {
        data: {
          token: 'hello',
        },
      },
    });

    const client = new Steamship();
    const createTokenResponse = await client.createLoginAttempt();
    expect(createTokenResponse.data!.token).toEqual('hello');
    restoreMocks();
  });

  test('Specifying a workspace should create it', async () => {
    let workspaceName = randomName()
    const steamship = steamshipClient(workspaceName);
    let config = await steamship.config;

    const steamshipDefault = steamshipClient();
    let configDefault = await steamshipDefault.config;

    expect(config.workspaceHandle).toBe(workspaceName);
    expect(config.workspaceHandle).not.toBe(configDefault);
  });

});
