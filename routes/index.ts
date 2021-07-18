import express from 'express';

import usersRouter from './user.routes';
import authRoutes from "./auth.routes";
import invitesRoutes from "./invite.routes";
import TaskRoutes from "./task.routes";
import WorkflowRoutes from "./workflow.routes";

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRoutes);
router.use('/invites', invitesRoutes);
router.use('/tasks', TaskRoutes);
router.use('/workflows', WorkflowRoutes);

export default router;
