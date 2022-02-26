import { steamshipClient } from './helper';
import { App } from '../src/lib/app'
import { AppVersion } from '../src/lib/app_version'
import { AppInstance } from '../src/lib/app_instance'
import { User } from '../src/lib/user'
import { helloWorld as _helloWorld } from './app_version.test'
import { Client } from '../src/lib/client';

export async function helloWorld(client: Client): Promise<[App, AppVersion, AppInstance]> {
  const [app1, version1] = await _helloWorld(client)
  const instance1r = (await AppInstance.create(client, {appId: app1.id!, appVersionId: version1.id!}))
  const instance1 = instance1r.data!
  return [app1, version1, instance1]
}

describe("App Instance", () => {
  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const [app1, version1, instance1] = await helloWorld(steamship)
    const user = (await User.current(steamship)).data!
    expect(instance1.handle).not.toBeUndefined()
    expect(instance1.name).not.toBeUndefined()
    expect(instance1.appVersionId).toBe(version1.id)
    expect(instance1.appId).toBe(app1.id)
    expect(instance1.userId).toBe(app1.userId)
    expect(instance1.userHandle).toBe(user.handle)
    expect(instance1.id).not.toBeUndefined()

    // Can get them!
    const instance1a = (await AppInstance.get(steamship, {id: instance1.id})).data!
    expect(instance1a.name).toBe(instance1.name)
    expect(instance1a.id).toBe(instance1.id)
    expect(instance1a.handle).toBe(instance1.handle)

    // Can list them
    const app1lr = await AppInstance.list(steamship, {appId: app1.id!})
    const app1l = app1lr.data!
    expect(app1l.appInstances.length).toBe(1)

    await instance1.delete()
    await version1.delete()
    await app1.delete()
  },25000);

  test('it should be invocable', async () => {
    const steamship = steamshipClient();
    const [app1, version1, instance1] = await helloWorld(steamship)
    let url = await instance1.invocationUrl("/hello", app1.handle!)
    let res = (await instance1.get("/greet")) as any
    expect(res.data).toBe("Hello, Person!")
    let res2 = (await instance1.get("/greet", {name: "Ted"})) as any
    expect(res2.data).toBe("Hello, Ted!")
    await instance1.delete()
    await version1.delete()
    await app1.delete()
  }, 25000);
})
