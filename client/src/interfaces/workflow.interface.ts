
export interface IWorkflow {
  _id: string;
  name: string;
  stages: string[];
  account: string;
}

export interface ICreateWorkflowPayload {
  name: string;
  stages: string[];
}
