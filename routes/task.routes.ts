import {Router} from "express";
import authorize  from "../middlewares/authorization";
import * as TaskController from "../controllers/task.controller";

const api = Router();

api.post('/', authorize("user"), TaskController.create);

api.get('/:id', authorize("user"), TaskController.getById);

api.patch('/:id', authorize("user"), TaskController.update);

api.patch('/:id/stage', authorize("user"), TaskController.updateStage);

api.delete('/:id', authorize("owner"), TaskController.deleteTask);

export default api;
