import { combineReducers } from "redux";

import AuthReducer from "./auth.reducer";
import WorkflowReducer from "./workflow.reducer";
import TaskReducer from "./task.reducer";
import UserReducer from "./user.reducer";

export default combineReducers({
  auth: AuthReducer,
  workflow: WorkflowReducer,
  task: TaskReducer,
  user: UserReducer
})
