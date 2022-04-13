import {steamshipClient} from './helper';
import {User} from '../src/lib/user'

describe("User", () => {
  test('it should be fetchable', async () => {
    const steamship = steamshipClient();
    const resp = await User.current(steamship)
    expect(resp.data).not.toBeFalsy()
    expect(resp.data?.handle).not.toBeUndefined()
  });

  test('it should be updatable', async () => {
    const steamship = steamshipClient();
    const resp = await User.current(steamship)
    expect(resp.data).not.toBeFalsy()
    expect(resp.data?.handle).not.toBeUndefined()
    const user = resp.data!

    const resp2 = await user.update({handle: 'foo bar'})
    expect(resp2.data).not.toBeFalsy()
    expect(resp2.data?.handle).not.toBeUndefined()
    const user2 = resp2.data!
    expect(user2.handle).toBe('foo-bar')

    const resp3 = await User.current(steamship)
    expect(resp3.data).not.toBeFalsy()
    expect(resp3.data?.handle).not.toBeUndefined()
    const user3 = resp3.data!
    expect(user3.handle).toBe('foo-bar')
    expect(user3.handleSet).toBe(true)
  });

})
