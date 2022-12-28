import { Metadata } from './base.js';

export interface AddTaskCommentRequest {
  taskId?: string;
  externalId?: string;
  externalType?: string;
  externalGroup?: string;
  metadata?: Metadata;
}

export interface DeleteTaskCommentRequest {
  taskCommentId?: string;
}

export interface ListTaskCommentRequest {
  taskId?: string;
  externalId?: string;
  externalType?: string;
  externalGroup?: string;
}

export interface TaskCommentResponse {
  userId?: string;
  taskCommentId?: string;
  taskId?: string;
  externalId?: string;
  externalType?: string;
  externalGroup?: string;
  metadata?: Metadata;
  createdAt?: string;
}

export interface ListTaskCommentResponse {
  comments: TaskCommentResponse[];
}
