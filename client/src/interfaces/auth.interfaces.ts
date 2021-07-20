import { IUser } from "./user.interfaces";
import { IAccount } from "./account.interface";

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  createAccount?: boolean;
}

export interface IRegisterResponse {
  user: IUser;
  account?: IAccount | string;
  token: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  user: IUser;
  token: string
}