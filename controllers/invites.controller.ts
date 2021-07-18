import { Request, Response, NextFunction } from 'express';
import Invite from "../models/invite.model";
import RoleMapping from "../models/role-mapping.model";

/**
 * Create an ivite to join account
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Created Invite
 */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { reciever, account } = req.body;
  const sender = req.res.locals.user._id;

  const invite = await Invite.create({ reciever, account, sender, status: "pending" })

  return res.status(201).send(invite.toJSON());
}

/**
 * Returns an invite by Id
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Invite Object
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.res.locals.user._id

  const invite = await Invite.findById(id).populate([
    {
      path: "sender",
      select: ["_id", "name", "email"]
    },
    {
      path: "account",
      select: ["_id", "name"]
    }
  ]);

  if ((invite.sender as any)._id != userId && invite.reciever != userId)
    return res.status(401).send({ message: "Unauthorized" });

  return res.status(200).send(invite);
}

/**
 * Accepts or Declines an invite
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Invite Object
 */
export const respond = async (req: Request, res: Response, next: NextFunction) => {
  const recieverId = req.res.locals.user._id;
  const { status } = req.body;
  const { id } = req.params;

  const _invite = await Invite.findById(id);

  if (_invite.status !== "pending")
    return res.status(400).send({ message: "Unable to perform actions on this invite" });

  if (_invite.reciever != recieverId)
    return res.status(403).send({ message: "Unauthorized" });

  const updated = await Invite.findByIdAndUpdate(id, { status }, { new: true });

  await RoleMapping.create({ user: recieverId, account: _invite.account, role: "user" });

  return res.status(200).send(updated.toJSON());
}
