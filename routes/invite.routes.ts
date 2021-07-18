import {Router} from "express";
import * as InviteController from "../controllers/invites.controller";

const api = Router();

api.post('/', InviteController.create);

api.patch('/:id/respond', InviteController.respond);

api.get('/:id', InviteController.get);

export default api
