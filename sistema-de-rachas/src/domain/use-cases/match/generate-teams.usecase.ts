import { uid } from 'uid';
import { Team } from '../../entities/team';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';
import { TeamCreatePresenter } from '../../../application/presenters/team.presenter';

export class GenerateTeamsByPlayerStarsUseCase {
  private static readonly repository: MatchRepository =
    new MatchMongoRepository(MatchModel);

  public static async execute(
    matchId: string,
    maxDifference: number = 1
  ): Promise<Either<HttpError, Array<Team>>> {
    const match = await GenerateTeamsByPlayerStarsUseCase.repository.findById(
      matchId
    );

    if (!match) {
      return left(
        new HttpError(HttpStatusCode.NOT_FOUND, 'Partida não encontrada.')
      );
    }

    const players = [...match.players];

    if (players.length < Team.minPlayers * 2) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `É necessário ter no mínimo: ${
            Team.minPlayers * 2
          } jogadores para criar 2 times!`
        )
      );
    }

    players.sort((a, b) => b.stars - a.stars);
    const playersQuantity = players.length;
    const teamQuantity = Math.floor(playersQuantity / Team.minPlayers);
    let teams = Array.from(
      { length: teamQuantity },
      (_, index) =>
        new Team({
          id: uid(),
          name: `Team ${index + 1}`,
          players: [],
        })
    );

    const distributePlayers = (
      remainingPlayers: typeof players,
      currentTeams: typeof teams,
      differenceLimit: number
    ): Array<Team> => {
      if (remainingPlayers.length === 0) {
        return currentTeams;
      }

      const player = remainingPlayers[0];
      let minTeam = currentTeams.reduce(
        (minTeam, currentTeam) =>
          currentTeam.totalStars < minTeam.totalStars ? currentTeam : minTeam,
        currentTeams[0]
      );

      minTeam.addPlayer(player);

      const minStars = Math.min(...currentTeams.map((team) => team.totalStars));
      const maxStars = Math.max(...currentTeams.map((team) => team.totalStars));

      if (maxStars - minStars > differenceLimit) {
        minTeam.removePlayer(player.id);
        return distributePlayers(
          remainingPlayers,
          currentTeams,
          differenceLimit + 1
        );
      }

      return distributePlayers(
        remainingPlayers.slice(1),
        currentTeams,
        differenceLimit
      );
    };

    teams = distributePlayers(players, teams, maxDifference);
    GenerateTeamsByPlayerStarsUseCase.repository.update(matchId, {
      teams: teams.map((team) => TeamCreatePresenter(team)),
    });
    return right(teams);
  }
}
