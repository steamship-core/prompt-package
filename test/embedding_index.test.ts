import { Client } from '../src/lib/client';
import {Plugin, PluginInstance, EmbeddingIndex} from "../src";
import { steamshipClient } from './helper';
import { createEmbedder } from './embedding.test'

export type EmbeddingIndexCallback = (plugin:  Plugin, instance: PluginInstance, index: EmbeddingIndex) => Promise<void>

export async function createEmbeddingIndex(client: Client, callback: EmbeddingIndexCallback): Promise<void> {
  await createEmbedder(client, async (plugin, instance) => {
    const index = (await EmbeddingIndex.create(client, {pluginInstance: (instance as PluginInstance).handle as string})).data
    expect(index).not.toBeNull()
    expect(index).not.toBeUndefined()

    await callback(plugin as Plugin, instance as PluginInstance, index as EmbeddingIndex)

    // Now delete it!
    const res1 = await (index as EmbeddingIndex).delete()
    expect(res1.data).not.toBeNull()
    expect(res1.data).not.toBeUndefined()
  })
}

const possibilities = ["sweet cake", "chocolate flour", "apple and cheese"]
const queryAnswer = {"sweet cream": "sweet cake", "flour and egg": "chocolate flour", "apple and cracker": "apple and cheese"}

test('Test Create and Delete Embedding Index', async () => {
  const client = steamshipClient();
  await createEmbeddingIndex(client, async (_1, _2, index) => {
    await index.insert({value: possibilities[0]})
    let res = await index.search({query: "sweet cream"})
    expect(res.data).not.toBeFalsy()
    expect(res.data!.items).not.toBeFalsy() // We haven't embedded it yet!
    expect(res.data!.items.length).toBe(0) // We haven't embedded it yet!

    const task = await index.embed()
    await task.wait()

    let res2 = await index.search({query: "sweet cream"})
    expect(res2.data).not.toBeFalsy()
    expect(res2.data!.items).not.toBeFalsy() // We haven't embedded it yet!
    expect(res2.data!.items.length).toBe(1) // We haven't embedded it yet!
    expect(res2.data!.items[0].value?.value).toBe(queryAnswer["sweet cream"]) // sweet cake
  })
});



