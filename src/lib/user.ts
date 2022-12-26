import { IApiBase } from './shared/BaseInterfaces';
import { Configuration } from './shared/Configuration';
import { Task } from './task';

const _EXPECT = (client: IApiBase, data: unknown) => {
  if ((data as any).user) {
    data = (data as any).user;
  }
  return new User(client, data as UserParams);
};

export interface UserParams {
  id?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  handle?: string;
  plan?: string;
  handleSet?: boolean;
  profile?: any;
  profilePhoto?: string;
}

export interface UpdateParams {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  handle?: string;
}

export class User {
  client: IApiBase;
  id?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  handle?: string;
  plan?: string;
  handleSet?: boolean;
  profile?: any;
  profilePhoto?: string;

  constructor(client: IApiBase, params: UserParams) {
    this.client = client;
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.nickName = params.nickName;
    this.handle = params.handle;
    this.plan = params.plan;
    this.handleSet = params.handleSet;
    this.profile = params.profile;
    this.profilePhoto = params.profilePhoto;
  }

  static async current(
    client: IApiBase,
    config?: Configuration
  ): Promise<Task<User>> {
    return (await client.get(
      'account/current',
      {},
      {
        expect: _EXPECT,
        ...config,
      }
    )) as Task<User>;
  }

  async update(
    params?: UpdateParams,
    config?: Configuration
  ): Promise<Task<User>> {
    return (await this.client.post('account/update', params || {}, {
      expect: _EXPECT,
      ...config,
    })) as Task<User>;
  }
}
