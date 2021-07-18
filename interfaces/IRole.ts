import { Document } from 'mongoose';

/**
 * Interface of a Role document.
 * @interface IRoleDocument
 * @extends {Document}
 */
export default interface IRoleDocument extends Document {
  name: string;
  createdAt?: Number | Date;
}

export interface IRole {
  name: string;
  createdAt?: Number | Date;
}
