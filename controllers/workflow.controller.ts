import { NextFunction, Request, Response } from "express";
import { IWorkflow } from "../interfaces/IWorkflow";
import Workflow from "../models/workflow.model";

/**
 * Creates a Workflow
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Created workflow object
 */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  const account = req.res.locals.account._id;
  const {name, stages}: Partial<IWorkflow> = req.body;

  const _workflow = await Workflow.create({account, name, stages});

  return res.status(201).send(_workflow.toJSON());
}

/**
 * Returns logged in user Account's workflows
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Array of workflow objects
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const account = req.res.locals.account._id;

  const _workflows = await Workflow.find({account});

  return res.status(201).send(_workflows);
}
