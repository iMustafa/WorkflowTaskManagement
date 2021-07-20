import { IUser } from "../../interfaces/user.interfaces";
import { LOAD_ACCOUNT_USERS_ACTIONS } from "../actions/user.actions";

interface IUserState {
  users?: IUser[]
}

const INITIAL_STATE = {};

type UserActions = LOAD_ACCOUNT_USERS_ACTIONS;

const UserReducer = (state: IUserState = INITIAL_STATE, action: UserActions) => {
  switch (action.type) {
    case "LOAD_ACCOUNT_USERS":
      return { ...state, users: action.payload }
    default:
      return state;
  }
}

export default UserReducer;
