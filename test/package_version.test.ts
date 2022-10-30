import {randomName, steamshipClient} from './helper';
import {Package} from '../src/lib/package'
import {PackageVersion} from '../src/lib/package_version'
import path from 'path'
import {Steamship} from '../src/lib/steamship';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function helloWorld(client: Steamship): Promise<[Package, PackageVersion]> {
  return deployPackageVersion(client, 'demo-package.zip')
}

export async function deployPackageVersion(client: Steamship, packageZip: string, configTemplate: Record<string, any> = {}): Promise<[Package, PackageVersion]> {
  const req1 = (await Package.create(client, {handle: randomName()}))
  const app1 = req1.data!

  const filename = path.join(process.cwd(), 'testAssets', packageZip)

  const version1t = (await PackageVersion.create(client, {
    packageId: app1.id!,
    filename: filename,
    configTemplate: configTemplate,
  }))
  await version1t.wait()
  await delay(15000) // TODO: When our task system awaits the Lambda deployment, we can remove this.

  const version1 = version1t.data!
  return [app1, version1]
}

describe("Package Version", () => {
  test('it should be creatable and deletable', async () => {
    const steamship = steamshipClient();
    const [app1, version1] = await helloWorld(steamship)

    expect(app1.id).not.toBeUndefined()
    expect(version1.handle).not.toBeUndefined()

    // Can get them!
    const version1a = (await PackageVersion.get(steamship, {id: version1.id})).data!
    expect(version1a.id).toBe(version1.id)
    expect(version1a.handle).toBe(version1.handle)

    // Can list them
    const app1lr = await PackageVersion.list(steamship, {packageId: app1.id!})
    const app1l = app1lr.data!
    expect(app1l.packageVersions.length).toBe(1)

  }, 25000);
})
