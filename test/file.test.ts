// @ts-ignore
import {steamshipClient} from './helper';
import {File} from '../src/lib/file'
import { TextEncoder } from 'util';

describe("File", () => {
  test('it should be uploadable via content', async () => {
    const client = steamshipClient();

    const files1 = await File.list(client)

    const content = 'A'
    const res = await File.upload(client, {
      content,
      mimeType: "text/markdown"
    })
    expect(res.data).not.toBeUndefined()
    expect(res.data?.id).not.toBeUndefined()
    expect(res.data?.mimeType).toBe("text/markdown")

    const files2 = await File.list(client)

    // Now get the raw file
    const raw = await res.data?.raw()
    expect(raw?.data).toBe(content)

    expect(files1.data?.files).not.toBeUndefined()
    expect(files2.data?.files).not.toBeUndefined()
    expect(files2.data?.files.length).toBeGreaterThan(0)
    expect(files2.data?.files.length).toEqual((files1.data?.files.length || 0) + 1)
  }, 20000);

  test('it should be uploadable via Uint8Array', async () => {
    const client = steamshipClient();

    const content = 'A'

    const textEncoder = new TextEncoder();
    const utf8 = new Uint8Array(content.length);
    textEncoder.encodeInto(content, utf8);
    // const buffer = Buffer.from(utf8);

    const res = await File.upload(client, {
      content: utf8,
      mimeType: "text/markdown"
    })
    expect(res.data).not.toBeUndefined()
    expect(res.data?.id).not.toBeUndefined()
    expect(res.data?.mimeType).toBe("text/markdown")

    // Now get the raw file
    const raw = await res.data?.raw()
    expect(raw?.data).toBe(content)
  }, 20000);


  test('it should be uploadable via Uint8Array with tags', async () => {
    const client = steamshipClient();

    const content = 'A'

    const textEncoder = new TextEncoder();
    const utf8 = new Uint8Array(content.length);
    textEncoder.encodeInto(content, utf8);
    // const buffer = Buffer.from(utf8);

    const res = await File.upload(client, {
      content: utf8,
      mimeType: "text/markdown",
      tags: [
        {kind: "HI"}
      ]
    })
    expect(res.data).not.toBeUndefined()
    expect(res.data?.id).not.toBeUndefined()
    expect(res.data?.mimeType).toBe("text/markdown")
    expect(res.data?.tags).not.toBeUndefined()
    expect(res.data?.tags?.length).toEqual(1)

    // Now get the raw file
    const raw = await res.data?.raw()
    expect(raw?.data).toBe(content)
  }, 20000);

  test('it should be uploadable via content buffer', async () => {
    const client = steamshipClient();
    const content = 'ABC'
    const textEncoder = new TextEncoder();
    const utf8 = new Uint8Array(content.length);
    textEncoder.encodeInto(content, utf8);
    const buffer = Buffer.from(utf8);

    const res = await File.upload(client, {
      content: buffer,
      mimeType: "text/markdown",
    })
    expect(res.data).not.toBeUndefined()
    expect(res.data?.id).not.toBeUndefined()
    expect(res.data?.mimeType).toBe("text/markdown")

    // Now get the raw file
    const raw = await res.data?.raw()
    expect(raw?.data).toBe(content)
  }, 20000);

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
    expect(res.data?.handle).not.toBeUndefined()
    expect(res.data?.handle).not.toBeNull()
    const f2 = await File.get(client, {handle: res.data?.handle})
    expect(f2.data?.id).toEqual(res.data?.id)
  });

})
