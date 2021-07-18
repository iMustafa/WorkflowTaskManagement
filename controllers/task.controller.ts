import { Request, Response, NextFunction } from "express";
import { ITask } from "../interfaces/ITask";
import Task from "../models/task.model"
import Workflow from "../models/workflow.model";
import WorkflowMapping from "../models/workflow-mapping";

/**
 * Creates a Task
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Created task object
 */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = req.res.locals.account._id;
    const assigner = req.res.locals.user._id;
    const { workflow, stage, ..._task }: { workflow: string, stage: string, _task: Partial<ITask> } = req.body;

    const _workflow = await Workflow.findById(workflow);
    if (!_workflow)
      return res.status(400).send({ message: "Invalid workflow" });

    const { stages } = _workflow;
    if (!stages.includes(stage))
      return res.status(400).send({ message: "Invalid stage" });

    const task = await Task.create({ ..._task, assigner, stage, account, workflow });

    const _workflowMapping = await WorkflowMapping.findOne({ account, stage });

    if (!_workflowMapping) {
      await WorkflowMapping.create({
        account, stage, tasks: [task._id], workflow
      })
    } else {
      await _workflowMapping.update({ $push: { tasks: task._id } })
    }

    return res.status(201).send(task.toJSON());

  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e?.message });
  }
}

/**
 * Fetches a task by id
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} Task object
 */
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const account = req.res.locals.account._id;

  const _task = await Task.findById(id);

  if (_task.account.toString() != account.toString())
    return res.status(403).send({ message: "Unauthorized YOU HACKER!" });

  return res.status(200).send(_task);
}

/**
 * Updates a task
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const account = req.res.locals.account._id;

  if (req.body.stage)
    delete req.body.stage;

  const _task = await Task.findById(id);

  if (!_task)
    return res.status(400).send({ message: "Invalid task Id" });

  if (_task.account.toString() != account.toString())
    return res.status(403).send({ message: "Unauthorized" });

  const _taskUpdated = await Task.findByIdAndUpdate(id, req.body, { new: true });

  return res.status(200).send(_taskUpdated);
}

/**
 * Updates a task stage
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const updateStage = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const newStage = req.body.stage;
  const account = req.res.locals.account._id;

  const _task = await Task.findById(id);

  if (!_task)
    return res.status(400).send({ message: "Invalid task Id" });

  if (_task.account.toString() != account.toString())
    return res.status(403).send({ message: "Unauthorized" });

  const _newWorkflowMapping = await WorkflowMapping.findOne({ stage: newStage, account, workflow: _task.workflow });

  if (!_newWorkflowMapping)
    await WorkflowMapping.create({ stage: newStage, account, workflow: _task.workflow, tasks: [id] });
  else
    await _newWorkflowMapping.update({ $push: { tasks: id } })

  await WorkflowMapping.findOneAndUpdate({ account, workflow: _task.workflow, stage: _task.stage }, { $pull: { tasks: id } }, { new: true });

  const _taskUpdated = await Task.findByIdAndUpdate(id, { stage: newStage }, { new: true });

  return res.status(200).send(_taskUpdated);
}

/**
 * Deletes a task
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const account = req.res.locals.account._id;

  const _task = await Task.findById(id);

  if (!_task)
    return res.status(400).send({ message: "Invalid task Id" });

  if (_task.account.toString() != account.toString())
    return res.status(403).send({ message: "Unauthorized" });

  await WorkflowMapping.findOneAndUpdate({ account, workflow: _task.workflow, stage: _task.stage }, { $pull: { tasks: id } }, { new: true });

  await _task.delete();

  return res.status(201).send(true);
}
