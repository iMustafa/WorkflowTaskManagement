import axios from "axios";

const BASE_URL = "http://localhost:3000"

export const GetUsers = async (): Promise<any> => {
  try {
    const req = await axios
      .get(`${BASE_URL}/api/users`, { headers: { Authorization: localStorage.getItem('token') } });

    const { data } = req;

    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e);
  }
}
