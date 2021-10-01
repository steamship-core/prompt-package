import test from 'ava';

import { EmbeddingModel, ParsingModel } from '..';

import { NLUDB } from './nludb';

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export function random_name(): string {
  const id = generateRandomString(10);
  return `test_${id}`;
}

export function qa_model(): string {
  return process.env['NLUDB_EMBEDDER_QA'] || EmbeddingModel.QA
}

export function sim_model(): string {
  return process.env['NLUDB_EMBEDDER_SIM'] || EmbeddingModel.SIMILARITY
}

export function parse_model(): string {
  return process.env['NLUDB_PARSER_DEFAULT'] || ParsingModel.EN_DEFAULT
}

export function nludb_client(): NLUDB {
  const key = process.env['NLUDB_KEY'];
  const domain = process.env['NLUDB_DOMAIN'];

  if (typeof key == 'undefined') {
    throw Error('Please set NLUDB_KEY in your ENV variables.');
  }

  if (typeof domain == 'undefined') {
    return new NLUDB({apiKey: key as string});
  } else {
    return new NLUDB({apiKey: key as string, apiDomain: domain as string});
  }
}

test('Helper Test', (t) => {
  t.true(true);
});
