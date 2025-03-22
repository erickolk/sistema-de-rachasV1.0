import { Either, left, right } from '../../utils/either';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums/http-status-code';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';
import { User } from '../../entities/user';
import { Match } from '../../entities/match';
import { UserRoleEnum } from '../../enums';
import { CreateMatchDto } from '../../dto/match.dto';
import { PlayerPositionsEnum } from '../../enums/player-position';

export class ManageMatchUseCase {
  private static repository = new MatchMongoRepository(MatchModel);

  static async createMatch(user: User, matchDetails: CreateMatchDto): Promise<Either<HttpError, Match>> {
    if (user.role !== UserRoleEnum.CLIENT) {
      return left(new HttpError(HttpStatusCode.FORBIDDEN, 'Apenas clientes podem criar partidas'));
    }

    const matchData = {
      ...matchDetails,
      createdBy: user.id,
      managers: [user.id],
    };

    const match = await this.repository.create(matchData);

    if (!match) {
      return left(new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Falha ao criar a partida'));
    }

    return right(match);
  }

  static async addManager(user: User, matchId: string, managerId: string): Promise<Either<HttpError, Match>> {
    const match = await this.repository.findById(matchId);

    if (!match) {
      return left(new HttpError(HttpStatusCode.NOT_FOUND, 'Partida não encontrada'));
    }

    if (match.createdBy !== user.id) {
      return left(new HttpError(HttpStatusCode.FORBIDDEN, 'Apenas o criador da partida pode adicionar gerentes'));
    }

    match.managers.push(managerId);
    const matchUpdateData: Partial<CreateMatchDto> = {
      ...match,
      soccerField: match.soccerField.id, // Assuming soccerField has an id property
      schedules: match.schedules.map(schedule => ({
        ...schedule,
        startTime: schedule.startTime.toString(), // Convert Time to string
        finishTime: schedule.finishTime.toString(), // Convert Time to string
        day: schedule.day.toISOString(), // Convert Date to string
      })),
      players: match.players.map(player => ({
        ...player,
        position: player.position || PlayerPositionsEnum.DEFAULT_POSITION, // Ensure position is not undefined
      })),
      user: match.user.id, // Ensure user is a string
    };
    const updatedMatch = await this.repository.update(matchId, matchUpdateData);

    if (!updatedMatch) {
      return left(new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Falha ao atualizar a partida'));
    }

    return right(updatedMatch);
  }
}
