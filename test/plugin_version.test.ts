import {randomName, steamshipClient} from './helper';
import {Plugin} from '../src/lib/plugin'
import {PluginVersion} from '../src/lib/plugin_version'
import path from 'path'
import {Client} from '../src/lib/client';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function csvBlockifier(client: Client): Promise<[Plugin, PluginVersion]> {
  return deployPluginVersion(client, 'csv-blockifier.zip')
}

export async function deployPluginVersion(client: Client, packageZip: string, configTemplate: Record<string, any> = {}): Promise<[Plugin, PluginVersion]> {
  const req1 = (await Plugin.create(client, {
    handle: randomName(),
    type: 'blockifier',
    transport: 'jsonOverHttp',
    isPublic: false,
    description: ''
  }))
  const app1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', packageZip)

  const version1t = (await PluginVersion.create(client, {
    pluginId: app1.id!,
    filename: filename,
    configTemplate: configTemplate,
  }))
  await version1t.wait()
  await delay(15000) // TODO: When our task system awaits the Lambda deployment, we can remove this.

  const version1 = version1t.data!
  return [app1, version1]
}

describe("Plugin Version", () => {
  test('it should be creatable and listable', async () => {
    const steamship = steamshipClient();
    const [app1, version1] = await csvBlockifier(steamship)

    expect(app1.id).not.toBeUndefined()
    expect(version1.handle).not.toBeUndefined()

    // Can get them!
    const version1a = (await PluginVersion.get(steamship, {id: version1.id})).data!
    expect(version1a.id).toBe(version1.id)
    expect(version1a.handle).toBe(version1.handle)

    // Can list them
    const app1lr = await PluginVersion.list(steamship, {pluginId: app1.id!})
    const app1l = app1lr.data!
    expect(app1l.pluginVersions.length).toBe(1)

  }, 25000);
})
