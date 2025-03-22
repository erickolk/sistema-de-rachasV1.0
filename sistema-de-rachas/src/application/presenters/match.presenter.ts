import { MatchDto } from '../../domain/dto/match.dto';
import { Match } from '../../domain/entities/match';
import { PaymentPresenter } from './payment.presenter';
import { PlayerPresenter } from './player.presenter';
import { SchedulePresenter } from './schedule.presenter';
import { SoccerFieldPresenter } from './soccer-field.presenter';
import { TeamPresenter } from './team.presenter';
import { UserPresenter } from './user.presenter';

export const MatchPresenter = (match: Match | null): MatchDto | null => {
  if (!match) return match;

  return {
    id: match.id.toString(),
    name: match.name,
    description: match.description,
    thumb: match.thumb,
    players: match.players.map((player) => PlayerPresenter(player)),
    schedules: match.schedules.map((schedule) => SchedulePresenter(schedule)),
    soccerField: SoccerFieldPresenter(match.soccerField),
    teams: (match.teams ?? []).map((team) => TeamPresenter(team)),
    user: UserPresenter(match.user),
    paid: match.isPaid,
    payment: match.payment ? PaymentPresenter(match.payment) : undefined,
  };
};


export const MatchsPresenter = (matchs: Match []): MatchDto[] | null => {
  if (!matchs.length) return [];
  return matchs.map(match => MatchPresenter(match))
};