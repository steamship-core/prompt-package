import {Client} from '../src/lib/client';
import {Plugin, PluginInstance} from "../src";
import {steamshipClient} from './helper';

export type EmbedderCallback = (plugin: Plugin, instance: PluginInstance) => Promise<void>

export async function createEmbedder(client: Client, callback: EmbedderCallback): Promise<void> {
  const plugin = (await Plugin.get(client, {handle: "test-embedder"})).data
  expect(plugin).not.toBeNull()
  expect(plugin).not.toBeUndefined()

  const instance = (await PluginInstance.create(client, {pluginId: (plugin as Plugin).id})).data
  expect(instance).not.toBeNull()
  expect(instance).not.toBeUndefined()

  await callback(plugin as Plugin, instance as PluginInstance)

  // Now delete it!
  const res = await (instance as PluginInstance).delete()
  expect(res.data).not.toBeNull()
  expect(res.data).not.toBeUndefined()
}

test('Test Create and Delete Embedder', async () => {
  const client = steamshipClient();
  await createEmbedder(client, async () => {
  })
});

