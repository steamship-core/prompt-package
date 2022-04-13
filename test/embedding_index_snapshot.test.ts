import { steamshipClient } from './helper';
import {createEmbeddingIndex} from "./embedding_index.test";

const possibilities = ["sweet cake", "chocolate flour", "apple and cheese"]
const queryAnswer = {"sweet cream": "sweet cake", "flour and egg": "chocolate flour", "apple and cracker": "apple and cheese"}

test('Test Embedding Index Snapshot', async () => {
  const client = steamshipClient();
  await createEmbeddingIndex(client, async (_1, _2, index) => {
    await index.insert({value: possibilities[0], reindex: true})
    let res2 = await index.search({query: "sweet cream"})
    expect(res2.data).not.toBeFalsy()
    expect(res2.data!.items).not.toBeFalsy() // We haven't embedded it yet!
    expect(res2.data!.items.length).toBe(1) // We haven't embedded it yet!
    expect(res2.data!.items[0].value?.value).toBe(queryAnswer["sweet cream"]) // sweet cake
    expect(res2.data!.items[0].value?.indexSource).toBe("index") // From the raw index

    // Now let's create a snapshot
    // TODO the whole (await (await client.taskMakingCall()).wait()) is awkward..
    let task = await index.createSnapshot()
    await task.wait()

    let res3 = await index.search({query: "sweet cream"})
    expect(res3.data).not.toBeFalsy()
    expect(res3.data!.items).not.toBeFalsy() // We haven't embedded it yet!
    expect(res3.data!.items.length).toBe(1) // We haven't embedded it yet!
    expect(res3.data!.items[0].value?.value).toBe(queryAnswer["sweet cream"]) // sweet cake
    expect(res3.data!.items[0].value?.indexSource).toBe("snapshot") // Now from the snapshot!
  })
});



