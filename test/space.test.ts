import { steamshipClient, randomName } from './helper';
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

    const space1 = (await Space.create(steamship)).data!
    expect(space1.handle).not.toBeUndefined()
    expect(space1.name).not.toBeUndefined()
    expect(space1.id).not.toBe(def.id)

    let name = randomName();
    const space2 = (await Space.create(steamship, {name})).data!
    expect(space2.name).toBe(name)
    expect(space2.id).not.toBe(space1.id)

    // Can get them!
    const space1a = (await Space.get(steamship, {id: space1.id})).data!
    expect(space1a.name).toBe(space1.name)
    expect(space1a.id).toBe(space1.id)
    expect(space1a.handle).toBe(space1.handle)

    await space1.delete()
    await space2.delete()

    // They should no longer be there.
    expect(
      Space.get(steamship, {id: space1.id})
    ).rejects.toThrow()
  }, 10000);

})
