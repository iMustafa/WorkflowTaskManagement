import request from "supertest";
import { readFileSync, writeFileSync } from "fs";
import { IInvite } from "../interfaces/Iinvite";
import app from "../index";

export const InvitesTests = () => {
  test("Creates an invite", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const { token } = testObject;
    const reciever = testObject.created_teammate._id;
    const account = testObject.account._id;

    const res = await request(app)
      .post('/api/invites')
      .set({ Authorization: `Bearer ${token}` })
      .send({ reciever, account })

    const { body }: { body: IInvite } = res;

    expect(body.account).toBe(account);
    expect(body.sender).toBe(testObject.account_owner._id);
    expect(body.reciever).toBe(testObject.created_teammate._id);

    writeFileSync("./token.json", JSON.stringify({ ...testObject, invite: body }), 'utf-8');
  });

  test("Should get an invite by ID", async () => {
    const { invite: { _id }, teammate_token } = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .get(`/api/invites/${_id}`)
      .set({ Authorization: `Bearer ${teammate_token}` });

    const { body }: { body: IInvite } = res;

    expect(body.status).toBe("pending");
  })

  test("Should Accept an invite", async () => {
    const { invite: { _id }, teammate_token } = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .patch(`/api/invites/${_id}/respond`)
      .set({ Authorization: `Bearer ${teammate_token}` })
      .send({ status: "accepted" })

    const { body }: { body: IInvite } = res;

    expect(body.status).toBe("accepted");
  })

}