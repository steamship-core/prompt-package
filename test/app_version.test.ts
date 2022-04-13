import { steamshipClient } from './helper';
import { App } from '../src/lib/app'
import { AppVersion } from '../src/lib/app_version'
import path from 'path'
import { Client } from '../src/lib/client';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function helloWorld(client: Client): Promise<[App, AppVersion]> {
  return deployAppVersion(client, 'demo_app.zip')
}

export async function deployAppVersion(client: Client, appPackage: string, configTemplate: Record<string, any> = {}): Promise<[App, AppVersion]> {
  const req1 = (await App.create(client))
  const app1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', appPackage)

  const version1t = (await AppVersion.create(client, {
    appId: app1.id!,
    filename: filename,
    configTemplate: configTemplate,
  }))
  await version1t.wait()
  await delay(15000) // TODO: When our task system awaits the Lambda deployment, we can remove this.

  const version1 = version1t.data!
  return [app1, version1]
}

describe("App Version", () => {
  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const [app1, version1] = await helloWorld(steamship)

    expect(app1.id).not.toBeUndefined()
    expect(version1.handle).not.toBeUndefined()
    expect(version1.name).not.toBeUndefined()

    // Can get them!
    const version1a = (await AppVersion.get(steamship, { id: version1.id })).data!
    expect(version1a.name).toBe(version1.name)
    expect(version1a.id).toBe(version1.id)
    expect(version1a.handle).toBe(version1.handle)

    // Can list them
    const app1lr = await AppVersion.list(steamship, { appId: app1.id! })
    const app1l = app1lr.data!
    expect(app1l.appVersions.length).toBe(1)

    await version1.delete()

    await app1.delete()
  }, 25000);
})
