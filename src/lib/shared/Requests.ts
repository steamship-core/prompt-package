export interface CreateParams {
  handle?: string;
  fetchIfExists?: boolean;
}

export interface GetParams {
  id?: string;
  handle?: string;
}

export interface DeleteParams {
  id: string;
}
