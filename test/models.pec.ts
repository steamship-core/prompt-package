import test from 'ava';

import { steamship_client, random_name } from './helper.spec';
import {
  CreateModelRequest,
  ModelAdapterType,
  ModelType,
} from './types/models';

test('Test Model Create', async (t) => {
  const steamship = steamship_client();

  const modelsOrig = await steamship.models.listPrivate();
  const origCount = modelsOrig.data?.models.length || 0;

  await t.throwsAsync(async () => {
    await steamship.models.create({
      description: 'This is just for test',
      modelType: ModelType.embedder,
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
    } as CreateModelRequest);
  });

  await t.throwsAsync(async () => {
    await steamship.models.create({
      name: random_name(),
      modelType: ModelType.embedder,
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
    } as CreateModelRequest);
  });

  await t.throwsAsync(async () => {
    await steamship.models.create({
      name: random_name(),
      description: 'This is just for test',
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
    } as CreateModelRequest);
  });

  await t.throwsAsync(async () => {
    await steamship.models.create({
      name: random_name(),
      description: 'This is just for test',
      modelType: ModelType.embedder,
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
    } as CreateModelRequest);
  });

  await t.throwsAsync(async () => {
    await steamship.models.create({
      name: random_name(),
      description: 'This is just for test',
      modelType: ModelType.embedder,
      url: 'http://foo',
      isPublic: false,
    } as CreateModelRequest);
  });

  await t.throwsAsync(async () => {
    await steamship.models.create({
      name: random_name(),
      description: 'This is just for test',
      modelType: ModelType.embedder,
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
    } as CreateModelRequest);
  });

  const models = await steamship.models.listPrivate();
  t.is(models.data?.models.length, origCount);

  const model = (
    await steamship.models.create({
      name: random_name(),
      description: 'This is just for test',
      modelType: ModelType.embedder,
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
    })
  ).data;

  const models2 = await steamship.models.listPrivate();
  t.is(models2.data?.models.length, origCount + 1);

  // Upsert
  await t.throwsAsync(async () => {
    await steamship.models.create({
      name: model?.name || 'F',
      description: 'This is just for test',
      modelType: ModelType.embedder,
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
    });
  });

  const model2 = (
    await steamship.models.create({
      name: model?.name || 'F',
      description: 'This is just for test 2',
      modelType: ModelType.embedder,
      url: 'http://foo',
      adapterType: ModelAdapterType.steamshipDocker,
      isPublic: false,
      upsert: true,
    })
  ).data;

  t.is(model2?.id, model?.id);

  const models3 = (await steamship.models.listPrivate()).data;
  t.is(models3?.models.length, origCount + 1);
  t.is(models2?.data?.models[0].id, models3?.models[0].id);
  // Upsert really doesn't update yet. Just retrieves old one.
  // t.is(models3.models[0].description, models.models[0].description)

  await steamship.models.delete({ modelId: model?.id || '' });

  const models4 = (await steamship.models.listPrivate()).data;
  t.is(models4?.models.length, origCount);
});

test('Test Public Models', async (t) => {
  const steamship = steamship_client();

  const modelsOrig = (await steamship.models.listPublic()).data;
  const origCount = modelsOrig?.models.length || 0;
  t.is(origCount > 0, true);

  // It can't be deleted
  await t.throwsAsync(async () => {
    await steamship.models.delete({ modelId: modelsOrig?.models[0].id || '' });
  });
});
