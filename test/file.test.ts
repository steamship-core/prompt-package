// @ts-ignore
import {steamshipClient} from './helper';
import {File} from '../src/lib/file.js'
import { TextEncoder } from 'util';

describe("File", () => {
  test("it should Javascript text encoding works", async () => {
    const client = steamshipClient();
    const content = "Hi there"
    const resp = await File.upload(client, {content: content})
    // Now get the raw file
    const raw = await (resp as any).output.raw()
    expect(await (raw as any).text()).toBe(content)
  })

  test('it should be uploadable via content', async () => {
    const client = steamshipClient();

    const files1 = await File.list(client)

    const content = 'A'
    const res = await File.upload(client, {
      content,
      mimeType: "text/markdown"
    })
    expect(res.output).not.toBeUndefined()
    expect(res.output?.id).not.toBeUndefined()
    expect(res.output?.mimeType).toBe("text/markdown")

    const files2 = await File.list(client)

    // Now get the raw file
    const raw = await res.output!.raw()
    expect(await raw.text()).toBe(content)

    expect(files1.output?.files).not.toBeUndefined()
    expect(files2.output?.files).not.toBeUndefined()
    expect(files2.output?.files.length).toBeGreaterThan(0)
    expect(files2.output?.files.length).toEqual((files1.output?.files.length || 0) + 1)
  }, 30000);

  test('it should be uploadable via Uint8Array with tags', async () => {
    const client = steamshipClient();

    const content = 'A'

    const textEncoder = new TextEncoder();
    const utf8 = new Uint8Array(content.length);
    textEncoder.encodeInto(content, utf8);
    const buffer = Buffer.from(utf8);

    const res = await File.upload(client, {
      content: buffer,
      mimeType: "text/markdown",
      tags: [
        {kind: "HI"}
      ]
    })
    expect(res.output).not.toBeUndefined()
    expect(res.output?.id).not.toBeUndefined()
    expect(res.output?.mimeType).toBe("text/markdown")
    expect(res.output?.tags).not.toBeUndefined()
    expect(res.output?.tags?.length).toEqual(1)

    // Now get the raw file
    const raw = await res.output!.raw()
    expect(await raw.text()).toBe(content)
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
    expect(res.output).not.toBeUndefined()
    expect(res.output?.id).not.toBeUndefined()
    expect(res.output?.mimeType).toBe("text/markdown")

    // Now get the raw file
    const raw = await res.output!.raw()
    expect(await raw.text()).toBe(content)
  }, 20000);

  test('it should be uploadable via filename', async () => {
    const client = steamshipClient();
    const path = await import('path')
    const fs = await import('fs')
    const filename = path.join(process.cwd(), 'testAssets', 'file.mkd')
    const content = fs.readFileSync(filename)
    const res = await File.upload(client, {
      filename,
      content,
      mimeType: "text/markdown"
    })
    expect(res.output).not.toBeUndefined()
    expect(res.output?.id).not.toBeUndefined()
    expect(res.output?.mimeType).toBe("text/markdown")

    // Now get the raw file
    const raw = await (await res.output!.raw()).text()
    expect(raw).toBe(content.toString())
    expect(res.output?.handle).not.toBeUndefined()
    expect(res.output?.handle).not.toBeNull()
    const f2 = await File.get(client, {handle: res.output?.handle})
    expect(f2.output?.id).toEqual(res.output?.id)
  });

})
