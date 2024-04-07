import { ServiceResponse } from '../Interfaces/serviceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import { MatchInfos } from '../Interfaces/matches/MatchTypes';
import TeamService from './Team.service';

export default class MatchsService {
  constructor(
    private matchModel = new MatchModel(),
    private teamService = new TeamService(),
  ) {}

  async getAllMatchs(): Promise<ServiceResponse<IMatch[]>> {
    const matchs = await this.matchModel.findAll();
    if (!matchs) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };
    return { status: 'SUCCESSFUL', data: matchs };
  }

  async getFiltredMatchs(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matchsFiltred = await this.matchModel.findMatchsFiltred(query);
    return { status: 'SUCCESSFUL', data: matchsFiltred };
  }

  async updateProgress(
    id: number,
  ): Promise<ServiceResponse<{ message: 'Finished' }>> {
    try {
      await this.matchModel.patchInprogress(id);
      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    } catch (error) {
      throw new Error('Team not found');
    }
  }

  async updateScore(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ): Promise<ServiceResponse<{ message: 'ok' }>> {
    await this.matchModel.updateScore(homeTeamGoals, awayTeamGoals, id);
    return { status: 'SUCCESSFUL', data: { message: 'ok' } };
  }

  async create(matchInfos: MatchInfos): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = matchInfos;

    const teamExist1 = await this.teamService.getTeamById(Number(homeTeamId));
    const teamExist2 = await this.teamService.getTeamById(Number(awayTeamId));

    if (
      teamExist1.status === 'NOT_FOUND' || teamExist2.status === 'NOT_FOUND'
    ) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const team = await this.matchModel.create(matchInfos);
    return { status: 'CREATED', data: team };
  }
}
