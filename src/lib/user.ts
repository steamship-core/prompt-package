import { ApiBase, Response } from './api_base';
import { Configuration } from './shared/Configuration';

const _EXPECT = (client: ApiBase, data: unknown) => {
  if ((data as any).user) {
    data = (data as any).user
  }
  return new User(client, data as UserParams)
}

export interface UserParams {
  id?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  handle?: string;
  plan?: string;
  handleSet?: boolean;
}

export interface UpdateParams {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  handle?: string;
}

export class User {
  client: ApiBase;
  id?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  handle?: string;
  plan?: string;
  handleSet?: boolean;

  constructor(client: ApiBase, params: UserParams) {
    this.client = client;
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.nickName = params.nickName;
    this.handle = params.handle;
    this.plan = params.plan;
    this.handleSet = params.handleSet
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

  async update(
    params?: UpdateParams,
    config?: Configuration
  ): Promise<Response<User>> {
    return (await this.client.post(
      'account/update',
      params || {},
      {
        expect: _EXPECT,
        ...config
      },
    )) as Response<User>;
  }
}
