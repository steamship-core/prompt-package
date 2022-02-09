import { nludb_client } from './helper';
import { App } from '../src/lib/app'
import { AppVersion } from '../src/lib/app_version'
import path from 'path'
import { Client } from '../src/lib/nludb';

export async function helloWorld(client: Client): Promise<[App, AppVersion]> {
  const req1 = (await App.create(client))
  const app1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', 'hello-world-1.zip')

  const version1t = (await AppVersion.create(client, {
    appId: app1.id!,
    filename: filename
  }))
  await version1t.wait()
  const version1 = version1t.data!
  return [app1, version1]
}

describe("App Version", () => {
  test('it should be creatable and deletable', async () => {
    const nludb = nludb_client();
    const [app1, version1] = await helloWorld(nludb)
    expect(app1.id).not.toBeUndefined()
    expect(version1.handle).not.toBeUndefined()
    expect(version1.name).not.toBeUndefined()

    // Can get them!
    const version1a = (await AppVersion.get(nludb, {id: version1.id})).data!
    expect(version1a.name).toBe(version1.name)
    expect(version1a.id).toBe(version1.id)
    expect(version1a.handle).toBe(version1.handle)

    await version1.delete()

    await app1.delete()
  }, 10000);
})
