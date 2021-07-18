import request from "supertest";
import { IUser, ILoginResponse, IRegisterResponse } from "../interfaces/IUserDocument";
import { writeFileSync, readFileSync } from "fs";
import data from "./data";
import app from "../index";

export const AuthTests = () => {
  test("Register an Account Owner", async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(data.create_account_owner);

    const { body }: { body: IRegisterResponse } = res;

    expect(body.user.name).toBe(data.create_account_owner.name);
    expect(body.user.email).toBe(data.create_account_owner.email);
    expect(body.user.password).not.toBe(data.create_account_owner.password);
    expect(body.account.name).toBe(data.create_account_owner.name);

    writeFileSync("./token.json", JSON.stringify({ account_owner: body.user, account: body.account }), 'utf-8');

  });

  test("Login a User", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .post('/api/auth/login')
      .send(data.login);

    const { body }: { body: ILoginResponse } = res;

    expect(body.user.name).toBe(data.create_account_owner.name);
    expect(body.user.email).toBe(data.create_account_owner.email);

    writeFileSync("./token.json", JSON.stringify({ ...testObject, token: body.token }), 'utf-8');
  });

  test("Get logged in user data", async () => {
    const { token } = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .get('/api/auth/me')
      .set({ "Authorization": `Bearer ${token}` });

    const { body }: { body: IUser } = res;
    expect(body.name).toBe(data.create_account_owner.name);
    expect(body.email).toBe(data.create_account_owner.email);
  });

  test("Should Register a User", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .post('/api/auth/register')
      .send(data.create_account_teammate);

    const { body }: { body: IRegisterResponse } = res;

    expect(body.user.name).toBe(data.create_account_teammate.name);
    expect(body.user.email).toBe(data.create_account_teammate.email);
    expect(body.user.password).not.toBe(data.create_account_teammate.password);

    writeFileSync("./token.json", JSON.stringify({ ...testObject, created_teammate: body.user }), 'utf-8');
  });

  test("Should Login as Teammate", async () => {
    const testObject = JSON.parse(readFileSync("./token.json").toString('utf-8'));

    const res = await request(app)
      .post('/api/auth/login')
      .send(data.login_teammate);

    const { body }: { body: ILoginResponse } = res;

    expect(body.user.name).toBe(data.create_account_teammate.name);
    expect(body.user.email).toBe(data.create_account_teammate.email);

    writeFileSync("./token.json", JSON.stringify({ ...testObject, teammate_token: body.token, created_teammate: body.user }), 'utf-8');
  });

}

