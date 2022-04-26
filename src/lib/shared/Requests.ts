export interface CreateParams {
  handle?: string;
  upsert?: boolean;
}

export interface GetParams {
  id?: string;
  handle?: string;
}

export interface DeleteParams {
  id: string;
}
