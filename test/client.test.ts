import axios from 'axios';
import {Client} from '../src/lib/client';
import {mockDefaultConfigFile, restoreMocks, steamshipClient} from './helper';

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

    const client = new Client();
    const createTokenResponse = await client.createLoginAttempt();
    expect(createTokenResponse.data!.token).toEqual('hello');
    restoreMocks();
  });
});
