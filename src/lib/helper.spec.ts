import test from 'ava';

import { NLUDB } from './nludb';

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export function random_name(): string {
  const id = generateRandomString(10);
  return `test_${id}`;
}

export function nludb_client(): NLUDB {
  const key = process.env['NLUDB_KEY'];
  const domain = process.env['NLUDB_DOMAIN'];

  if (typeof key == 'undefined') {
    throw Error('Please set NLUDB_KEY in your ENV variables.');
  }

  if (typeof domain == 'undefined') {
    return new NLUDB(key as string);
  } else {
    return new NLUDB(key as string, domain as string);
  }
}

test('Helper Test', (t) => {
  t.true(true);
});
