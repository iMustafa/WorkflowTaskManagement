import axios from "axios";
import { IWorkflow, ICreateWorkflowPayload } from "../interfaces/workflow.interface";

const BASE_URL = "http://localhost:3000"

export const GetWorkflows = async (): Promise<IWorkflow[]> => {
  try {
    const req = await axios
      .get(`${BASE_URL}/api/workflows`, { headers: { Authorization: localStorage.getItem('token') } });

    const { data }: { data: IWorkflow[] } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const CreateWorkflow = async (payload: ICreateWorkflowPayload): Promise<IWorkflow> => {
  try {
    const req = await axios
      .post(`${BASE_URL}/api/workflows`, payload, { headers: { Authorization: localStorage.getItem('token') } });

    const { data }: { data: IWorkflow } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const GetWorkflowTasks = async (id: string): Promise<any> => {
  try {
    const req = await axios
      .get(`${BASE_URL}/api/workflows/${id}/tasks`, { headers: { Authorization: localStorage.getItem('token') } });

    const { data } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e)
  }
}
