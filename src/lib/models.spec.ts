import test from 'ava';

import { nludb_client, random_name } from './helper.spec';
import { CreateModelRequest, ModelAdapterType, ModelType } from './types/models';

test('Test Model Create', async (t) => {
  const nludb = nludb_client();

  const modelsOrig = await nludb.models.listPrivate();
  const origCount = modelsOrig.models.length;

  await t.throwsAsync(async () => {
    await nludb.models.create({
      description: "This is just for test",
      modelType: ModelType.embedder,
      url: "http://foo",
      adapterType: ModelAdapterType.nludbDocker,
      isPublic: false
    } as CreateModelRequest)
  });

  await t.throwsAsync(async () => {
    await nludb.models.create({
      name: random_name(),
      modelType: ModelType.embedder,
      url: "http://foo",
      adapterType: ModelAdapterType.nludbDocker,
      isPublic: false
    } as CreateModelRequest)
  });

  await t.throwsAsync(async () => {
    await nludb.models.create({
      name: random_name(),
      description: "This is just for test",
      url: "http://foo",
      adapterType: ModelAdapterType.nludbDocker,
      isPublic: false
    } as CreateModelRequest)
  });

  await t.throwsAsync(async () => {
    await nludb.models.create({
      name: random_name(),
      description: "This is just for test",
      modelType: ModelType.embedder,
      adapterType: ModelAdapterType.nludbDocker,
      isPublic: false
    } as CreateModelRequest)
  });

  await t.throwsAsync(async () => {
    await nludb.models.create({
      name: random_name(),
      description: "This is just for test",
      modelType: ModelType.embedder,
      url: "http://foo",
      isPublic: false
    } as CreateModelRequest)
  });

  await t.throwsAsync(async () => {
    await nludb.models.create({
      name: random_name(),
      description: "This is just for test",
      modelType: ModelType.embedder,
      url: "http://foo",
      adapterType: ModelAdapterType.nludbDocker,
    } as CreateModelRequest)
  });

  const models = await nludb.models.listPrivate();
  t.is(models.models.length, origCount);

  const model = await nludb.models.create({
    name: random_name(),
    description: "This is just for test",
    modelType: ModelType.embedder,
    url: "http://foo",
    adapterType: ModelAdapterType.nludbDocker,
    isPublic: false
  })

  const models2 = await nludb.models.listPrivate();
  t.is(models2.models.length, origCount + 1);

  // Upsert
  await t.throwsAsync(async () => {
    await nludb.models.create({
      name: model.name,
      description: "This is just for test",
      modelType: ModelType.embedder,
      url: "http://foo",
      adapterType: ModelAdapterType.nludbDocker,
      isPublic: false
    })
  });

  const model2 = await nludb.models.create({
    name: model.name,
    description: "This is just for test 2",
    modelType: ModelType.embedder,
    url: "http://foo",
    adapterType: ModelAdapterType.nludbDocker,
    isPublic: false,
    upsert: true
  })

  t.is(model2.id, model.id)

  const models3 = await nludb.models.listPrivate();
  t.is(models3.models.length, origCount + 1)
  t.is(models2.models[0].id, models3.models[0].id)
  // Upsert really doesn't update yet. Just retrieves old one.
  // t.is(models3.models[0].description, models.models[0].description)

  await nludb.models.delete({modelId: model.id})

  const models4 = await nludb.models.listPrivate();
  t.is(models4.models.length, origCount)
});


test('Test Public Models', async (t) => {
  const nludb = nludb_client();

  const modelsOrig = await nludb.models.listPublic();
  const origCount = modelsOrig.models.length;
  t.is(origCount > 0, true);

  // It can't be deleted
  await t.throwsAsync(async () => {
    await nludb.models.delete({modelId: modelsOrig.models[0].id})
  })
})
