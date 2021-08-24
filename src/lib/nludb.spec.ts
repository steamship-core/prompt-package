import test from 'ava';

import { nludb_client } from './helper.spec';
import { EmbeddingModel } from './types/embedding_model';

test('Create NLUDB Client', (t) => {
  t.notThrows(() => {
    nludb_client();
  });
});

test('Test Embeddings', async (t) => {
  const nludb = nludb_client();
  const e1 = await nludb.embed({
    texts: ['This is a test'],
    model: EmbeddingModel.QA,
  });
  const e1b = await nludb.embed({
    texts: ['Banana'],
    model: EmbeddingModel.QA,
  });
  const e2 = await nludb.embed({
    texts: ['This is a test'],
    model: EmbeddingModel.QA,
  });
  const e3 = await nludb.embed({
    texts: ['This is a test'],
    model: EmbeddingModel.SIMILARITY,
  });
  const e3b = await nludb.embed({
    texts: ['Banana'],
    model: EmbeddingModel.SIMILARITY,
  });
  const e4 = await nludb.embed({
    texts: ['This is a test'],
    model: EmbeddingModel.SIMILARITY,
  });
  const e5 = await nludb.embed({
    texts: ['This is a test'],
    model: EmbeddingModel.PARAPHRASE,
  });
  const e5b = await nludb.embed({
    texts: ['Banana'],
    model: EmbeddingModel.PARAPHRASE,
  });
  const e6 = await nludb.embed({
    texts: ['This is a test'],
    model: EmbeddingModel.PARAPHRASE,
  });

  t.is(e1.embeddings.length, 1);
  t.is(e1.embeddings[0].length, 768);
  t.notDeepEqual(e1.embeddings[0], e1b.embeddings[0]);

  t.is(e3.embeddings.length, 1);
  t.is(e3.embeddings[0].length, 768);
  t.notDeepEqual(e3.embeddings[0], e3b.embeddings[0]);

  t.is(e5.embeddings.length, 1);
  t.is(e5.embeddings[0].length, 768);
  t.notDeepEqual(e3.embeddings[0], e5b.embeddings[0]);

  t.notDeepEqual(e1.embeddings[0], e3b.embeddings[0]);
  t.notDeepEqual(e1.embeddings[0], e5b.embeddings[0]);
  t.notDeepEqual(e3.embeddings[0], e5b.embeddings[0]);

  t.deepEqual(e1.embeddings[0], e2.embeddings[0]);
  t.deepEqual(e3.embeddings[0], e4.embeddings[0]);
  t.deepEqual(e5.embeddings[0], e6.embeddings[0]);
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
    model: EmbeddingModel.QA,
    k: 1,
  });

  t.is(results.hits.length, 1);
  t.is(
    results.hits[0].value,
    'Jonathan can help you with new employee onboarding'
  );
});

