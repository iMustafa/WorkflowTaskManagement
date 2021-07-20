import { NextFunction, Request, Response } from "express";
import { IWorkflow } from "../interfaces/IWorkflow";
import Workflow from "../models/workflow.model";
import WorkflowMapping from "../models/workflow-mapping";

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
  const { name, stages }: Partial<IWorkflow> = req.body;

  const _workflow = await Workflow.create({ account, name, stages });

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

  const _workflows = await Workflow.find({ account });

  return res.status(201).send(_workflows);
}

/**
 * Returns workflow tasks
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Array of Tasks objects
 */
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workflow = req.params.id;
    const _workflowMappings = await WorkflowMapping
      .find({ workflow })
      .populate({
        path: "tasks"
      })

    const _tasks = {};

    _workflowMappings.forEach(_workflowMapping => {
      const { stage, tasks } = _workflowMapping;
      _tasks[stage] = {
        id: stage,
        list: tasks
      };
    });

    return res.status(200).send(_tasks);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
}