import axios from "axios";
import { ILoginPayload, ILoginUserResponse, IRegisterPayload, IRegisterResponse } from "../interfaces/auth.interfaces";

const BASE_URL = "http://localhost:3000"

export const Register = async (payload: IRegisterPayload): Promise<IRegisterResponse> => {
  try {
    const req = await axios
      .post(`${BASE_URL}/api/auth/register`, payload)

    const { data }: { data: IRegisterResponse } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const Login = async (payload: ILoginPayload): Promise<ILoginUserResponse> => {
  try {
    const req = await axios
      .post(`${BASE_URL}/api/auth/login`, payload)

    const { data }: { data: ILoginUserResponse } = req;

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}
