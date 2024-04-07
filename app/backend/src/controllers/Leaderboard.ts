import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getAllHome(req: Request, res: Response) {
    const response = await this.leaderboardService.getAllLeaderHome();
    return res.status(200).json(response.data);
  }

  async getAllAway(req: Request, res: Response) {
    const response = await this.leaderboardService.getAllLeaderAway();
    return res.status(200).json(response.data);
  }

  async getAll(req: Request, res: Response) {
    const response = await this.leaderboardService.getAllLeaderbord();
    return res.status(200).json(response.data);
  }
}
