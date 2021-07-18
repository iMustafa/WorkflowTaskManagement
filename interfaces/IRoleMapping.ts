import { Document } from 'mongoose';
import IUserDocument from './IUserDocument';
import IAccountDocument from './IAccount';

/**
 * Interface of a Role Mapping document.
 * @interface IRoleMappingDocument
 * @extends {Document}
 */
export default interface IRoleMappingDocument extends Document {
  role: string;
  user: IUserDocument | string;
  account: IAccountDocument | string;
  createdAt: Number | Date;
}

export interface IRoleMapping {
  role: string;
  user: IUserDocument | string;
  account: IAccountDocument | string;
  createdAt: Number | Date;
}
