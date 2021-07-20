import { Router } from 'express';
import authorize  from "../middlewares/authorization";
import * as userController from '../controllers/user.controller';

const api = Router();

api.get("/", authorize("user"), userController.getAll);

export default api;