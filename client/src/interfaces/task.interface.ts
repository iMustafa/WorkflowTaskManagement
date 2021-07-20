
export interface ITask {
  _id: string;
  name: string;
  description: string;
  assigner: string;
  assignee: string;
  account: string;
  workflow: string
  stage: string;
}

export interface ITaskPayload {
  name: string;
  description: string;
  workflow: string
  stage: string;
  assignee: string;
}

export interface IAddTaskPayload {
  task: ITask;
  stage: string;
}

export interface IUpdateTaskStagePayload {
  _id: string;
  stage: string;
}
