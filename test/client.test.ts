import axios from 'axios';
import {Client} from '../src/lib/client';
import {mockDefaultConfigFile, restoreMocks, steamshipClient} from './helper';

describe('Steamship Client', () => {
  test('it should be running with the `test` profile', async () => {
    const steamship = steamshipClient();
    let config = await steamship.config;
    expect(config.profile).toBe('test');
  });

  test('it should be able to create a login attempt token', async () => {
    mockDefaultConfigFile();

    jest.spyOn(axios, 'post');

    // @ts-ignore
    axios.post.mockResolvedValue({
      data: {
        data: {
          token: 'hello',
        },
      },
    });

    const client = new Client();
    const createTokenResponse = await client.createLoginAttempt();
    expect(createTokenResponse.data!.token).toEqual('hello');
    restoreMocks();
  });
});

// test('Test Embeddings', async (t) => {
//   const steamship = steamship_client();
//   const e1 = await steamship.embed({
//     texts: ['This is a test'],
//     model: qa_model(),
//   });
//   const e1b = await steamship.embed({
//     texts: ['Banana'],
//     model: qa_model(),
//   });
//   const e2 = await steamship.embed({
//     texts: ['This is a test'],
//     model: qa_model(),
//   });
//   const e3 = await steamship.embed({
//     texts: ['This is a test'],
//     model: sim_model(),
//   });
//   const e3b = await steamship.embed({
//     texts: ['Banana'],
//     model: sim_model(),
//   });
//   const e4 = await steamship.embed({
//     texts: ['This is a test'],
//     model: sim_model(),
//   });
//   // const e5 = await steamship.embed({
//   //   texts: ['This is a test'],
//   //   model: EmbeddingModel.PARAPHRASE,
//   // });
//   // const e5b = await steamship.embed({
//   //   texts: ['Banana'],
//   //   model: EmbeddingModel.PARAPHRASE,
//   // });
//   // const e6 = await steamship.embed({
//   //   texts: ['This is a test'],
//   //   model: EmbeddingModel.PARAPHRASE,
//   // });

//   t.is(e1.data?.embeddings.length, 1);
//   t.is(e1.data?.embeddings[0].length, 768);
//   t.notDeepEqual(e1.data?.embeddings[0], e1b.data?.embeddings[0]);

//   t.is(e3.data?.embeddings.length, 1);
//   t.is(e3.data?.embeddings[0].length, 768);
//   t.notDeepEqual(e3.data?.embeddings[0], e3b.data?.embeddings[0]);

//   // t.is(e5.data?.embeddings.length, 1);
//   // t.is(e5.data?.embeddings[0].length, 768);
//   // t.notDeepEqual(e3.data?.embeddings[0], e5b.data?.embeddings[0]);

//   t.notDeepEqual(e1.data?.embeddings[0], e3b.data?.embeddings[0]);
//   // t.notDeepEqual(e1.data?.embeddings[0], e5b.data?.embeddings[0]);
//   // t.notDeepEqual(e3.data?.embeddings[0], e5b.data?.embeddings[0]);

//   t.deepEqual(e1.data?.embeddings[0], e2.data?.embeddings[0]);
//   t.deepEqual(e3.data?.embeddings[0], e4.data?.embeddings[0]);
//   // t.deepEqual(e5.data?.embeddings[0], e6.data?.embeddings[0]);
// });

// test('Test Embedding Search', async (t) => {
//   const steamship = steamship_client();
//   const docs = [
//     'Armadillo shells are bulletproof.',
//     'Dolphins sleep with one eye open.',
//     'Alfred Hitchcock was frightened of eggs.',
//     'Jonathan can help you with new employee onboarding',
//     'The code for the New York office is 1234',
//   ];
//   const query = 'Who should I talk to about new employee setup?';
//   const results = await steamship.embedAndSearch({
//     query: query,
//     docs: docs,
//     model: qa_model(),
//     k: 1,
//   });

//   t.is(results.data?.hits.length, 1);
//   t.is(
//     results.data?.hits[0].value,
//     'Jonathan can help you with new employee onboarding'
//   );
// });
