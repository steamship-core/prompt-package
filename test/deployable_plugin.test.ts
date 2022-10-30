// @ts-ignore
import {randomName, steamshipClient} from './helper';
import {Client, Plugin, PluginInstance, PluginVersion} from '../src'
import path from 'path'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function deployInstance(client: Client): Promise<[Plugin, PluginVersion, PluginInstance]> {
  const [plugin1, version1] = await deployVersion(client)
  const instance1r = (await PluginInstance.create(client, {
    pluginId: plugin1.id!,
    pluginVersionId: version1.id!
  }))
  const instance1 = instance1r.data!
  return [plugin1, version1, instance1]
}

export async function deployVersion(client: Client): Promise<[Plugin, PluginVersion]> {
  const req1 = (await Plugin.create(client, {
    type: "tagger",
    handle: randomName(),
    transport: "jsonOverHttp",
    isPublic: false,
    description: "a test tagger",
    upsert: true,
    isTrainable: false
  }))
  const plugin1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', 'plugin_configurable_tagger.zip')

  const version1t = (await PluginVersion.create(client, {
    pluginId: plugin1.id!,
    filename: filename,
    handle: "1.0"
  }))
  await version1t.wait()
  await delay(15000) // TODO: When our task system awaits the Lambda deployment, we can remove this.

  const version1 = version1t.data!
  return [plugin1, version1]
}


describe("Plugin", () => {
  test('a deployed tagger should be executable', async () => {
    const steamship = steamshipClient();

    // Can list them
    const listOf = (await Plugin.list(steamship, {private: true})).data!
    expect(listOf).not.toBeUndefined()
    expect(listOf.plugins).not.toBeUndefined()

    // TODO Test that it fails if these aren't provided
    const fileImporterInstance = (await PluginInstance.create(steamship, {
      pluginHandle: "test-fileImporter-valueOrData"
    })).data!
    expect(fileImporterInstance.handle).not.toBeUndefined()

    const [, , pluginInstance] = await deployInstance(steamship)
    expect(pluginInstance.handle).not.toBeUndefined()

    //TODO: Currently no way to actually do an import!
    await pluginInstance.delete()
  }, 25000)
})
