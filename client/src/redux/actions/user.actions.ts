import { IUser } from "../../interfaces/user.interfaces";

export type LOAD_ACCOUNT_USERS_ACTIONS = { type: "LOAD_ACCOUNT_USERS", payload: IUser[] };

export const LoadAccountUsers = (payload: IUser[]): LOAD_ACCOUNT_USERS_ACTIONS => ({
  type: "LOAD_ACCOUNT_USERS",
  payload
});
