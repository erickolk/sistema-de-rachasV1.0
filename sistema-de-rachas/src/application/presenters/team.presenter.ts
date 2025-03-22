import { CreateTeamDto, Team, TeamDto } from '../../domain';
import { PlayerPresenter } from './player.presenter';

export const TeamPresenter = (team: Team): TeamDto => {
  return {
    id: team.id,
    name: team.name,
    players: (team.players ?? []).map((player) => PlayerPresenter(player)),
    totalStars: team.totalStars,
  };
};

export const TeamCreatePresenter = (team: Team): CreateTeamDto => {
  return {
    name: team.name,
    players: (team.players ?? []).map((player) => PlayerPresenter(player)),
  };
};
