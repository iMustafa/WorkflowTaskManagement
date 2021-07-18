import { Schema, Model, model } from 'mongoose';
import IAccountDocument from '../interfaces/IAccount';

export const AccountSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "user" }
}, {
  timestamps: true
});

export interface IAccountModel extends Model<IAccountDocument> { }

const AccountModel = model<IAccountDocument, IAccountModel>("Account", AccountSchema);

export default AccountModel;
