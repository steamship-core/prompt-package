import { steamshipClient } from './helper';
import { App } from '../src/lib/app'
import { AppVersion } from '../src/lib/app_version'
import { AppInstance } from '../src/lib/app_instance'
import { deployAppVersion } from './app_version.test'
import { Client } from '../src/lib/client';

export async function helloWorld(client: Client): Promise<[App, AppVersion, AppInstance]> {
  const [app1, version1] = await deployAppVersion(client, 'configurable_hello_world.zip', { "greeting": { "type": "string" } })
  const instance1r = (await AppInstance.create(client, {
    appId: app1.id!,
    appVersionId: version1.id!,
    config: { "greeting": "Hola" }
  }))
  const instance1 = instance1r.data!
  return [app1, version1, instance1]
}

describe("ConfigurableApp", () => {

  test('it should be invocable', async () => {
    expect(true)
    const steamship = steamshipClient();
    const [app1, version1, instance1] = await helloWorld(steamship)
    let res = (await instance1.post("/greet")) as any
    expect(res.data).toBe("Hola, Person")

    const instance2r = (await AppInstance.create(steamship, {
      appId: app1.id!,
      appVersionId: version1.id!,
      config: { "greeting": "Hallo" }
    }))
    const instance2 = instance2r.data!

    let res2 = (await instance2.post("/greet", { name: "Ted" })) as any
    expect(res2.data).toBe("Hallo, Ted")
    await instance1.delete()
    await version1.delete()
    //Instance2 deleted by version delete cascade
    await app1.delete()
  }, 25000);
})
