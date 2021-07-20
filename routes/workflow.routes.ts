import {Router} from "express";
import authorize  from "../middlewares/authorization";
import * as WorkflowController from "../controllers/workflow.controller";

const api = Router();

api.post('/', authorize("owner"), WorkflowController.create);

api.get('/', authorize("user"), WorkflowController.getAll);

api.get('/:id/tasks', authorize("user"), WorkflowController.getTasks);

export default api;
