import { steamshipClient } from './helper';
import { File } from '../src/lib/file'

describe("File", () => {
  test('it should be uploadable via content', async () => {
    const client = steamshipClient();
    const content = 'A'
    const res = await File.upload(client, {
      content,
      mimeType: "text/markdown"
    })
    expect(res.data).not.toBeUndefined()
    expect(res.data?.id).not.toBeUndefined()
    expect(res.data?.mimeType).toBe("text/markdown")

    // Now get the raw file
    const raw = await res.data?.raw()
    expect(raw?.data).toBe(content)
  });

  test('it should be uploadable via filename', async () => {
    const client = steamshipClient();
    const path = await import('path')
    const fs = await import('fs')
    const filename = path.join(process.cwd(), 'testAssets', 'file.mkd')
    const content = fs.readFileSync(filename)
    const res = await File.upload(client, {
      filename,
      mimeType: "text/markdown"
    })
    expect(res.data).not.toBeUndefined()
    expect(res.data?.id).not.toBeUndefined()
    expect(res.data?.mimeType).toBe("text/markdown")

    // Now get the raw file
    const raw = await res.data?.raw()
    expect(raw!.data).toBe(content.toString())
  });

})
