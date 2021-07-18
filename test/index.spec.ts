import mongoose from "mongoose";
import { unlinkSync, writeFileSync } from "fs";
import { AuthTests } from "./auth.spec";
import { InvitesTests } from "./invites.spec";
import { TaskTests } from "./task.spec";
import { WorkflowTests } from "./workflow.spec";

const collections = ["rolemappings", "users", "accounts", "invites", "tasks", "workflows", "workflowmappings"];

writeFileSync("token.json", JSON.stringify({}), 'utf-8');

afterAll(async () => {
  try {
    await Promise.all(
      collections.map(collection => mongoose.connection.collections[collection]?.drop())
    )
    unlinkSync("./token.json");
  } catch (e) {
    console.log(e);
  }
});

describe("Auth Tests", AuthTests);
describe("Invites Tests", InvitesTests);
describe("Workflow Test", WorkflowTests);
describe("Tasks Test", TaskTests);
