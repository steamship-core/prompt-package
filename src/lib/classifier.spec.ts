import test from 'ava';

import { nludb_client } from './helper.test';
import {
  ClassifyRequest,
  ClassifyResult,
  CreateClassifierRequest,
} from './types/classifier';
import { ClassifierModel } from './types/classifier_model';

test('Test Zero Shot', async (t) => {
  const nludb = nludb_client();

  t.throwsAsync(async () => {
    // Missing model
    return nludb.createClassifier({ save: false } as CreateClassifierRequest);
  });

  t.throwsAsync(async () => {
    // Missing labels when it's a zero shot
    const classifier = await nludb.createClassifier({
      save: false,
      model: ClassifierModel.HF_ZERO_SHOT_LBART,
    });
    await classifier.classify({
      docs: ['Jurassic Park'],
    } as ClassifyRequest);
  });

  t.throwsAsync(async () => {
    // Missing docs
    const classifier = await nludb.createClassifier({
      save: false,
      model: ClassifierModel.HF_ZERO_SHOT_LBART,
    });
    await classifier.classify({
      labels: ['Jurassic Park'],
    } as ClassifyRequest);
  });

  const c1 = await nludb.createClassifier({
    save: false,
    model: ClassifierModel.HF_ZERO_SHOT_LBART,
  });
  const r1 = (
    await c1.classify({
      docs: ['Banana'],
      labels: ['Movie', 'Food', 'City'],
    } as ClassifyRequest)
  ).data as ClassifyResult;
  t.is(r1.hits.length, 1);
  t.is(r1.hits[0].length, 1);
  t.is(r1.hits[0][0].value, 'Food');

  const r2 = (
    await c1.classify({
      docs: ['Banana'],
      labels: ['Movie', 'Food', 'City'],
      k: 0,
    } as ClassifyRequest)
  ).data as ClassifyResult;
  t.is(r2.hits.length, 1);
  t.is(r1.hits[0].length, 1);
  t.is(r1.hits[0][0].value, 'Food');

  const r3 = (
    await c1.classify({
      docs: ['Banana'],
      labels: ['Movie', 'Food', 'City'],
      k: 2,
    } as ClassifyRequest)
  ).data as ClassifyResult;
  t.is(r3.hits.length, 1);
  t.is(r3.hits[0].length, 2);
  t.is(r3.hits[0][0].value, 'Food');

  const r4 = (
    await c1.classify({
      docs: ['Banana'],
      labels: ['Movie', 'Food', 'City'],
      k: 3,
    } as ClassifyRequest)
  ).data as ClassifyResult;
  t.is(r4.hits.length, 1);
  t.is(r4.hits[0].length, 3);
  t.is(r4.hits[0][0].value, 'Food');

  const r5 = (
    await c1.classify({
      docs: ['Banana'],
      labels: ['Movie', 'Food', 'City'],
      k: 4,
    } as ClassifyRequest)
  ).data as ClassifyResult;
  t.is(r5.hits.length, 1);
  t.is(r5.hits[0].length, 3);
  t.is(r5.hits[0][0].value, 'Food');

  const r6 = (
    await c1.classify({
      docs: ['Banana', 'Boston'],
      labels: ['Movie', 'Food', 'City'],
      k: 3,
    } as ClassifyRequest)
  ).data as ClassifyResult;
  t.is(r6.hits.length, 2);
  t.is(r6.hits[0].length, 3);
  t.is(r6.hits[0][0].value, 'Food');
  t.is(r6.hits[1].length, 3);
  t.is(r6.hits[1][0].value, 'City');
});
