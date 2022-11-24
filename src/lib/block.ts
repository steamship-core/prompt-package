import { ITag } from './tag';

export interface IBlock {
  id?: string;
  fileId?: string;
  text?: string;
  tags?: ITag[];
}
