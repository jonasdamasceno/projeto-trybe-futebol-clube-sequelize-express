import { Router } from 'express';
import teamRouter from './Team.routes';
import loginRouter from './Login.routes';
import matchsRouter from './Matchs.routes';
import leaderRoutes from './Leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchsRouter);
router.use('/leaderboard', leaderRoutes);

export default router;
