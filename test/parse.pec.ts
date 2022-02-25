import { steamship_client } from './helper.spec';
import { TokenMatcher } from '../src/lib/types/parsing';

test('Test Parse', async (t) => {
  const steamship = steamship_client();
  const e1 = await steamship.parse({
    docs: ['This is a test'],
  });
  t.is(e1.data?.docs.length, 1);
  t.is(e1.data?.docs[0].sentences.length, 1);
  t.is(e1.data?.docs[0].sentences[0].text, 'This is a test');
  t.is(e1.data?.docs[0].sentences[0].tokens.length, 4);
  t.is(e1.data?.docs[0].sentences[0].tokens[0].lemma, 'this');
});

test('Test Parse Options', async (t) => {
  const steamship = steamship_client();
  const e1 = await steamship.parse({
    docs: ['Ted likes to drink coffee'],
    includeTokens: false,
  });
  t.is(e1.data?.docs.length, 1);
  t.is(e1.data?.docs[0].sentences.length, 1);
  t.is(e1.data?.docs[0].sentences[0].tokens.length, 0);
});

test('Test Entities', async (t) => {
  const steamship = steamship_client();
  const e1 = await steamship.parse({
    docs: ['Ted likes to drink coffee'],
    includeEntities: true,
  });
  t.is(e1.data?.docs.length, 1);
  t.is(e1.data?.docs[0].sentences.length, 1);
  t.is(e1.data?.docs[0].entities?.length, 1);
});

test('Test Token Matcher', async (t) => {
  const steamship = steamship_client();

  const matcher: TokenMatcher = {
    label: 'A MATCHER',
    patterns: [[{ LOWER: 'a' }, { LOWER: 'matcher' }]],
  };

  const matcher_b: TokenMatcher = {
    label: 'B MATCHER',
    patterns: [[{ LOWER: 'see' }], [{ LOWER: 'if' }, { LOWER: 'a' }]],
  };

  const e1 = await steamship.parse({
    docs: ['We can see if a matcher works'],
    tokenMatchers: [matcher, matcher_b],
  });

  const spans = e1.data?.docs[0].spans;
  t.is(spans?.length, 3);

  const ans: Record<string, string> = {
    'a matcher': matcher.label,
    see: matcher_b.label,
    'if a': matcher_b.label,
  };
  if (spans) {
    for (const sp of spans) {
      t.truthy(ans[sp.text]);
      t.is(sp.label, ans[sp.text]);
    }
  }
});
