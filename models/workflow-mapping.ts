import { Schema, Model, model } from 'mongoose';
import IWorkflowMappingDocument from '../interfaces/IWorkflowMapping';

export const WorkflowMappingSchema: Schema = new Schema({
  workflow: { type: Schema.Types.ObjectId, ref: "Workflow" },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  stage: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: true
});

export interface IWorkflowMappingModel extends Model<IWorkflowMappingDocument> { }

const WorkflowMappingModel = model<IWorkflowMappingDocument, IWorkflowMappingModel>("WorkflowMapping", WorkflowMappingSchema);

export default WorkflowMappingModel;
