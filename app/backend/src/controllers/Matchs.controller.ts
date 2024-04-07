import { Request, Response } from 'express';
import HTTPMap from '../utils/httpStatusMap';
import MatchsService from '../services/Matchs.service';

export default class MatchsController {
  constructor(private matchService = new MatchsService()) {}

  async getAllMatchs(req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatchs();
    return res.status(HTTPMap(status)).json(data);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.updateProgress(Number(id));
    return res.status(HTTPMap(response.status)).json(response.data);
  }

  async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.updateScore(
      Number(homeTeamGoals),
      Number(awayTeamGoals),
      Number(id),
    );
    return res.status(HTTPMap(response.status)).json(response.data);
  }

  async createMatch(req: Request, res: Response) {
    const response = await this.matchService.create(req.body);
    return res.status(HTTPMap(response.status)).json(response.data);
  }
}
