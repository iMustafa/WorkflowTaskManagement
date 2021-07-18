import request from "supertest";
import { readFileSync, writeFileSync } from "fs";
import data from "./data";
import app from "../index";
import { ITask } from "../interfaces/ITask";

export const TaskTests = () => {
  test("Should create a task in ToDo with an admin account", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));
    const { token } = testObject;
    const assignee = testObject.created_teammate._id;
    const workflow = testObject.workflow._id;
    const stage = testObject.workflow.stages[0];

    const res = await request(app)
      .post("/api/tasks")
      .set({ Authorization: `Bearer ${token}` })
      .send({ ...data.create_task, assignee, workflow, stage })

    const { body }: { body: ITask } = res;

    expect(body.workflow).toBe(testObject.workflow._id);
    expect(body.assigner).toBe(testObject.account_owner._id);
    expect(body.assignee).toBe(testObject.created_teammate._id);
    expect(body.stage).toBe(testObject.workflow.stages[0]);

    writeFileSync("./token.json", JSON.stringify({ ...testObject, task: body }), 'utf-8');
  });

  test("Should get a task by id", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));
    const { token, task: { _id } } = testObject;

    const res = await request(app)
      .get(`/api/tasks/${_id}`)
      .set({ Authorization: `Bearer ${token}` })

    const { body }: { body: ITask } = res;

    expect(body.assigner).toBe(testObject.account_owner._id);
    expect(body.assignee).toBe(testObject.created_teammate._id);
    expect(body.stage).toBe(testObject.workflow.stages[0]);
  });

  test("Should update a task by id", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));
    const { token, task: { _id } } = testObject;

    const res = await request(app)
      .patch(`/api/tasks/${_id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(data.update_task)

    const { body }: { body: ITask } = res;

    expect(body.name).toBe(data.update_task.name);
    expect(body.description).toBe(data.update_task.description);
  });

  test("Should update a task stage by id", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));
    const { token, task: { _id } } = testObject;

    const res = await request(app)
      .patch(`/api/tasks/${_id}/stage`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ stage: data.create_workflow.stages[1] })

    const { body }: { body: ITask } = res;

    expect(body.stage).toBe(data.create_workflow.stages[1]);
  });

  test("Should delete a task by id", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));
    const { token, task: { _id } } = testObject;

    const res = await request(app)
      .delete(`/api/tasks/${_id}`)
      .set({ Authorization: `Bearer ${token}` })

    const { body } = res;

    expect(body).toBe(true);
  });
}
