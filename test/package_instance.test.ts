// @ts-ignore
import {randomName, steamshipClient} from './helper';
import {PackageInstance} from '../src/lib/package_instance'
import {User} from '../src/lib/user'
// @ts-ignore
import {
  deployPackageVersion,
  helloWorld as _helloWorld
} from './package_version.test'
import {Steamship} from "../src/lib/steamship";


describe("Package Instance", () => {
  test('it should be be usable via Steamship.use', async () => {
    const steamship = steamshipClient();
    const configTemplate = {}

    const [app1, version1] = await deployPackageVersion(
      steamship,
      'demo-package.zip',
      configTemplate
    )
    expect(app1.handle).not.toBeNull()

    const instance1 = await Steamship.use(app1.handle!)
    const user = (await User.current(steamship)).data!

    expect(instance1.handle).not.toBeUndefined()
    expect(instance1.packageVersionId).toBe(version1.id)
    expect(instance1.packageId).toBe(app1.id)
    expect(instance1.userId).toBe(app1.userId)
    expect(instance1.userHandle).toBe(user.handle)
    expect(instance1.id).not.toBeUndefined()
    expect(instance1.workspaceId).not.toBeUndefined()
    expect((await instance1.client.config).workspaceId).toBe(instance1.workspaceId)
    expect((await instance1.client.config).workspaceHandle).toBe(app1.handle!)

    // It's the same one!
    const instance1a = await Steamship.use(app1.handle!)
    expect((await instance1a.client.config).workspaceId).toBe(instance1.workspaceId)
    expect((await instance1a.client.config).workspaceHandle).toBe(app1.handle!)

    const handle2 = randomName()
    const instance2 = await Steamship.use(app1.handle!, handle2)
    const instance2a = await Steamship.use(app1.handle!, handle2)
    expect((await instance2.client.config).workspaceHandle).toBe(handle2)
    expect((await instance2a.client.config).workspaceHandle).toBe(handle2)

  }, 55000);

  test('it should be creatable, gettable, usable, and deletable', async () => {
    const steamship = steamshipClient();
    const configTemplate = {}

    const [app1, version1] = await deployPackageVersion(
      steamship,
      'demo-package.zip',
      configTemplate
    )
    expect(app1.handle).not.toBeNull()

    const instance1 = await steamship.use(app1.handle!)
    const user = (await User.current(steamship)).data!

    expect(instance1.handle).not.toBeUndefined()
    expect(instance1.packageVersionId).toBe(version1.id)
    expect(instance1.packageId).toBe(app1.id)
    expect(instance1.userId).toBe(app1.userId)
    expect(instance1.userHandle).toBe(user.handle)
    expect(instance1.id).not.toBeUndefined()

    // Can get them!
    const instance1a = (await PackageInstance.get(steamship, {id: instance1.id})).data!
    expect(instance1a.id).toBe(instance1.id)
    expect(instance1a.handle).toBe(instance1.handle)

    // Can list them
    const app1lr = await PackageInstance.list(steamship, {packageId: app1.id!})
    const app1l = app1lr.data!
    expect(app1l.packageInstances.length).toBe(1)

    await instance1.delete()
  }, 35000);
})
