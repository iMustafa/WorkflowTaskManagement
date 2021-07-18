import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import signJWT from "../utils/signjwt";
import RoleMapping from "../models/role-mapping.model";
import User from "../models/user.model";
import Account from "../models/account.model";

/**
 * Creates a new user
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Registered User
 */
const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name, createAccount } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (createAccount) {
    const account = await Account.create({
      name,
      owner: user._id
    });
    await RoleMapping.create({account: account._id, user: user._id, role: "owner"});
    return res.status(201).json({ user: user.toJSON(), account: account.toJSON() });
  }

  return res.status(201).json({ user: user.toJSON() });

}

/**
 * logs in a user with email and password
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} ILoginResponse {token, user} 
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const _user = await User.findOne({ email }).exec();
  const isPasswordCorrect = await bcrypt.compare(password, _user.password);

  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Unauthorized" });

  const userObject = _user.toJSON();
  delete userObject.password;

  const token = await signJWT(userObject);

  return res.status(200).send({ token, user: userObject });
}

/**
 * returns logged in user data (Authorization Header)
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} ILoginResponse {token, user} 
 */
const me = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.res.locals;
  res.status(200).send(user)
}

export default {
  me,
  register,
  login
}