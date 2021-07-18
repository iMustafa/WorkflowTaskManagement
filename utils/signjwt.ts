import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../interfaces/IUserDocument";

dotenv.config();

const signJWT = async (user: IUser): Promise<String | Error> => {
  const timeNow = new Date().getTime();
  const ttl = timeNow + Number(process.env.TOKEN_TTL) * 100000;
  const expirationTime = Math.floor(ttl / 1000);

  try {
    const jsonwebtoken = jwt.sign(
      user,
      process.env.TOKEN_SECRET,
      {
        issuer: process.env.TOKEN_ISSUER,
        algorithm: 'HS256',
        expiresIn: expirationTime
      }
    )

    return Promise.resolve(jsonwebtoken);
  } catch (e) {
    return Promise.reject(e);
  }
}

export default signJWT;
