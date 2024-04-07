import { Router, Request, Response } from 'express';
import TeamController from '../controllers/Team.controller';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', (req: Request, res: Response) =>
  teamController.getAllTeams(req, res));
teamRouter.get('/:id', (req: Request, res: Response) =>
  teamController.getTeamById(req, res));

export default teamRouter;
