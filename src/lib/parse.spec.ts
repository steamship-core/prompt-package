import test from 'ava';

import { nludb_client } from './helper.spec';
import { TokenMatcher } from './types/parsing';

test('Test Parse', async (t) => {
  const nludb = nludb_client();
  const e1 = await nludb.parse({
    docs: ['This is a test'],
  });
  t.is(e1.docs.length, 1)
  t.is(e1.docs[0].sentences.length, 1)
  t.is(e1.docs[0].sentences[0].text, 'This is a test')
  t.is(e1.docs[0].sentences[0].tokens.length, 4)
  t.is(e1.docs[0].sentences[0].tokens[0].lemma, 'this')
})

test('Test Token Matcher', async (t) => {
  const nludb = nludb_client();

  const matcher: TokenMatcher = {
    label: "A MATCHER",
    patterns: [
      [{"LOWER": "a"}, {"LOWER": "matcher"}]
    ]
  }

  const matcher_b: TokenMatcher = {
    label: "B MATCHER",
    patterns: [
      [{"LOWER": "see"}],
      [{"LOWER": "if"}, {"LOWER": "a"}]
    ]
  }

  const e1 = await nludb.parse({
    docs: ['We can see if a matcher works'],
    tokenMatchers: [matcher, matcher_b]
  });

  console.log(JSON.stringify(e1, undefined, 2))
  const spans = e1.docs[0].spans;
  t.is(spans.length, 3);

  const ans: Record<string, string> = {
    "a matcher": matcher.label,
    "see": matcher_b.label,
    "if a": matcher_b.label
  }
  for (const sp of spans) {
    t.truthy(ans[sp.text])
    t.is(sp.label, ans[sp.text])
  }
})
