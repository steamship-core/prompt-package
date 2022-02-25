import { steamship_client, qa_model, random_name } from './helper.spec';

test('Test Task Comments', async (t) => {
  const steamship = steamship_client();
  const name = random_name();
  const index = await steamship.createIndex({
    name: name,
    model: qa_model(),
  });

  const A1 = 'Ted can eat an entire block of cheese.';
  await index.insert({ value: A1 });
  const task = await index.embed();
  await task.wait();
  const QS1 = ['Who can eat the most cheese', 'Who can drink water?'];
  const search_results = await index.search({ query: QS1[0] });

  const G1 = random_name();
  const G2 = random_name();

  await search_results.addComment({
    externalId: 'Foo1',
    externalType: 'Bar1',
    externalGroup: G1,
    metadata: [1, 2, 3],
  });
  await search_results.addComment({
    externalId: 'Foo2',
    externalType: 'Bar1',
    externalGroup: G1,
    metadata: [1, 2, 3],
  });
  await search_results.addComment({
    externalId: 'Foo2',
    externalType: 'Bar1',
    externalGroup: G2,
    metadata: [1, 2, 3],
  });

  const comments = (await search_results.listComments()).data;
  t.is(comments?.comments.length, 3);

  t.is(
    (await steamship.tasks.listComments({ externalGroup: G1 })).data?.comments
      .length,
    2
  );
  t.is(
    (await steamship.tasks.listComments({ externalGroup: G2 })).data?.comments
      .length,
    1
  );
  t.is(
    (
      await steamship.tasks.listComments({
        taskId: search_results.task?.taskId,
        externalGroup: G1,
      })
    ).data?.comments.length,
    2
  );
  t.is(
    (
      await steamship.tasks.listComments({
        taskId: search_results.task?.taskId,
        externalGroup: G2,
      })
    ).data?.comments.length,
    1
  );
  t.is(
    (
      await steamship.tasks.listComments({
        taskId: search_results.task?.taskId,
        externalId: 'Foo1',
        externalGroup: G1,
      })
    ).data?.comments.length,
    1
  );
  t.is(
    (
      await steamship.tasks.listComments({
        taskId: search_results.task?.taskId,
        externalId: 'Foo1',
        externalGroup: G2,
      })
    ).data?.comments.length,
    0
  );

  t.is(typeof comments?.comments[0].taskCommentId == 'undefined', false);
  t.is(typeof comments?.comments[0].taskCommentId == 'undefined', false);
  t.is(typeof comments?.comments[0].taskCommentId == 'undefined', false);

  await search_results.deleteComment({
    taskCommentId: comments?.comments[0].taskCommentId,
  });
  await search_results.deleteComment({
    taskCommentId: comments?.comments[1].taskCommentId,
  });
  await search_results.deleteComment({
    taskCommentId: comments?.comments[2].taskCommentId,
  });

  t.is(
    (await steamship.tasks.listComments({ externalGroup: G1 })).data?.comments
      .length,
    0
  );
  t.is(
    (await steamship.tasks.listComments({ externalGroup: G2 })).data?.comments
      .length,
    0
  );

  await index.delete();
});
