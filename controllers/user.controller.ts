import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

/**
 * Fetches all users
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
 export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({}).exec();
    res.status(200).json(users);
  } catch(e) {
    res.status(500).json(e);
  }
};
