
import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const _EXPECT = (client: ApiBase, data: unknown) => { 
  return new User(client, data as UserParams) 
}

export interface UserParams {
  id?: string;
  name?: string;
  handle?: string;
}

export class User {
  id?: string;
  name?: string;
  handle?: string;
  client: ApiBase;

  constructor(client: ApiBase, params: UserParams) {
    this.client = client;
    this.id = params.id;
    this.name = params.name;
    this.handle = params.handle;
  }

  static async current(
    client: ApiBase,
    config?: Configuration
  ): Promise<Response<User>> {
    return (await client.get(
      'account/current',
      {},
      {
        expect: _EXPECT,
        ...config
      },
    )) as Response<User>;
  }
}
