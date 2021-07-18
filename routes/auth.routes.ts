import {Router} from "express";
import authController from "../controllers/auth.controller";

const api = Router();

api.post('/register', authController.register);

api.post('/login', authController.login);

api.get('/me', authController.me);

export default api;
