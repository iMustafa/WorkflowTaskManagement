import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const api = Router();

api.get("/", userController.getAll);

export default api;