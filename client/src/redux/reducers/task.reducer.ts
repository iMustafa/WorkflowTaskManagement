
import { ITask } from "../../interfaces/task.interface";
import {
  SHOW_CREATE_TASK_MODAL_ACTION,
  HIDE_CREATE_TASK_MODAL_ACTION,
  ADD_TASK_ACTION,
  LOAD_TASKS_ACTION,
  DELETE_TASK_ACTION,
  SHOW_EDIT_TASK_DIALOG_ACTION,
  EDIT_TASK_ACTION,
  SHOW_DELETE_TASK_DIALOG_ACTION,
  CLOSE_DIALOGS
} from "../actions/tasks.actions";

interface ITaskState {
  show_delete_dialog: boolean;
  show_create_dialog: boolean;
  show_edit_dialog: boolean;
  columns: any;
  altering_task?: ITask;
  altering_task_index: number;
}

const INITIAL_STATE = {
  show_create_dialog: false,
  show_edit_dialog: false,
  show_delete_dialog: false,
  altering_task_index: 0,
  columns: {
    loading: {
      id: "loading",
      list: []
    }
  }
}

type TaskActions = SHOW_CREATE_TASK_MODAL_ACTION |
  HIDE_CREATE_TASK_MODAL_ACTION |
  ADD_TASK_ACTION |
  LOAD_TASKS_ACTION |
  DELETE_TASK_ACTION |
  SHOW_EDIT_TASK_DIALOG_ACTION |
  EDIT_TASK_ACTION |
  SHOW_DELETE_TASK_DIALOG_ACTION |
  CLOSE_DIALOGS;

const TaskReducer = (state: ITaskState = INITIAL_STATE, action: TaskActions) => {
  switch (action.type) {
    case "SHOW_CREATE_TASK_MODAL":
      return { ...state, show_create_dialog: true };
    case "HIDE_CREATE_TASK_MODAL":
      return { ...state, show_create_dialog: false };
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
    case "SHOW_EDIT_TASK_DIALOG":
      return { ...state, show_edit_dialog: true, altering_task: action.payload.task, altering_task_index: action.payload.index };
    case "EDIT_TASK": {
      const _state = { ...state };
      const _list: ITask[] = _state.columns[action.payload.stage].list
      _list[state.altering_task_index] = { ..._list[state.altering_task_index], ...action.payload.task };
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.stage]: {
            id: action.payload.stage,
            list: _list
          }
        }
      };
    }
    case "SHOW_DELETE_TASK_DIALOG":
      return { ...state, show_delete_dialog: true, altering_task: action.payload.task, altering_task_index: action.payload.index };
    case "DELETE_TASK": {
      const _state = { ...state };
      const _list: ITask[] = _state.columns[action.payload.stage].list
      _list.splice(state.altering_task_index, 1);
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.stage]: {
            id: action.payload.stage,
            list: _list
          }
        }
      };
    }
    case "CLOSE_ALTERING_DIALOGS":
      return {
        ...state, show_edit_dialog: false, show_delete_dialog: false
      }
    default:
      return state;
  }
}

export default TaskReducer;
