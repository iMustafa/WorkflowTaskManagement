import { Document } from "mongoose";
import IAccount from "./IAccount";
import { IUser } from "./IUserDocument";

/**
 * Interface of a Task document.
 * @interface ITaskDocument
 * @extends {Document}
 */
export default interface ITaskDocument extends Document {
  name: string;
  description: string;
  assigner: IUser | string;
  assignee: IUser | string;
  stage: string;
  account: IAccount | string;
  workflow: string;
  createdAt?: Number | Date;
}

export interface ITask {
  name: string;
  description: string;
  assigner: IUser | string;
  assignee: IUser | string;
  stage: string;
  account: IAccount | string;
  workflow: string;
  createdAt?: Number | Date;
}
