import {Router} from "express";
import authorize  from "../middlewares/authorization";
import * as WorkflowController from "../controllers/workflow.controller";

const api = Router();

api.post('/', authorize("owner"), WorkflowController.create);

api.get('/', authorize("user"), WorkflowController.getAll);

export default api;
