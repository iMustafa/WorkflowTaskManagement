import { IWorkflow } from "../../interfaces/workflow.interface";
import { LOAD_WORKFLOWS_ACTION, ADD_WORKFLOW_ACTION, SELECT_WORKFLOW_ACTION, SELECT_WORKFLOW_STAGE_ACTION } from "../actions/workflow.actions";

interface IWorkflowState {
  workflows: IWorkflow[];
  selected_workflow: number;
  selected_stage: string;
}

const INITIAL_STATE = {
  workflows: [],
  selected_workflow: 0,
  selected_stage: ""
};

type WorkflowActions = LOAD_WORKFLOWS_ACTION | ADD_WORKFLOW_ACTION | SELECT_WORKFLOW_ACTION | SELECT_WORKFLOW_STAGE_ACTION;

const WorkflowReducer = (state: IWorkflowState = INITIAL_STATE, action: WorkflowActions) => {
  switch (action.type) {
    case "ADD_WORKFLOW":
      return { ...state, workflows: [...state?.workflows, action.payload] };
    case "LOAD_WORKFLOWS":
      return { ...state, workflows: action.payload }
    case "SELECT_WORKFLOW":
      return { ...state, selected_workflow: action.payload }
    case "SELECT_WORKFLOW_STAGE":
      return { ...state, selected_stage: action.payload }
    default:
      return state;
  }
}

export default WorkflowReducer;
