export interface Token {
  text: string;
  textWithWs: string;
  whitespace: string;
  head: string;
  headI: number;
  leftEdge: string;
  rightEdge: string;
  entType: string;
  entIob: string;
  lemma: string;
  normalized: string;
  shape: string;
  prefix: string;
  suffix: string;
  isAlpha: boolean;
  isAscii: boolean;
  isDigit: boolean;
  isTitle: boolean;
  isPunct: boolean;
  isLeftPunct: boolean;
  isRightPunct: boolean;
  isSpace: boolean;
  isBracket: boolean;
  isQuote: boolean;
  isCurrency: boolean;
  likeUrl: boolean;
  likeNum: boolean;
  likeEmail: boolean;
  isOov: boolean;
  isStop: boolean;
  pos: string;
  tag: string;
  dep: string;
  lang: string;
  prob: number;
  charIndex: number;
  tokenIndex: number;
}


export interface Entity {
  text: string;
  textWithWs: string;
  startChar: number;
  endChar: number;
  startToken: number;
  endToken: number;
  label: string;
  lemma: string;
}

export interface Span {
  text: string;
  textWithWs: string;
  startChar: number;
  endChar: number;
  startToken: number;
  endToken: number;
  label: string;
  lemma: string;
  sentiment: number;
}

export interface Sentence {
  text: string;
  tokens: Token[];
  entities: Entity[];
  spans: Span[];
  sentiment: number;
}

export interface Doc {
  text: string;
  sentences: Sentence[];
  spans: Span[];
  model: string;
  lang: string;
  sentiment: number;
}

export interface ParseResponse {
  docs: Doc[];
}

export type MatcherClause = Record<string, unknown>
export type Matcher = MatcherClause[]

export interface TokenMatcher {
  label: string
  patterns: Matcher[];
}

export interface PhraseMatcher {
  label: string;
  phrases: string[];
  attr: string;
}

export interface DependencyMatcher {
  label: string;
  // Note: Add a LABEL field to the matcher clause to have a token get labeled in the response.
  patterns: Matcher[];
}

export interface ParseRequest{
  docs: string[];
  model?: string;
  tokenMatchers?: TokenMatcher[];
  phraseMatchers?: PhraseMatcher[];
  dependencyMatchers?: DependencyMatcher[];
}
