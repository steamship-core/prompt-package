export type GotHeadersGuard = 'immutable' | 'none';

export class GotHeaders implements Headers {
  private headers: Map<string, string[]>;
  private guard: GotHeadersGuard;

  constructor(
    headers?: Record<string, string | string[] | undefined>,
    guard: GotHeadersGuard = 'none'
  ) {
    const init: [string, string[]][] = headers
      ? Object.entries(headers).map(([name, values]) => {
          if (typeof values === 'string') {
            return [name.toLowerCase(), [values]];
          } else if (Array.isArray(values)) {
            return [name.toLowerCase(), values];
          } else {
            return [name.toLowerCase(), []];
          }
        })
      : [];

    this.guard = guard;
    this.headers = new Map(init);
  }

  private checkGuard() {
    if (this.guard === 'immutable') {
      throw new TypeError('Header guard set to `immutable`');
    }
  }

  append(name: string, value: string): void {
    this.checkGuard();

    const key = name.toLowerCase();
    this.headers.set(key, (this.headers.get(key) || []).concat([value]));
  }
  delete(name: string): void {
    this.checkGuard();
    this.headers.delete(name.toLowerCase());
  }
  get(name: string): string | null {
    const values = this.headers.get(name.toLowerCase());
    return values ? values.join(', ') : null;
  }
  has(name: string): boolean {
    return this.headers.has(name.toLowerCase());
  }
  set(name: string, value: string): void {
    this.checkGuard();
    this.headers.set(name.toLowerCase(), [value]);
  }
  forEach(
    callbackfn: (value: string, key: string, parent: Headers) => void,
    thisArg?: unknown
  ): void {
    this.headers.forEach((_, name) => {
      callbackfn.call(thisArg, this.get(name) as any, name, this);
    });
  }

  *entries(): IterableIterator<[string, string]> {
    for (const key of this.headers.keys()) {
      yield [key, this.get(key) as any];
    }
  }

  keys() {
    return this.headers.keys();
  }

  *values() {
    for (const key of this.headers.keys()) {
      yield this.get(key) as any;
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

export type Body =
  | any
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | string;

type ResponseInit = {
  status?: number;
  statusText?: string | Buffer;
  headers?: any; // This is really type IncomingHttpHeaders from the http2 library.
  url?: string;
  redirected?: boolean;
  type?: ResponseType;
};

export class GotFetchResponse implements Response {
  readonly headers: GotHeaders;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly type: ResponseType;
  /**
   * This is a Node Readable stream
   */
  readonly body: any | null;

  #bodyUsed = false;

  constructor(body: Body | null, init?: ResponseInit | null) {
    if (
      init &&
      typeof init.status === 'number' &&
      (init.status < 200 || init.status > 599)
    ) {
      throw new RangeError(`init.status is out of range: ${init.status}`);
    }

    this.body = body;

    this.type = (init && init.type) || 'basic';
    this.headers = new GotHeaders(init ? init.headers : undefined, 'immutable');

    this.status = (init && init.status) || 0;
    this.statusText = String((init && init.statusText) || '');

    this.url = (init && init.url) || '';
    this.redirected = (init && init.redirected) || false;
  }

  get bodyUsed(): boolean {
    return this.#bodyUsed;
  }

  get ok(): boolean {
    return this.status >= 200 && this.status <= 299;
  }

  get trailer(): Promise<Headers> {
    return Promise.reject(new TypeError('`trailer` promise not supported'));
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error('`arrayBuffer` not implemented');
  }

  blob(): Promise<Blob> {
    throw new Error('`blob` not implemented');
  }

  formData(): Promise<FormData> {
    return this.text().then((body) => new URLSearchParams(body));
  }

  json(): Promise<any> {
    return this.text().then(JSON.parse);
  }

  async text(): Promise<string> {
    this.#bodyUsed = true;

    if (this.body === null) {
      return Promise.resolve('');
    }

    if (typeof this.body === 'string') {
      return Promise.resolve(this.body);
    } else if (Buffer.isBuffer(this.body)) {
      return Promise.resolve(this.body.toString('utf8'));
    } else {
      let body = '';
      for await (const chunk of this.body) {
        body += chunk;
      }

      return body;
    }
  }

  clone(): GotFetchResponse {
    throw new Error('clone not implemented');
  }

  static error(): GotFetchResponse {
    return new GotFetchResponse(null, { type: 'error' });
  }
}
