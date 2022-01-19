import { nludb_client, random_name } from './helper';
import { App } from '../src/lib/app'

describe("App", () => {
  test('it should be creatable and deletable', async () => {
    const nludb = nludb_client();    
    
    const app1 = (await App.create(nludb)).data!
    expect(app1.handle).not.toBeUndefined()
    expect(app1.name).not.toBeUndefined()
     
    let name = random_name();
    const app2 = (await App.create(nludb, {name})).data!
    expect(app2.name).toBe(name)
    expect(app2.id).not.toBe(app1.id)

    // Can get them!
    const app1a = (await App.get(nludb, {id: app1.id})).data!
    expect(app1a.name).toBe(app1.name)
    expect(app1a.id).toBe(app1.id)
    expect(app1a.handle).toBe(app1.handle)

    await app1.delete()
    await app2.delete()

    // They should no longer be there.
    expect(
      App.get(nludb, {id: app1.id})
    ).rejects.toThrow()
  }); 

})
 