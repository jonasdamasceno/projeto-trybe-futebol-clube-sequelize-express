import { IMatch, LeaderboardType } from '../Interfaces/matches/IMatch';

const calculateTotalHomeGames = (teamId: number, matches: IMatch[]): number => {
  const homeGames = matches.filter((match) => teamId === match.homeTeamId);
  return homeGames.length;
};

const calculateTotalAwayGames = (teamId: number, matches: IMatch[]): number => {
  const awayGames = matches.filter((match) => teamId === match.awayTeamId);
  return awayGames.length;
};

const calculateTotalHomeVictories = (
  teamId: number,
  matches: IMatch[]
): number => {
  const homeVictories = matches.filter(
    (match) =>
      match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals
  );
  return homeVictories.length;
};

const calculateTotalAwayVictories = (
  teamId: number,
  matches: IMatch[]
): number => {
  const awayVictories = matches.filter(
    (match) =>
      match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals
  );
  return awayVictories.length;
};

const calculateTotalHomeLosses = (
  teamId: number,
  matches: IMatch[]
): number => {
  const homeLosses = matches.filter(
    (match) =>
      match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals
  );
  return homeLosses.length;
};

const calculateTotalAwayLosses = (
  teamId: number,
  matches: IMatch[]
): number => {
  const awayLosses = matches.filter(
    (match) =>
      match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals
  );
  return awayLosses.length;
};

const calculateTotalHomeDraws = (teamId: number, matches: IMatch[]): number => {
  const homeDraws = matches.filter(
    (match) =>
      match.homeTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals
  );
  return homeDraws.length;
};

const calculateTotalAwayDraws = (teamId: number, matches: IMatch[]): number => {
  const awayDraws = matches.filter(
    (match) =>
      match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals
  );
  return awayDraws.length;
};

const calculateTotalHomePoints = (
  teamId: number,
  matches: IMatch[]
): number => {
  const homeDraws = calculateTotalHomeDraws(teamId, matches) * 1;
  const homeVictories = calculateTotalHomeVictories(teamId, matches) * 3;
  const totalPoints = homeDraws + homeVictories;
  return totalPoints;
};

const calculateTotalAwayPoints = (
  teamId: number,
  matches: IMatch[]
): number => {
  const awayDraws = calculateTotalAwayDraws(teamId, matches) * 1;
  const awayVictories = calculateTotalAwayVictories(teamId, matches) * 3;
  const totalPoints = awayDraws + awayVictories;
  return totalPoints;
};

const calculateTotalAllPoints = (teamId: number, matches: IMatch[]): number => {
  const draws =
    (calculateTotalAwayDraws(teamId, matches) +
      calculateTotalHomeDraws(teamId, matches)) *
    1;
  const totalVictories =
    (calculateTotalHomeVictories(teamId, matches) +
      calculateTotalAwayVictories(teamId, matches)) *
    3;
  const totalPoints = draws + totalVictories;
  return totalPoints;
};

const calculateTotalHomeGoalsFor = (
  teamId: number,
  matches: IMatch[]
): number => {
  const homeGoals = matches.reduce((acc, curr) => {
    let sum = acc;
    if (curr.homeTeamId === teamId) {
      sum += curr.homeTeamGoals;
    }
    return sum;
  }, 0);
  return homeGoals;
};

const calculateTotalAwayGoalsFor = (
  teamId: number,
  matches: IMatch[]
): number => {
  const awayGoals = matches.reduce((acc, curr) => {
    let sum = acc;
    if (curr.awayTeamId === teamId) {
      sum += curr.awayTeamGoals;
    }
    return sum;
  }, 0);
  return awayGoals;
};

const calculateTotalHomeGoalsAgainst = (
  teamId: number,
  matches: IMatch[]
): number => {
  const goals = matches.reduce((acc, curr) => {
    let sum = acc;
    if (curr.homeTeamId === teamId) {
      sum += curr.awayTeamGoals;
    }
    return sum;
  }, 0);
  return goals;
};

const calculateTotalAwayGoalsAgainst = (
  teamId: number,
  matches: IMatch[]
): number => {
  const goals = matches.reduce((acc, curr) => {
    let sum = acc;
    if (curr.awayTeamId === teamId) {
      sum += curr.homeTeamGoals;
    }
    return sum;
  }, 0);
  return goals;
};

const calculateGoalsBalanceHome = (
  teamId: number,
  matches: IMatch[]
): number => {
  const goalsFor = calculateTotalHomeGoalsFor(teamId, matches);
  const goalsAgainst = calculateTotalHomeGoalsAgainst(teamId, matches);
  const goalsBalance = goalsFor - goalsAgainst;
  return goalsBalance;
};

const calculateGoalsBalanceAway = (
  teamId: number,
  matches: IMatch[]
): number => {
  const goalsFor = calculateTotalAwayGoalsFor(teamId, matches);
  const goalsAgainst = calculateTotalAwayGoalsAgainst(teamId, matches);
  const goalsBalance = goalsFor - goalsAgainst;
  return goalsBalance;
};

const calculateEfficiencyHome = (teamId: number, matches: IMatch[]): string => {
  const P = calculateTotalHomePoints(teamId, matches);
  const J = calculateTotalHomeGames(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

const calculateEfficiencyAway = (teamId: number, matches: IMatch[]): string => {
  const P = calculateTotalAwayPoints(teamId, matches);
  const J = calculateTotalAwayGames(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

const calculateTotalEfficiency = (
  teamId: number,
  matches: IMatch[]
): string => {
  const P =
    calculateTotalAwayPoints(teamId, matches) +
    calculateTotalHomePoints(teamId, matches);
  const J =
    calculateTotalAwayGames(teamId, matches) +
    calculateTotalHomeGames(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

const sortTeams = (teams: LeaderboardType[]): LeaderboardType[] => {
  teams.sort(
    (a, b) =>
      b.totalPoints - a.totalPoints ||
      b.goalsBalance - a.goalsBalance ||
      b.goalsFavor - a.goalsFavor
  );
  return teams;
};

export {
  calculateTotalHomeGames,
  calculateTotalAwayGames,
  calculateTotalHomeVictories,
  calculateTotalAwayVictories,
  calculateTotalHomeLosses,
  calculateTotalAwayLosses,
  calculateTotalHomeDraws,
  calculateTotalAwayDraws,
  calculateTotalHomePoints,
  calculateTotalAwayPoints,
  calculateTotalHomeGoalsFor,
  calculateTotalAwayGoalsFor,
  calculateTotalHomeGoalsAgainst,
  calculateTotalAwayGoalsAgainst,
  calculateGoalsBalanceHome,
  calculateGoalsBalanceAway,
  calculateEfficiencyHome,
  calculateEfficiencyAway,
  calculateTotalEfficiency,
  calculateTotalAllPoints,
  sortTeams,
};
