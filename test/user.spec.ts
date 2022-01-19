import { nludb_client } from './helper';
import { User } from '../src/lib/user'

describe("User", () => {
  test('it should be fetchable', async () => {
    const nludb = nludb_client();    
    const resp = await User.current(nludb)
    expect(resp.data).not.toBeFalsy()
    expect(resp.data?.handle).not.toBeUndefined()
  });
})