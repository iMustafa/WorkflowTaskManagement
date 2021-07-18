import { Document } from 'mongoose';
import { IAccount } from './IAccount';
import { IUser } from './IUserDocument';

/**
 * Interface of an Invite document.
 * @interface IInviteDocument
 * @extends {Document}
 */
export default interface IInviteDocument extends Document {
  sender: IUser;
  reciever: IUser | string;
  account: IAccount | string;
  status: string;
  createdAt?: Number | Date;
}

export interface IInvite {
  sender: IUser;
  reciever: IUser | string;
  account: IAccount | string;
  status: string;
  createdAt?: Number | Date;
}
