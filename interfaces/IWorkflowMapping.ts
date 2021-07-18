import { Document } from 'mongoose';
import { ITask } from './ITask';

/**
 * Interface of a WorkflowMapping document.
 * @interface IWorkflowMappingDocument
 * @extends {Document}
 */
export default interface IWorkflowMappingDocument extends Document {
  workflow: string;
  tasks: ITask[];
  stage: string;
  account: string;
}

export interface IWorkflowMapping {
  workflow: string;
  tasks: ITask[];
  stage: string;
  account: string;
}
