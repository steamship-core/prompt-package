// @ts-ignore
import {randomName, steamshipClient} from './helper';
import {Plugin} from '../src/lib/plugin'
import {PluginVersion} from '../src/lib/plugin_version'
import * as path from 'path'
import {Steamship} from '../src/lib/steamship';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function csvBlockifier(client: Steamship): Promise<[Plugin, PluginVersion]> {
  return deployPluginVersion(client, 'csv-blockifier.zip')
}

export async function deployPluginVersion(client: Steamship, packageZip: string, configTemplate: Record<string, any> = {}): Promise<[Plugin, PluginVersion]> {
  const req1 = (await Plugin.create(client, {
    handle: randomName(),
    type: 'blockifier',
    transport: 'jsonOverHttp',
    isPublic: true,
    description: ''
  }))
  const app1 = req1.output!
  expect(app1.handle).not.toBeUndefined()
  expect(app1.handle).not.toBeNull()

  const filename = path.join(process.cwd(), 'testAssets', packageZip)

  const version1t = (await PluginVersion.create(client, {
    pluginId: app1.id!,
    handle: randomName(),
    filename: filename,
    configTemplate: configTemplate,
  }))
  await version1t.wait()
  await delay(15000) // TODO: When our task system awaits the Lambda deployment, we can remove this.

  const version1 = version1t.output!
  expect(version1.handle).not.toBeUndefined()
  expect(version1.handle).not.toBeNull()
  return [app1, version1]
}

describe("Plugin Version", () => {
  test('it should be usable via Steamship.use', async () => {
    try {
      const steamship = steamshipClient();
      await steamship.switchWorkspace({workspaceHandle: randomName()})
      const [app1] = await csvBlockifier(steamship)
      const instance1 = await steamship.usePlugin(app1.handle!, randomName(), undefined, undefined, false)
      expect(instance1.id).not.toBeUndefined()
    } catch (ex) {
      console.log(ex)
    }
  }, 45000);

  test('it should be usable via Steamship.use with named version', async () => {
    const steamship = steamshipClient();
    await steamship.switchWorkspace({workspaceHandle: randomName()})
    const [app1, version] = await csvBlockifier(steamship)
    const instance1 = await steamship.usePlugin(app1.handle!, randomName(), undefined, version.handle, false)
    expect(instance1.id).not.toBeUndefined()
  }, 45000);


  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const [app1, version1] = await csvBlockifier(steamship)

    expect(app1.id).not.toBeUndefined()
    expect(version1.handle).not.toBeUndefined()

    // Can get them!
    const version1a = (await PluginVersion.get(steamship, {id: version1.id})).output!
    expect(version1a.id).toBe(version1.id)
    expect(version1a.handle).toBe(version1.handle)

    // Can list them
    const app1lr = await PluginVersion.list(steamship, {pluginId: app1.id!})
    const app1l = app1lr.output!
    expect(app1l.pluginVersions.length).toBe(1)

    const instance1 = await steamship.usePlugin(app1.handle!)
    const instance2 = await steamship.usePlugin(app1.handle!)

    expect(instance1.id).not.toBeUndefined()
    expect(instance2.id).not.toBeUndefined()
    expect(instance1.id)k.toBe(instance2.id)
  }, 45000);
})
