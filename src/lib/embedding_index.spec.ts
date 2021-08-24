import test from 'ava';

import { nludb_client, random_name } from './helper.spec';
import { NludbTaskStatus } from './types/base'
import { CreateIndexRequest } from './types/embedding';
import { EmbeddingModel } from './types/embedding_model';

test('Test Index Create', async (t) => {
  const nludb = nludb_client();

  t.throwsAsync(async () => {
    // Missing model
    await nludb.createIndex({ name: random_name() } as CreateIndexRequest);
  });

  t.throwsAsync(async () => {
    // Missing name
    await nludb.createIndex({ model: EmbeddingModel.QA } as CreateIndexRequest);
  });

  const index = await nludb.createIndex({
    name: random_name(),
    model: EmbeddingModel.QA,
  });

  t.throwsAsync(async () => {
    // Upsert false!
    await nludb.createIndex({
      name: index.name,
      model: EmbeddingModel.QA,
    });
  });

  await index.delete();
});

test('Test Index Delete', async (t) => {
  const nludb = nludb_client();

  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: EmbeddingModel.QA,
  });
  t.is(index.name, name);
  t.not(index.id, null);

  const index2 = await nludb.createIndex({
    name: name,
    model: EmbeddingModel.QA,
    upsert: true,
  });
  t.is(index2.name, name);
  t.is(index2.id, index.id);

  await index.delete();

  const index3 = await nludb.createIndex({
    name: name,
    model: EmbeddingModel.QA,
    upsert: true,
  });
  t.is(index3.name, name);
  t.not(index3.id, index.id);
  await index3.delete();
});

test('Test Index Embed Task', async (t) => {
  const nludb = nludb_client();
  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: EmbeddingModel.QA,
  });

  index.insert({
    value: 'Test',
    reindex: false,
  });

  const task = await index.embed();
  t.not(task.taskId, null);
  t.not(task.taskStatus, null);
  t.not(task.taskCreatedOn, null);
  t.not(task.taskLastModifiedOn, null);
  t.is(task.taskStatus, NludbTaskStatus.waiting);

  await task.wait();
  t.is(task.taskStatus, NludbTaskStatus.succeeded);

  await task.check();
  t.is(task.taskStatus, NludbTaskStatus.succeeded);

  await index.delete();
});

test('Test Index Usage', async (t) => {
  const nludb = nludb_client();
  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: EmbeddingModel.QA,
  });

  // Test for supressed reindexing
  const A1 = 'Ted can eat an entire block of cheese.';
  const Q1 = 'Who can eat the most cheese';
  await index.insert({ value: A1, reindex: false });
  const search_results = await index.search({ query: Q1, k: 1 });
  t.is(search_results.hits.length, 0);

  // Now embed
  const task = await index.embed();
  await task.wait();

  const search_results2 = await index.search({ query: Q1, k: 1 });
  t.is(search_results2.hits.length, 1);
  t.is(search_results2.hits[0].value, A1);

  // Associate metadata
  const A2 = 'Armadillo shells are bulletproof.';
  const Q2 = 'What is something interesting about Armadillos?';
  const A2id = 'A2id';
  const A2type = 'A2type';
  const A2metadata = {
    id: A2id,
    idid: `${A2id}${A2id}`,
    boolVal: true,
    intVal: 123,
    floatVal: 1.2,
  };

  await index.insert({
    value: A2,
    externalId: A2id,
    externalType: A2type,
    metadata: A2metadata,
  });
  const task2 = await index.embed();
  await task2.wait();

  const search_results3 = await index.search({ query: Q2 });
  t.is(search_results3.hits.length, 1);
  t.is(search_results3.hits[0].value, A2);
  t.is(typeof search_results3.hits[0].externalId, 'undefined');
  t.is(typeof search_results3.hits[0].externalType, 'undefined');
  t.falsy(search_results3.hits[0].metadata);

  const search_results4 = await index.search({
    query: Q2,
    includeMetadata: true,
  });

  t.is(search_results4.hits.length, 1);
  t.is(search_results4.hits[0].value, A2);
  t.is(search_results4.hits[0].externalId, A2id);
  t.is(search_results4.hits[0].externalType, A2type);
  t.deepEqual(search_results4.hits[0].metadata, A2metadata);

  const search_results5 = await index.search({ query: Q2, k: 10 });
  t.is(search_results5.hits.length, 2);
  t.is(search_results5.hits[0].value, A2);
  t.is(search_results5.hits[1].value, A1);

  await index.delete();
});
