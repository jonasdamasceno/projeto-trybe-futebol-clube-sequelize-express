import { Request, Response } from 'express';
import TeamService from '../services/Team.service';
import HTTPMap from '../utils/httpStatusMap';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const response = await this.teamService.getAllTeams();
    return res.status(HTTPMap(response.status)).json(response.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamService.getTeamById(Number(id));
    return res.status(HTTPMap(response.status)).json(response.data);
  }
}
