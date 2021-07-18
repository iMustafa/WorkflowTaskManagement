import request from "supertest";
import { readFileSync, writeFileSync } from "fs";
import { IWorkflow } from "../interfaces/IWorkflow";
import data from "./data";
import app from "../index";

export const WorkflowTests = () => {
  test("Should create a new workflow", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .post('/api/workflows')
      .set({ Authorization: `Bearer ${testObject.token}` })
      .send({ ...data.create_workflow, account: testObject.account._id });

    const { body }: { body: IWorkflow } = res;

    expect(body.account).toBe(testObject.account._id);
    expect(body.stages).toEqual(data.create_workflow.stages);

    writeFileSync("./token.json", JSON.stringify({ ...testObject, workflow: body }), 'utf-8');
  })

  test("Should get account workflows", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
    .get('/api/workflows')
    .set({ Authorization: `Bearer ${testObject.token}` });

    const { body }: { body: IWorkflow[] } = res;

    expect(body).toHaveLength(1);
    expect(body[0].name).toBe(testObject.workflow.name);
  })
}