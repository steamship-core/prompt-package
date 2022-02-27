import { steamshipClient, randomName } from './helper';
import { Plugin } from '../src/lib/plugin'

describe("Plugin", () => {
  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();

    // Can list them
    const listOf = (await Plugin.list(steamship, {private: true})).data!
    expect(listOf).not.toBeUndefined()
    expect(listOf.plugins).not.toBeUndefined()
    const startSize = listOf.plugins!.length

    // TODO Test that it fails if these aren't provided
    const plugin1 = (await Plugin.create(steamship, {
      name: randomName(),
      type: "embedder",
      url: "",
      transport: "jsonOverHttp",
      isPublic: false,
      description: "test"
    })).data!
    expect(plugin1.handle).not.toBeUndefined()
    expect(plugin1.name).not.toBeUndefined()

    // Can list them
    const listOf2 = (await Plugin.list(steamship, {private: true})).data!
    expect(listOf2.plugins).not.toBeUndefined()
    expect(listOf2.plugins?.length).toBe(1 + startSize)
    expect((listOf2.plugins![listOf2.plugins!.length - 1] as Plugin).handle).toBe(plugin1.handle)

    await plugin1.delete()

    // They should no longer be there.
    expect(
      Plugin.get(steamship, {id: plugin1.id})
    ).rejects.toThrow()
  }, 10000);

})
