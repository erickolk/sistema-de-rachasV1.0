import { Match } from '../../../domain/entities/match';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';

export class GetUserUnpaidMatchesUseCase {
  static async execute(userId: string): Promise<Either<HttpError, Match[]>> {
    try {
      const matchRepository = new MatchMongoRepository(MatchModel);
      const matches = await matchRepository.findUnpaidMatchesByUser(userId);

      if (!matches.length) {
        return left(
          new HttpError(
            HttpStatusCode.NOT_FOUND,
            'Nenhuma partida não paga encontrada para o usuário.'
          )
        );
      }

      return right(matches);
    } catch (error) {
      console.error(`Erro ao buscar partidas não pagas: ${error}`);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao buscar partidas não pagas'
        )
      );
    }
  }
}
