import { Document } from 'mongoose';
import { IUser } from './IUserDocument';

/**
 * Interface of an Account document.
 * @interface IAccountDocument
 * @extends {Document}
 */
export default interface IAccountDocument extends Document {
  name: string;
  owner: IUser | string;
}

export interface IAccount {
  name: string;
  owner: IUser | string;
}
