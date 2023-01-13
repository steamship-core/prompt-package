// @ts-ignore
import {steamshipClient} from './helper';
import {KeyValueStore} from '../src/lib/key_value_store.js'

describe("KeyValueStore", () => {

  test('it should work', async () => {
    const client = steamshipClient();
    const kv = new KeyValueStore(client)

    await kv.reset();
    expect(await kv.get("FOO")).toBeUndefined()

    const key1 = "FOO"
    const key2 = "BAR"

    const value1 = {a: 3}
    const value2 = {hi: "there", b: 5}
    const value3 = {j: 9}

    await kv.set(key1, value1)
    expect(await kv.get(key1)).toMatchObject(value1)
    expect(await kv.get(key1)).toMatchObject(value1)

    await kv.set(key2, value2)
    expect(await kv.get(key2)).toMatchObject(value2)
    expect(await kv.get(key1)).not.toBe(value1)

    // list
    let items = await kv.items()
    expect(items.length).toBe(2)

    // List just val1
    let items2 = await kv.items([key1])
    expect(items2.length).toBe(1)

    // Overwrite
    await kv.set(key2, value3)
    expect(await kv.get(key2)).toMatchObject(value3)
    expect(await kv.get(key2)).not.toMatchObject(value1)
    expect(await kv.get(key2)).not.toMatchObject(value2)

    await kv.delete(key1)
    expect((await kv.items()).length).toBe(1)
    expect(await kv.get(key1)).toBeUndefined()
    expect(await kv.get(key2)).not.toBeUndefined()
  }, 30000);
})
