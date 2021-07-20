import { IAccount } from "../../interfaces/account.interface";
import { IUser } from "../../interfaces/user.interfaces";
import { LOGIN_USER_ACTION, REGISTER_USER_ACTION } from "../actions/auth.actions";

interface IUserState {
  token?: string;
  user?: IUser;
  account?: IAccount;
}

const INITIAL_STATE = {}

type AuthActions = LOGIN_USER_ACTION | REGISTER_USER_ACTION;

const AuthReducer = (state: IUserState = INITIAL_STATE, action: AuthActions) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    case "REGISTER_USER":
      return { ...state, ...action.payload };
    default:
      return state
  }
}

export default AuthReducer;
