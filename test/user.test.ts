// @ts-ignore
import {steamshipClient} from './helper';
import {User} from '../src/lib/user.js'

describe("User", () => {
  test('it should be fetchable', async () => {
    const steamship = steamshipClient();
    const resp = await User.current(steamship)
    expect(resp.output).not.toBeFalsy()
    expect(resp.output?.handle).not.toBeUndefined()
  });

  test('it should be updatable', async () => {
    const steamship = steamshipClient();
    const resp = await User.current(steamship)
    expect(resp.output).not.toBeFalsy()
    expect(resp.output?.handle).not.toBeUndefined()
    const user = resp.output!

    const resp2 = await user.update({handle: 'foo-bar'})
    expect(resp2.output).not.toBeFalsy()
    expect(resp2.output?.handle).not.toBeUndefined()
    const user2 = resp2.output!
    expect(user2.handle).toBe('foo-bar')

    const resp3 = await User.current(steamship)
    expect(resp3.output).not.toBeFalsy()
    expect(resp3.output?.handle).not.toBeUndefined()
    const user3 = resp3.output!
    expect(user3.handle).toBe('foo-bar')
    expect(user3.handleSet).toBe(true)
  });

})
