import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { Match } from '../../entities/match';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class FechUnpaidMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(userId: string): Promise<Either<HttpError, Array<Match>>> {
    try {
        const matchs = await FechUnpaidMatchUseCase.repository.unpaidMatchs(userId);

      if (!matchs.length) {
        return right([]);
      }

      return right(matchs);
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          error instanceof Error ? error.message : 'Erro ao buscar a partidas não pagas'
        )
      );
    }
  }
}
