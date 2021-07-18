import { Schema, Model, model } from 'mongoose';
import IUserDocument from '../interfaces/IUserDocument';

export const UserSchema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  createdAt: Number,
  password: String,
  account: {type: Schema.Types.ObjectId, ref: "account"}
}, { timestamps: true });

export interface IUserModel extends Model<IUserDocument> { }

const UserModel: IUserModel = model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;
