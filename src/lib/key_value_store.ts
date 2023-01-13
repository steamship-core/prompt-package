// A simple key-value store implemented atop Files and Tags.

import { File } from './file.js';
import { IApiBase } from './shared/BaseInterfaces.js';
import { SteamshipError } from './steamship_error.js';
import { Tag } from './tag.js';
import { Task } from './task.js';

const KV_STORE_MARKER = '__init__';

export type DICT = { [key: string]: string | boolean | number | DICT };

export class KeyValueStore {
  /* A simple key value store implemented in Steamship.

      Instances of the KeyValueStore are identified by its  `namespace`.
        This store_identifier corresponds to a File that will be created with a special tag identifying it.

        Entries of the KeyValueStore are saved as `Tag` objects with:
      * Kind = "KeyValueStore"
      * Name = the key of the (kv) pair
      * Value = a dict set to the value

      Note that the value is always saved as a dict object. To save a string or int, wrap it in a dict.

        WARNING:

      This is essentially a clever hack atop Steamship's tag system to provide mutable key-value storage. It is in the
      steamship.utils package because it's proven useful once or twice. But in general, if you find yourself heavily
      relying upon it, consider reaching out to us at hello@steamship.com to let us know, and we'll up-prioritize
      adding a proper key-value API.
      */

  client: IApiBase;
  storeIdentifier: string;

  public constructor(client: IApiBase, storeIdentifier = 'KeyValueStore') {
    this.client = client;
    this.storeIdentifier = `kv-store-${storeIdentifier}`;
  }

  public async _getFile(orCreate = false): Promise<File | undefined> {
    const statusFilesP = await File.query(
      this.client,
      `filetag and kind "${this.storeIdentifier}"`
    );

    if (
      statusFilesP &&
      statusFilesP.output &&
      statusFilesP.output.files &&
      statusFilesP.output.files.length > 0
    ) {
      return statusFilesP.output.files[0];
    }

    if (!orCreate) {
      return undefined;
    }
    const createP = await File.create(this.client, {
      content: 'foo',
      tags: [{ kind: this.storeIdentifier, name: KV_STORE_MARKER }],
    });
    return createP.output;
  }

  public async get(key: string): Promise<DICT | undefined> {
    const file = await this._getFile();
    if (!file) {
      return undefined;
    }

    if (!file.tags) {
      return undefined;
    }

    for (const tag of file.tags) {
      if (tag.kind == this.storeIdentifier && tag.name == key) {
        console.log('got tag', tag);
        return tag.value;
      }
    }

    return undefined;
  }

  public async delete(key: string): Promise<boolean> {
    const file = await this._getFile();
    if (!file) {
      return false;
    }

    if (!file.tags) {
      return false;
    }

    for (const tag of file.tags) {
      if (tag.kind == this.storeIdentifier && tag.name == key) {
        await tag.delete();
        return true;
      }
    }

    return false;
  }

  public async set(key: string, value: DICT): Promise<Task<Tag>> {
    await this.delete(key);
    const file = await this._getFile(true);
    if (!file) {
      throw new SteamshipError({
        statusMessage: 'Unable to create file for tag.',
      });
    }

    return Tag.create(this.client, {
      fileId: file.id,
      kind: this.storeIdentifier,
      name: key,
      value: value,
    });
  }

  // """Return all key-value entries as a list of (key, value) tuples.
  //
  // If `filter_keys` is provided, only returns keys within that list."""
  public async items(filterKeys?: string[]): Promise<[string, DICT][]> {
    const file = await this._getFile();
    if (!file || !file.tags) {
      return [];
    }

    const ret: [string, DICT][] = [];
    for (const tag of file.tags) {
      if (
        tag.kind == this.storeIdentifier &&
        tag.name != KV_STORE_MARKER &&
        (!filterKeys || (tag.name && filterKeys.includes(tag.name)))
      ) {
        if (tag.name) {
          ret.push([tag.name, tag.value]);
        }
      }
    }
    return ret;
  }

  public async reset() {
    const file = await this._getFile();
    if (file) {
      await file.delete();
    }
  }
}
