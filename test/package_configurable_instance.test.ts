// @ts-ignore
import {steamshipClient} from './helper';
// @ts-ignore
import {deployPackageVersion} from './package_version.test'

describe("ConfigurablePackage", () => {

  test('it should be invocable', async () => {
    const steamship = steamshipClient();
    const configTemplate = {
      "greeting": {"type": "string"},
      "snake_case_config": {"type": "string"},
      "camelCaseConfig": {"type": "string"},
      "defaultConfig": {"type": "string"},
    }

    const [app1, ] = await deployPackageVersion(
      steamship,
      'configurable_hello_world.zip',
      configTemplate
    )
    expect(app1.handle).not.toBeNull()

    const config1 = {
      "greeting": "Hola",
      "snake_case_config": "A",
      "camelCaseConfig": "B",
      "defaultConfig": "C",
    }
    const instance1 = await steamship.use(app1.handle!, undefined, config1)
    let res = (await instance1.invoke("/greet")) as any
    expect(res.data).toBe("Hola, Person")

    const instance2 = await steamship.use(app1.handle!, undefined, config1)
    expect(instance2.id).not.toBe(instance1.id)

    const instance2b = await steamship.use(app1.handle!, instance1.handle, config1, undefined, true)
    expect(instance2b.id).toBe(instance1.id)

    const config3 = {
      "greeting": "Hallo",
      "snake_case_config": "A",
      "camelCaseConfig": "B",
      "defaultConfig": "C",
    }
    const instance3 = await steamship.use(app1.handle!, undefined, config3)
    expect(instance3.id).not.toBe(instance1.id)

    let res2 = (await instance3.invoke("/greet", {name: "Ted"})) as any
    expect(res2.data).toBe("Hallo, Ted")

    let res3 = (await instance3.invoke("/snake")) as any
    expect(res3.data).toBe("A")

    let res4 = (await instance3.invoke("/camel")) as any
    expect(res4.data).toBe("B")

    let res5 = (await instance3.invoke("/defaulted")) as any
    expect(res5.data).toBe("C")

    await instance1.delete()
  }, 25000);
})
