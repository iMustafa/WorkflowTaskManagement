import { IWorkflow } from "../../interfaces/workflow.interface";

export type ADD_WORKFLOW_ACTION = { type: "ADD_WORKFLOW", payload: IWorkflow };

export const AddWorkFlowAction = (payload: IWorkflow): ADD_WORKFLOW_ACTION => ({
  type: "ADD_WORKFLOW",
  payload
});

export type LOAD_WORKFLOWS_ACTION = { type: "LOAD_WORKFLOWS", payload: IWorkflow[] };

export const LoadWorkflowsAction = (payload: IWorkflow[]): LOAD_WORKFLOWS_ACTION => ({
  type: "LOAD_WORKFLOWS",
  payload
})

export type SELECT_WORKFLOW_ACTION = { type: "SELECT_WORKFLOW", payload: number };

export const SelectWorkflowAction = (payload: number): SELECT_WORKFLOW_ACTION => ({
  type: "SELECT_WORKFLOW",
  payload
})

export type SELECT_WORKFLOW_STAGE_ACTION = { type: "SELECT_WORKFLOW_STAGE", payload: string };

export const SelectWorkflowStage = (payload: string): SELECT_WORKFLOW_STAGE_ACTION => ({
  type: "SELECT_WORKFLOW_STAGE",
  payload
})
