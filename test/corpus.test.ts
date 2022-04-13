import {randomName, steamshipClient} from './helper';
import {Corpus} from '../src/lib/corpus'

describe("Corpus", () => {
  test('it should have a default corpus', async () => {
    const steamship = steamshipClient();
    const resp = await Corpus.get(steamship)
    expect(resp.data).not.toBeFalsy()
    expect(resp.data?.handle).toEqual('default')
  });

  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const def = (await Corpus.get(steamship)).data!

    const corpus1 = (await Corpus.create(steamship)).data!
    expect(corpus1.handle).not.toBeUndefined()
    expect(corpus1.name).not.toBeUndefined()
    expect(corpus1.id).not.toBe(def.id)

    let name = randomName();
    const corpus2 = (await Corpus.create(steamship, {name})).data!
    expect(corpus2.name).toBe(name)
    expect(corpus2.id).not.toBe(corpus1.id)

    // Can get them!
    const corpus1a = (await Corpus.get(steamship, {id: corpus1.id})).data!
    expect(corpus1a.name).toBe(corpus1.name)
    expect(corpus1a.id).toBe(corpus1.id)
    expect(corpus1a.handle).toBe(corpus1.handle)

    await corpus1.delete()
    await corpus2.delete()

    // They should no longer be there.
    expect(
      Corpus.get(steamship, {id: corpus1.id})
    ).rejects.toThrow()
  }, 10000);

})
