import test from 'ava';

import { nludb_client, qa_model, random_name } from './helper.test';
import { NludbTaskStatus } from './types/base';
import { CreateIndexRequest } from './types/embedding';

test('Test Index Create', async (t) => {
  const nludb = nludb_client();

  t.throwsAsync(async () => {
    // Missing model
    await nludb.createIndex({ name: random_name() } as CreateIndexRequest);
  });

  t.throwsAsync(async () => {
    // Missing name
    await nludb.createIndex({ model: qa_model() } as CreateIndexRequest);
  });

  const index = await nludb.createIndex({
    name: random_name(),
    model: qa_model(),
  });

  t.throwsAsync(async () => {
    // Upsert false!
    await nludb.createIndex({
      name: index.name,
      model: qa_model(),
    });
  });

  await index.delete();
});

test('Test Index Delete', async (t) => {
  const nludb = nludb_client();

  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: qa_model(),
  });
  t.is(index.name, name);
  t.not(index.id, null);

  const index2 = await nludb.createIndex({
    name: name,
    model: qa_model(),
    upsert: true,
  });
  t.is(index2.name, name);
  t.is(index2.id, index.id);

  await index.delete();

  const index3 = await nludb.createIndex({
    name: name,
    model: qa_model(),
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
    model: qa_model(),
  });

  index.insert({
    value: 'Test',
    reindex: false,
  });

  const task = await index.embed();
  t.not(task.task?.taskId, null);
  t.not(task.task?.taskStatus, null);
  t.not(task.task?.taskCreatedOn, null);
  t.not(task.task?.taskLastModifiedOn, null);
  t.is(task.task?.taskStatus, NludbTaskStatus.waiting);

  await task.wait();
  t.is(task.task?.taskStatus, NludbTaskStatus.succeeded);

  await task.check();
  t.is(task.task?.taskStatus, NludbTaskStatus.succeeded);

  await index.delete();
});

test('Test Index Usage', async (t) => {
  const nludb = nludb_client();
  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: qa_model(),
  });

  // Test for supressed reindexing
  const A1 = 'Ted can eat an entire block of cheese.';
  const Q1 = 'Who can eat the most cheese';
  await index.insert({ value: A1, reindex: false });
  const search_results = await index.search({ query: Q1, k: 1 });
  t.is(search_results.data?.hits.length, 0);

  // Now embed
  const task = await index.embed();
  await task.wait();

  const search_results2 = await index.search({ query: Q1, k: 1 });
  t.is(search_results2.data?.hits.length, 1);
  t.is(search_results2.data?.hits[0].value, A1);

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
  t.is(search_results3.data?.hits.length, 1);
  t.is(search_results3.data?.hits[0].value, A2);
  t.is(typeof search_results3.data?.hits[0].externalId, 'undefined');
  t.is(typeof search_results3.data?.hits[0].externalType, 'undefined');
  t.falsy(search_results3.data?.hits[0].metadata);

  const search_results4 = await index.search({
    query: Q2,
    includeMetadata: true,
  });

  t.is(search_results4.data?.hits.length, 1);
  t.is(search_results4.data?.hits[0].value, A2);
  t.is(search_results4.data?.hits[0].externalId, A2id);
  t.is(search_results4.data?.hits[0].externalType, A2type);
  t.deepEqual(search_results4.data?.hits[0].metadata, A2metadata);

  const search_results5 = await index.search({ query: Q2, k: 10 });
  t.is(search_results5.data?.hits.length, 2);
  t.is(search_results5.data?.hits[0].value, A2);
  t.is(search_results5.data?.hits[1].value, A1);

  await index.delete();
});

test('Test Multiple Queries', async (t) => {
  const nludb = nludb_client();
  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: qa_model(),
  });

  const A1 = 'Ted can eat an entire block of cheese.';
  const A2 = 'Joe can drink an entire glass of water.';
  await index.insert({ value: A1 });
  await index.insert({ value: A2 });
  await (await index.embed()).wait();

  const QS1 = ['Who can eat the most cheese', 'Who can run the fastest?'];
  let search_results = await index.search({ query: QS1[0] });
  t.is(search_results.data?.hits.length, 1);
  t.is(search_results.data?.hits[0].value, A1);
  t.is(search_results.data?.hits[0].query, QS1[0]);

  search_results = await index.search({ queries: QS1 });
  t.is(search_results.data?.hits.length, 1);
  t.is(search_results.data?.hits[0].value, A1);
  t.is(search_results.data?.hits[0].query, QS1[0]);

  const QS2 = ['Who can tie a shoe?', 'Who can drink the most water?'];
  search_results = await index.search({ queries: QS2 });
  t.is(search_results.data?.hits.length, 1);
  t.is(search_results.data?.hits[0].value, A2);
  t.is(search_results.data?.hits[0].query, QS2[1]);

  await index.delete();
});
