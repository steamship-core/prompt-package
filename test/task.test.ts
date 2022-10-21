import {steamshipClient} from './helper';
import {createEmbeddingIndex} from "./embedding_index.test";
import {Workspace, Task} from "../src";
import {TaskState} from "../src/lib/types/base";

test('Test Task List', async () => {
  const client = steamshipClient();
  // We're doing to do this just to create a task..
  await createEmbeddingIndex(client, async (_1, _2, index) => {
    await index.insert({value: "Hi there"}) // This creates a task
    let embedR = await index.embed()
    expect(embedR.task).not.toBeFalsy()

    await embedR.wait() // Let it finish

    let tasksR = await Task.list(client, {id: embedR.task!.taskId})
    expect(tasksR.data).not.toBeFalsy()
    let tasks = tasksR.data!
    expect(tasks.tasks).not.toBeFalsy()
    expect(tasks.tasks.length).toBe(1)
    expect(tasks.tasks[0].state).toBe(TaskState.succeeded)

    // Filtering for bad state; 0 results
    let tasksR2 = await Task.list(client, {
      id: embedR.task!.taskId,
      state: TaskState.failed
    })
    expect(tasksR2.data).not.toBeFalsy()
    let tasks2 = tasksR2.data!
    expect(tasks2.tasks).not.toBeFalsy()
    expect(tasks2.tasks.length).toBe(0)

    // Filtering for good state; 1 results
    let tasksR3 = await Task.list(client, {
      id: embedR.task!.taskId,
      state: TaskState.succeeded
    })
    expect(tasksR3.data).not.toBeFalsy()
    let tasks3 = tasksR3.data!
    expect(tasks3.tasks).not.toBeFalsy()
    expect(tasks3.tasks.length).toBe(1)

    // Filtering for bad space; 0 results
    let space2 = (await Workspace.create(client)).data
    expect(space2).not.toBeFalsy()
    expect(space2?.handle).not.toBeFalsy()

    expect(space2?.handle).not.toEqual((await client.config).workspaceHandle)

    let tasksR4 = await Task.list(client, {
      id: embedR.task!.taskId,
      workspaceId: space2?.id
    })
    expect(tasksR4.data).not.toBeFalsy()
    let tasks4 = tasksR4.data!
    expect(tasks4.tasks).not.toBeFalsy()
    expect(tasks4.tasks.length).toBe(0)

    // But filtering for good space is OK!
    let tasksR5 = await Task.list(client, {
      id: embedR.task!.taskId,
      workspaceId: (await client.config).workspaceId
    })
    expect(tasksR5.data).not.toBeFalsy()
    let tasks5 = tasksR5.data!
    expect(tasks5.tasks).not.toBeFalsy()
    expect(tasks5.tasks.length).toBe(1)
  })
}, 10000);



