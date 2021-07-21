import axios from "axios";
import { ITask, ITaskPayload, IUpdateTaskStagePayload, IUpdateTaskPayload } from "../interfaces/task.interface";

const BASE_URL = "http://localhost:3000"

export const CreateTask = async (payload: ITaskPayload): Promise<ITask> => {
  try {
    const req = await axios
      .post(`${BASE_URL}/api/tasks`, payload, { headers: { Authorization: localStorage.getItem('token') } });

    const { data }: { data: ITask } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const UpdateTaskStage = async (payload: IUpdateTaskStagePayload): Promise<ITask> => {
  try {
    const { _id, stage } = payload;

    const req = await axios
      .patch(`${BASE_URL}/api/tasks/${_id}/stage`, { stage }, { headers: { Authorization: localStorage.getItem('token') } });

    const { data }: { data: ITask } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const UpdateTask = async (payload: IUpdateTaskPayload): Promise<ITask> => {
  try {
    const { _id, task } = payload;

    const req = await axios
      .patch(`${BASE_URL}/api/tasks/${_id}`, task, { headers: { Authorization: localStorage.getItem('token') } });

    const { data }: { data: ITask } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const DeleteTask = async (_id: string): Promise<boolean> => {
  const req = await axios
    .delete(`${BASE_URL}/api/tasks/${_id}`, { headers: { Authorization: localStorage.getItem('token') } });

  const { data }: { data: boolean } = req;

  return Promise.resolve(data);
}
