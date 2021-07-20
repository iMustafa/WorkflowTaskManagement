import { IAddTaskPayload } from "../../interfaces/task.interface";


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
})