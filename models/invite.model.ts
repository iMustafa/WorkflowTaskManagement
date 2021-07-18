import { Schema, Model, model } from 'mongoose';
import IInviteDocument from '../interfaces/Iinvite';

export const InviteSchema: Schema = new Schema({
  reciever: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  status: {type: String, default: "pending"}
}, {
  timestamps: true
});

export interface IniveModel extends Model<IInviteDocument> { }

const InviteModel = model<IInviteDocument, IniveModel>("Invite", InviteSchema);

export default InviteModel;
