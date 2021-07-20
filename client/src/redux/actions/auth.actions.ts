import { ILoginUserResponse, IRegisterResponse } from "../../interfaces/auth.interfaces";

export type LOGIN_USER_ACTION = { type: "LOGIN_USER", payload: ILoginUserResponse };

export const LoginUserAction = (payload: ILoginUserResponse): LOGIN_USER_ACTION => ({
  type: "LOGIN_USER",
  payload
});

export type REGISTER_USER_ACTION = { type: "REGISTER_USER", payload: IRegisterResponse };

export const RegisterUserAction = (payload: IRegisterResponse): REGISTER_USER_ACTION => ({
  type: "REGISTER_USER",
  payload
});
