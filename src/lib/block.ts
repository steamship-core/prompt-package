import { ITag } from './tag.js';

export interface IBlock {
  id?: string;
  fileId?: string;
  text?: string;
  tags?: ITag[];
}
