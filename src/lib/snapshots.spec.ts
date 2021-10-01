import test from 'ava';

import { nludb_client, qa_model, random_name } from './helper.spec';


test('Test Snapshots', async (t) => {
  const nludb = nludb_client();
  const name = random_name();
  const index = await nludb.createIndex({
    name: name,
    model: qa_model(),
  });

  const A1 = "Ted can eat an entire block of cheese."
  await index.insert({value: A1});
  let task = await index.embed();
  await task.wait();
  const QS1 = ["Who can eat the most cheese", "Who can drink water?"]
  let search_results = await index.search({query: QS1[0]})
  t.is(search_results.data?.hits.length, 1)
  t.is(search_results.data?.hits[0].value, A1)
  t.is(search_results.data?.hits[0].query, QS1[0])
  t.is(search_results.data?.hits[0].indexSource, "index")

  task = await index.createSnapshot()
  await task.wait();

  search_results = await index.search({query: QS1[0]})
  t.is(search_results.data?.hits.length, 1)
  t.is(search_results.data?.hits[0].value, A1)
  t.is(search_results.data?.hits[0].query, QS1[0])
  t.is(search_results.data?.hits[0].indexSource, "snapshot")

  const A2 = "Joe can drink an entire glass of water."
  await index.insert({value: A2});
  task = await index.embed();
  await task.wait();

  search_results = await index.search({query: QS1[0]})
  t.is(search_results.data?.hits.length, 1)
  t.is(search_results.data?.hits[0].value, A1)
  t.is(search_results.data?.hits[0].query, QS1[0])
  t.is(search_results.data?.hits[0].indexSource, "snapshot")

  search_results = await index.search({query: QS1[1]})
  t.is(search_results.data?.hits.length, 1)
  t.is(search_results.data?.hits[0].value, A2)
  t.is(search_results.data?.hits[0].query, QS1[1])
  t.is(search_results.data?.hits[0].indexSource, "index")

  task = await index.createSnapshot()
  await task.wait();

  search_results = await index.search({query: QS1[1]})
  t.is(search_results.data?.hits.length, 1)
  t.is(search_results.data?.hits[0].value, A2)
  t.is(search_results.data?.hits[0].query, QS1[1])
  t.is(search_results.data?.hits[0].indexSource, "snapshot")

  await index.delete();
});
