import { Schema, Model, model } from 'mongoose';
import IRoleMappingDocument from '../interfaces/IRoleMapping';

export const RoleMappingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  role: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, ref: "Account", required: true }
}, { timestamps: true });

export interface IRoleMappingModel extends Model<IRoleMappingDocument> { }

const RoleMappingModel = model<IRoleMappingDocument, IRoleMappingModel>("RoleMapping", RoleMappingSchema);

export default RoleMappingModel;
