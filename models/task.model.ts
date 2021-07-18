import { Schema, Model, model } from 'mongoose';
import ITaskDocument from '../interfaces/ITask';

export const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stage: { type: String, required: true },
  assigner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  assignee: { type: Schema.Types.ObjectId, ref: "user", required: true },
  account: { type: Schema.Types.ObjectId, ref: "account", required: true },
  workflow: { type: Schema.Types.ObjectId, ref: "workflow", required: true }
}, {
  timestamps: true
});

export interface ITaskModel extends Model<ITaskDocument> { }

const TaskModel = model<ITaskDocument, ITaskModel>("Task", TaskSchema);

export default TaskModel;
