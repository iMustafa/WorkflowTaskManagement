import { Request, Response, NextFunction } from "express";
import RoleMapping from "../models/role-mapping.model";

const ROLES = {
  user: 0,
  owner: 1
}

const authorize = (role: string) => async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.res.locals.user?._id;

  if (!userId && role === "public")
    return next();
  else if (!userId)
    return res.status(401).send({ message: "Unauthorized" });


  const _roleObject = await RoleMapping.findOne({ user: userId })
    .populate("account");

  const _role = _roleObject.role;

  if (ROLES[_role] >= ROLES[role]) {
    req.res.locals.authorization = _role;
    req.res.locals.account = _roleObject.account;
    next();
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export default authorize;
