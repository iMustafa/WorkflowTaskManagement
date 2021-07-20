
import { SHOW_CREATE_TASK_MODAL_ACTION, HIDE_CREATE_TASK_MODAL_ACTION, ADD_TASK_ACTION, LOAD_TASKS_ACTION } from "../actions/tasks.actions";

interface ITaskState {
  show_create_modal: boolean;
  columns: any;
}

const INITIAL_STATE = {
  show_create_modal: false,
  columns: {
    loading: {
      id: "loading",
      list: []
    }
  }
}

type TaskActions = SHOW_CREATE_TASK_MODAL_ACTION | HIDE_CREATE_TASK_MODAL_ACTION | ADD_TASK_ACTION | LOAD_TASKS_ACTION;

const TaskReducer = (state: ITaskState = INITIAL_STATE, action: TaskActions) => {
  switch (action.type) {
    case "SHOW_CREATE_TASK_MODAL":
      return { ...state, show_create_modal: true };
    case "HIDE_CREATE_TASK_MODAL":
      return { ...state, show_create_modal: false };
    case "LOAD_TASKS":
      return { ...state, columns: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.stage]: {
            ...state.columns[action.payload.stage],
            list: [
              ...state.columns[action.payload.stage].list,
              action.payload.task
            ]
          }
        }
      }
    default:
      return state;
  }
}

export default TaskReducer;
