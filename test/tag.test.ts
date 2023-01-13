import {Tag} from "../src/lib/tag.js";

// @ts-ignore
import {randomName, steamshipClient} from './helper';
import {File} from '../src/lib/file.js'

describe("Tag", () => {


  test('it should be uploadable via content', async () => {
    const client = steamshipClient(randomName());

    const files1 = await File.list(client)

    const files1a = await File.query(client, `blocktag and kind "BlockTag"`)
    expect(files1a.output?.files.length).toBe(0)

    const files1b = await File.query(client, `filetag and kind "FileTag"`)
    expect(files1b.output?.files?.length).toBe(0)

    const content = 'A'
    const res = await File.upload(client, {
      content,
      mimeType: "text/markdown",
      tags: [{kind: "FileTag"}],
    })
    expect(res.output).not.toBeUndefined()
    expect(res.output?.id).not.toBeUndefined()
    expect(res.output?.mimeType).toBe("text/markdown")

    const files2 = await File.list(client)

    // Now get the raw file
    const raw = await res.output?.raw()
    expect(raw).toBe(content)

    expect(files1.output?.files).not.toBeUndefined()
    expect(files2.output?.files).not.toBeUndefined()
    expect(files2.output?.files.length).toBeGreaterThan(0)
    expect(files2.output?.files.length).toEqual((files1.output?.files.length || 0) + 1)

    // Now query the file
    const files3 = await File.query(client, `blocktag and kind "BlockTag"`)
    expect(files3.output?.files.length).toBe(0)

    const files4 = await File.query(client, `filetag and kind "FileTag"`)
    expect(files4.output?.files?.length).toBe(1)
    const file4 = files4.output!.files[0]
    expect(file4.tags!.length).toBe(1)

    // Now add a tag.
    const t = await Tag.create(client, {
      fileId: files2!.output!.files[0].id,
      kind: 'FileTag',
      name: 'testName',
      value: {
        key: 'value',
        number: 42
      }
    })
    expect(t.output).not.toBeUndefined()
    expect(t.output?.id).not.toBeUndefined()
    expect(t.output?.fileId).not.toBeUndefined()
    expect(t.output?.fileId).toEqual(files2!.output!.files[0].id)
    expect(t.output?.blockId).toBeUndefined()

    const files5 = await File.query(client, `filetag and kind "FileTag"`)
    expect(files5.output?.files?.length).toBe(1)
    const file5 = files5.output!.files[0]

    expect(file5.tags!.length).toBe(2)
    const testTag = file5.tags!.find((t) => {return t.name == "testName"})
    expect(testTag).not.toBeUndefined()
    expect(testTag?.value).not.toBeUndefined()
    expect(testTag?.value.key).toEqual("value")
    expect(testTag?.value.number).toEqual(42)
  }, 30000);

})
