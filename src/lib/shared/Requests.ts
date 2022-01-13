export interface CreateParams {
  name?: string;
  handle?: string;
  upsert?: boolean;
}

export interface GetParams {
  id?: string;
  name?: string;
  handle?: string;
}

export interface DeleteParams {
  id: string;
}
