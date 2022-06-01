import {steamshipClient} from './helper';
import {Plugin} from '../src/lib/plugin'
import {PluginVersion} from '../src/lib/plugin_version'
import {PluginInstance} from '../src/lib/plugin_instance'
import {Client} from '../src/lib/client';
import path from 'path'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function deployInstance(client: Client): Promise<[Plugin, PluginVersion, PluginInstance]> {
  const [plugin1, version1] = await deployVersion(client)
  const instance1r = (await PluginInstance.create(client, {
    pluginId: plugin1.id!, pluginVersionId: version1.id!, config: {
      "tagKind": "testTagKind",
      "tagName": "testTagName",
      "numberValue": 3,
      "booleanValue": true
    }
  }))
  const instance1 = instance1r.data!
  return [plugin1, version1, instance1]
}

export async function deployVersion(client: Client): Promise<[Plugin, PluginVersion]> {
  const req1 = (await Plugin.create(client, {
    type: "tagger",
    transport: "jsonOverHttp",
    isPublic: false,
    description: "a test configurable tagger",
    upsert: true,
    isTrainable: false
  }))
  const plugin1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', 'plugin_configurable_tagger.zip')

  const version1t = (await PluginVersion.create(client, {
    pluginId: plugin1.id!,
    filename: filename,
    handle: "1.0",
    configTemplate: {
      "tagKind": {"type": "string"},
      "tagName": {"type": "string"},
      "numberValue": {"type": "number"},
      "booleanValue": {"type": "boolean"}
    }
  }))
  await version1t.wait()
  await delay(15000) // TODO: When our task system awaits the Lambda deployment, we can remove this.

  const version1 = version1t.data!
  return [plugin1, version1]
}


describe("Plugin", () => {
  test('a configurable tagger should respect its configuration', async () => {
    const steamship = steamshipClient();

    const [plugin, pluginVersion, pluginInstance] = await deployInstance(steamship)
    expect(pluginInstance.handle).not.toBeUndefined()

    const tagResponse = (await steamship.tag("Test", pluginInstance.handle!))
    await tagResponse.wait()
    expect(tagResponse.data?.file).not.toBeUndefined()
    //TODO: check tag response. Looks right in debug but no Tag object to parse response into.


    //Invoke tag again, and test based on different configuration!
    const instance2r = (await PluginInstance.create(steamship, {
      pluginId: plugin.id!, pluginVersionId: pluginVersion.id!, config: {
        "tagKind": "testTagKind2",
        "tagName": "testTagName2",
        "numberValue": 4,
        "booleanValue": false
      }
    }))
    const instance2 = instance2r.data!
    const tagResponse2 = (await steamship.tag("Test", instance2.handle!))
    await tagResponse2.wait()
    expect(tagResponse2.data?.file).not.toBeUndefined()
    //TODO: check tag response. Looks right in debug but no Tag object to parse response into.


    await instance2.delete()
    await pluginInstance.delete()
    await pluginVersion.delete()
    await plugin.delete()

    // They should no longer be there.
    expect(
      Plugin.get(steamship, {id: plugin.id})
    ).rejects.toThrow()
  }, 25000);

})
