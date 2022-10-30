// @ts-ignore
import {steamshipClient} from './helper';
import {Package} from '../src/lib/package'

describe("Package", () => {
  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();

    const app1l_0 = (await Package.list(steamship)).data!
    let starting_apps = 0
    if (app1l_0 && app1l_0.packages && app1l_0.packages.length) {
      starting_apps = app1l_0.packages.length
    }

    const app1 = (await Package.create(steamship)).data!
    expect(app1.handle).not.toBeUndefined()

    const app2 = (await Package.create(steamship, {})).data!
    expect(app2.id).not.toBe(app1.id)

    // Can get them!
    const app1a = (await Package.get(steamship, {id: app1.id})).data!
    expect(app1a.id).toBe(app1.id)
    expect(app1a.handle).toBe(app1.handle)

    // Can list them
    const app1l = (await Package.list(steamship)).data!
    expect(app1l.packages.length).toBe(starting_apps + 2)

    // They should no longer be there.
    expect(
      Package.get(steamship, {id: app1.id})
    ).rejects.toThrow()
  }, 25000);

})
