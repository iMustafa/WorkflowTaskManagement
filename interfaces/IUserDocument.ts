import { Document } from 'mongoose';
import { IAccount } from './IAccount';

/**
 * Interface of a Role Mapping document.
 * @interface IUserDocument
 * @extends {Document}
 */
export default interface IUserDocument extends Document {
  name: string;
  email: string;
  account: IAccount | string;
  createdAt?: Number;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  account: IAccount | string;
  createdAt?: Number;
  password?: string;
}

export interface IRegisterResponse {
  user: IUser;
  account?: IAccount;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}