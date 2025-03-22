import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { Match } from '../../entities/match';
import { Either, left, right } from '../../utils/either';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums/http-status-code';

export class FindMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(MatchModel);

  static async execute(id: string): Promise<Either<HttpError, Match>> {
    try {
      const match = await FindMatchUseCase.repository.findById(id);

      if (!match) {
        return left(new HttpError(HttpStatusCode.NOT_FOUND, 'Partida não encontrada'));
      }

      return right(match);
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          error instanceof Error ? error.message : 'Erro ao buscar a partida'
        )
      );
    }
  }
}