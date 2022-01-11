import test from 'ava';

import { nludb_client, qa_model, sim_model } from './helper.test';

test('Create NLUDB Client', (t) => {
  t.notThrows(() => {
    nludb_client();
  });
});

test('Test Embeddings', async (t) => {
  const nludb = nludb_client();
  const e1 = await nludb.embed({
    texts: ['This is a test'],
    model: qa_model(),
  });
  const e1b = await nludb.embed({
    texts: ['Banana'],
    model: qa_model(),
  });
  const e2 = await nludb.embed({
    texts: ['This is a test'],
    model: qa_model(),
  });
  const e3 = await nludb.embed({
    texts: ['This is a test'],
    model: sim_model(),
  });
  const e3b = await nludb.embed({
    texts: ['Banana'],
    model: sim_model(),
  });
  const e4 = await nludb.embed({
    texts: ['This is a test'],
    model: sim_model(),
  });
  // const e5 = await nludb.embed({
  //   texts: ['This is a test'],
  //   model: EmbeddingModel.PARAPHRASE,
  // });
  // const e5b = await nludb.embed({
  //   texts: ['Banana'],
  //   model: EmbeddingModel.PARAPHRASE,
  // });
  // const e6 = await nludb.embed({
  //   texts: ['This is a test'],
  //   model: EmbeddingModel.PARAPHRASE,
  // });

  t.is(e1.data?.embeddings.length, 1);
  t.is(e1.data?.embeddings[0].length, 768);
  t.notDeepEqual(e1.data?.embeddings[0], e1b.data?.embeddings[0]);

  t.is(e3.data?.embeddings.length, 1);
  t.is(e3.data?.embeddings[0].length, 768);
  t.notDeepEqual(e3.data?.embeddings[0], e3b.data?.embeddings[0]);

  // t.is(e5.data?.embeddings.length, 1);
  // t.is(e5.data?.embeddings[0].length, 768);
  // t.notDeepEqual(e3.data?.embeddings[0], e5b.data?.embeddings[0]);

  t.notDeepEqual(e1.data?.embeddings[0], e3b.data?.embeddings[0]);
  // t.notDeepEqual(e1.data?.embeddings[0], e5b.data?.embeddings[0]);
  // t.notDeepEqual(e3.data?.embeddings[0], e5b.data?.embeddings[0]);

  t.deepEqual(e1.data?.embeddings[0], e2.data?.embeddings[0]);
  t.deepEqual(e3.data?.embeddings[0], e4.data?.embeddings[0]);
  // t.deepEqual(e5.data?.embeddings[0], e6.data?.embeddings[0]);
});

test('Test Embedding Search', async (t) => {
  const nludb = nludb_client();
  const docs = [
    'Armadillo shells are bulletproof.',
    'Dolphins sleep with one eye open.',
    'Alfred Hitchcock was frightened of eggs.',
    'Jonathan can help you with new employee onboarding',
    'The code for the New York office is 1234',
  ];
  const query = 'Who should I talk to about new employee setup?';
  const results = await nludb.embedAndSearch({
    query: query,
    docs: docs,
    model: qa_model(),
    k: 1,
  });

  t.is(results.data?.hits.length, 1);
  t.is(
    results.data?.hits[0].value,
    'Jonathan can help you with new employee onboarding'
  );
});
