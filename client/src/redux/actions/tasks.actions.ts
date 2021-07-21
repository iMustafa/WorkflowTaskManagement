import { IAlterTaskPayload, IAddTaskPayload, IUpdateTaskPayload, IDeleteTaskPayload } from "../../interfaces/task.interface";

export type SHOW_CREATE_TASK_MODAL_ACTION = { type: "SHOW_CREATE_TASK_MODAL" };

export const ShowCreateTaskModal = (): SHOW_CREATE_TASK_MODAL_ACTION => ({
  type: "SHOW_CREATE_TASK_MODAL",
})

export type HIDE_CREATE_TASK_MODAL_ACTION = { type: "HIDE_CREATE_TASK_MODAL" };

export const HideCreateTaskModal = (): HIDE_CREATE_TASK_MODAL_ACTION => ({
  type: "HIDE_CREATE_TASK_MODAL",
})


export type ADD_TASK_ACTION = { type: "ADD_TASK", payload: IAddTaskPayload };

export const AddTask = (payload: IAddTaskPayload): ADD_TASK_ACTION => ({
  type: "ADD_TASK",
  payload
})

export type LOAD_TASKS_ACTION = { type: "LOAD_TASKS", payload: any };

export const LoadTasks = (payload: any): LOAD_TASKS_ACTION => ({
  type: "LOAD_TASKS",
  payload
});

export type SHOW_EDIT_TASK_DIALOG_ACTION = { type: "SHOW_EDIT_TASK_DIALOG", payload: IAlterTaskPayload };

export const ShowEditTaskDialog = (payload: IAlterTaskPayload): SHOW_EDIT_TASK_DIALOG_ACTION => ({
  type: "SHOW_EDIT_TASK_DIALOG",
  payload
});

export type EDIT_TASK_ACTION = { type: "EDIT_TASK", payload: IUpdateTaskPayload };

export const EditTaskDispatcher = (payload: IUpdateTaskPayload): EDIT_TASK_ACTION => ({
  type: "EDIT_TASK",
  payload
});

export type SHOW_DELETE_TASK_DIALOG_ACTION = { type: "SHOW_DELETE_TASK_DIALOG", payload: IAlterTaskPayload };

export const ShowDeleteTaskDialog = (payload: IAlterTaskPayload): SHOW_DELETE_TASK_DIALOG_ACTION => ({
  type: "SHOW_DELETE_TASK_DIALOG",
  payload
});

export type CLOSE_DIALOGS = { type: "CLOSE_ALTERING_DIALOGS" };

export const CloseDialogs = (): CLOSE_DIALOGS => ({
  type: "CLOSE_ALTERING_DIALOGS"
})

export type DELETE_TASK_ACTION = { type: "DELETE_TASK", payload: IDeleteTaskPayload };

export const DeleteTaskDispatcher = (payload: IDeleteTaskPayload): DELETE_TASK_ACTION => ({
  type: "DELETE_TASK",
  payload
})
