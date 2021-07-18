import { Document } from 'mongoose';

/**
 * Interface of a Workflow document.
 * @interface IWorkflowDocument
 * @extends {Document}
 */
export default interface IWorkflowDocument extends Document {
  name: string;
  stages: string[];
  account: string;
}

export interface IWorkflow {
  name: string;
  stages: string[];
  account: string;
}
