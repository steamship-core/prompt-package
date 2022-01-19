import { Client } from '../src/lib/nludb';

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export function random_name(): string {
  const id = generateRandomString(10);
  return `test_${id}`;
}

export function nludb_client(): Client {
  return new Client({profile: "test"});
}