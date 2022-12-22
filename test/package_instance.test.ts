// @ts-ignore
import {randomName, steamshipClient} from './helper';
import {PackageInstance} from '../src/lib/package_instance'
import {Package} from '../src/lib/package'
import {User} from '../src/lib/user'
// @ts-ignore
import {
  deployPackageVersion,
  helloWorld as _helloWorld
// @ts-ignore
} from './package_version.test'


describe("Package Instance", () => {
  test('it should be be usable via Steamship.use', async () => {
    jest.setTimeout(55000);
    const steamship = steamshipClient(randomName());
    const configTemplate = {}

    const [app1, version1] = await deployPackageVersion(
      steamship,
      'demo-package.zip',
      configTemplate
    )
    expect(app1.handle).not.toBeNull()
    expect(version1.handle).not.toBeNull()

    expect(app1.description).toBeUndefined();
    expect(app1.readme).toBeUndefined();
    expect(app1.profile).toBeUndefined();

    const desc = randomName();
    const readme = randomName();
    const profile = {
      handle: app1.handle,
      version: "1.0",
      type: "package",
      public: true,
      description: desc
    }

    app1.description = desc;
    app1.readme = readme;
    app1.profile = profile;
    await app1.update();

    const app2 = (await Package.get(steamship, {id: app1.id})).data
    expect(app2).not.toBeUndefined()
    expect(app2!.description).toBe(desc)
    expect(app2!.readme).toBe(readme)
    expect(app2!.profile?.description).toBe(profile.description)
    expect(app2!.profile?.handle).toBe(profile.handle)
    expect(app2!.profile?.type).toBe(profile.type)
    expect(app2!.profile?.public).toBe(profile.public)
    expect(app2!.profile?.version).toBe(profile.version)

    // Note: it's important that we use steamship.use here instead of Steamship.usee
    // in order to stay within the testing configuration.
    const instance1 = await steamship.use(app1.handle!)
    const user = (await User.current(steamship)).data!

    expect(instance1.handle).not.toBeUndefined()
    expect(instance1.packageVersionId).toBe(version1.id)
    expect(instance1.packageId).toBe(app1.id)
    expect(instance1.userId).toBe(app1.userId)
    expect(instance1.userHandle).toBe(user.handle)
    expect(instance1.id).not.toBeUndefined()
    expect(instance1.workspaceId).not.toBeUndefined()
    expect((await instance1.client.config).workspaceId).toBe(instance1.workspaceId)
    // expect((await instance1.client.config).workspaceHandle).toBe(app1.handle!)

    // It's the same one!
    const instance1a = await steamship.use(app1.handle!)
    expect((await instance1a.client.config).workspaceId).toBe(instance1.workspaceId)
    // expect((await instance1a.client.config).workspaceHandle).toBe(app1.handle!)

    // const handle2 = randomName()
    // const instance2 = await Steamship.use(app1.handle!, handle2)
    // const instance2a = await Steamship.use(app1.handle!, handle2)
    // expect((await instance2.client.config).workspaceHandle).toBe(handle2)
    // expect((await instance2a.client.config).workspaceHandle).toBe(handle2)

    const steamship2 = steamshipClient(randomName()); // Another workspace!
    let pl1 = await PackageInstance.list(steamship2, {acrossWorkspaces: true, includeWorkspace: true})
    expect(pl1.data?.packageInstances.length).toBe(1)
    for (const p of pl1.data!.packageInstances) {
      expect(p.workspaceHandle).not.toBeUndefined()
    }

  }, 55000);

  test('it should be creatable, gettable, usable, and deletable', async () => {
    jest.setTimeout(55000);
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
