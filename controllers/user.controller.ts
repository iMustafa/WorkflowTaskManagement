import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

/**
 * Fetches logged in user account's users
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Array of user documents
 */
 export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const account = req.res.locals.account._id
    const users = await User.find({account}).exec();
    
    res.status(200).json(users);
  } catch(e) {
    res.status(500).json(e);
  }
};
