// @ts-ignore
import {randomName, steamshipClient} from './helper';
import {Package} from '../src/lib/package.js'
import {SteamshipError} from '../src/lib/steamship_error.js'

describe("Package", () => {
  test('it should throw when one tries to load a bad package', async () => {
    const steamship = steamshipClient();
    await steamship.config;
    expect(
      Package.get(steamship, {id: randomName()})
    ).rejects.toThrow(SteamshipError);
  }, 25000)

  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();

    const app1l_0 = (await Package.list(steamship)).output!
    let starting_apps = 0
    if (app1l_0 && app1l_0.packages && app1l_0.packages.length) {
      starting_apps = app1l_0.packages.length
    }

    const app1 = (await Package.create(steamship)).output!
    expect(app1.handle).not.toBeUndefined()

    const app2 = (await Package.create(steamship, {})).output!
    expect(app2.id).not.toBe(app1.id)

    // Can get them!
    const app1a = (await Package.get(steamship, {id: app1.id})).output!
    expect(app1a.id).toBe(app1.id)
    expect(app1a.handle).toBe(app1.handle)

    // Can list them
    const app1l = (await Package.list(steamship)).output!
    expect(app1l.packages.length).toBe(starting_apps + 2)

    // They should no longer be there.
    expect(
      Package.get(steamship, {id: app1.id})
    ).rejects.toThrow()
  }, 25000);

})
