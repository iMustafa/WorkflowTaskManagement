import { Schema, Model, model } from 'mongoose';
import IWorkflowDocument from '../interfaces/IWorkflow';

export const WorkflowSchema: Schema = new Schema({
  name: { type: String, required: true },
  stages: [{ type: String }],
  account: { type: Schema.Types.ObjectId, ref: "account", required: true }
}, {
  timestamps: true
});

export interface IWorkflowModel extends Model<IWorkflowDocument> { }

const WorkflowModel = model<IWorkflowDocument, IWorkflowModel>("Workflow", WorkflowSchema);

export default WorkflowModel;
