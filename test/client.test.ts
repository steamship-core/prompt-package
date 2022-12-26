import {Steamship} from '../src';
import {File} from '../src';
// @ts-ignore
import {
  randomName,
  steamshipClient
// @ts-ignore
} from './helper';

describe('Steamship Client', () => {
  test('it should be running with the `test` profile', async () => {
    const steamship = steamshipClient();
    let config = await steamship.config;
    expect(config.profile).toBe('test');
  });

  test('it should be able to create a login attempt token', async () => {
    const client = new Steamship();
    await client.config;
    const createTokenResponse = await client.createLoginAttempt();
    expect(createTokenResponse.output!.token).not.toBeUndefined();
  });

  test('Specifying a workspace should create it', async () => {
    let workspaceName = randomName()
    const steamship = steamshipClient(workspaceName);
    let config = await steamship.config;

    const steamshipDefault = steamshipClient();
    let configDefault = await steamshipDefault.config;

    expect(config.workspaceHandle).toBe(workspaceName);
    expect(config.workspaceHandle).not.toBe(configDefault);

    // Make sure we can get it again
    const steamship2 = steamshipClient(workspaceName);
    let config2 = await steamship2.config;
    expect(config.workspaceHandle).toBe(config2.workspaceHandle);
    expect(config.workspaceId).toBe(config2.workspaceId);

    // Now make sure we can use it
    const content = 'A'

    const res = await File.upload(steamship, {
      content,
      mimeType: "text/markdown"
    })
    expect(res.output).not.toBeUndefined()
    expect(res.output?.id).not.toBeUndefined()
    expect(res.output?.mimeType).toBe("text/markdown")
    expect(res.output?.workspaceId).toBe(config.workspaceId)
    // await res.data?.delete()
  }, 10000);

});
