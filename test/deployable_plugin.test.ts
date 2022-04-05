import { steamshipClient } from './helper';
import { Plugin } from '../src/lib/plugin'
import { PluginVersion } from '../src/lib/plugin_version'
import { PluginInstance } from '../src/lib/plugin_instance'
import { Client } from '../src/lib/client';
import { Corpus } from '../src/lib/corpus'
import path from 'path'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function deployInstance(client: Client): Promise<[Plugin, PluginVersion, PluginInstance]> {
  const [plugin1, version1] = await deployVersion(client)
  const instance1r = (await PluginInstance.create(client, { pluginId: plugin1.id!, pluginVersionId: version1.id! }))
  const instance1 = instance1r.data!
  return [plugin1, version1, instance1]
}

export async function deployVersion(client: Client): Promise<[Plugin, PluginVersion]> {
  const req1 = (await Plugin.create(client, {
    type: "corpusImporter",
    name: "tsClientTestCorpusImporter",
    transport: "jsonOverHttp",
    isPublic: false,
    description: "a test corpus importer",
    upsert: true
  }))
  const plugin1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', 'plugin_corpus_importer.zip')

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
  test('a deployed corpus_importer should be executable', async () => {
    const steamship = steamshipClient();

    // Can list them
    const listOf = (await Plugin.list(steamship, { private: true })).data!
    expect(listOf).not.toBeUndefined()
    expect(listOf.plugins).not.toBeUndefined()

    // TODO Test that it fails if these aren't provided
    const fileImporterInstance = (await PluginInstance.create(steamship, {
      pluginHandle: "test-fileImporter-valueOrData"
    })).data!
    expect(fileImporterInstance.handle).not.toBeUndefined()

    const [plugin, pluginVersion, pluginInstance] = await deployInstance(steamship)
    expect(pluginInstance.handle).not.toBeUndefined()

    const corpus = (await Corpus.create(steamship)).data!
    expect(corpus.handle).not.toBeUndefined()

    //TODO: Currently no way to actually do an import!

    await pluginInstance.delete()
    await pluginVersion.delete()
    await plugin.delete()

    // They should no longer be there.
    expect(
      Plugin.get(steamship, { id: plugin.id })
    ).rejects.toThrow()
  }, 25000);

})
