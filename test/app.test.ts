import {randomName, steamshipClient} from './helper';
import {App} from '../src/lib/app'

describe("App", () => {
  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();

    const app1l_0 = (await App.list(steamship)).data!
    let starting_apps = 0
    if (app1l_0 && app1l_0.apps && app1l_0.apps.length) {
      starting_apps = app1l_0.apps.length
    }

    const app1 = (await App.create(steamship)).data!
    expect(app1.handle).not.toBeUndefined()
    expect(app1.name).not.toBeUndefined()

    let name = randomName();
    const app2 = (await App.create(steamship, {name})).data!
    expect(app2.name).toBe(name)
    expect(app2.id).not.toBe(app1.id)

    // Can get them!
    const app1a = (await App.get(steamship, {id: app1.id})).data!
    expect(app1a.name).toBe(app1.name)
    expect(app1a.id).toBe(app1.id)
    expect(app1a.handle).toBe(app1.handle)

    // Can list them
    const app1l = (await App.list(steamship)).data!
    expect(app1l.apps.length).toBe(starting_apps + 2)

    await app1.delete()
    await app2.delete()

    // They should no longer be there.
    expect(
      App.get(steamship, {id: app1.id})
    ).rejects.toThrow()
  }, 25000);

})
