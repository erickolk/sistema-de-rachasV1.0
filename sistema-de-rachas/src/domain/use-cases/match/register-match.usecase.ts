import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { CreateMatchDto } from '../../dto/match.dto';
import { Match } from '../../entities';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';

export class RegisterMatchUseCase {
  private static readonly repository: MatchRepository =
    new MatchMongoRepository(MatchModel);

  static async execute(
    matchDto: CreateMatchDto
  ): Promise<Either<HttpError, Match>> {
    try {
      const match = await RegisterMatchUseCase.repository.create(matchDto);

      if (!match) {
        return left(
          new HttpError(HttpStatusCode.BAD_REQUEST, 'Erro ao registrar partida')
        );
      }

      return right(match);
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.BAD_REQUEST,
          error instanceof Error ? error.message : 'Erro ao registrar partida'
        )
      );
    }
  }
}
