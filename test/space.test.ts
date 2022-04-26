import { steamshipClient } from './helper';
import { Space } from '../src/lib/space'

describe("Space", () => {
  test('it should have a default space', async () => {
    const steamship = steamshipClient();
    const resp = await Space.get(steamship)
    expect(resp.data).not.toBeFalsy()
    expect(resp.data?.handle).toEqual('default')
  }, 10000);

  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const def = (await Space.get(steamship)).data!

    const space1l = (await Space.list(steamship)).data!
    const starting_spaces = space1l.spaces.length

    const space1 = (await Space.create(steamship)).data!
    expect(space1.handle).not.toBeUndefined()
    expect(space1.id).not.toBe(def.id)

    const space2 = (await Space.create(steamship, {})).data!
    expect(space2.id).not.toBe(space1.id)

    // Can get them!
    const space1a = (await Space.get(steamship, { id: space1.id })).data!
    expect(space1a.id).toBe(space1.id)
    expect(space1a.handle).toBe(space1.handle)

    // Can list them
    const space2l = (await Space.list(steamship)).data!
    expect(space2l.spaces.length).toBe(starting_spaces + 2)

    await space1.delete()
    await space2.delete()


    // They should no longer be there.
    expect(
      Space.get(steamship, { id: space1.id })
    ).rejects.toThrow()
  }, 10000);

})
