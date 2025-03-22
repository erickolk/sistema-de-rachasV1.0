import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { CreateMatchDto, MatchDto } from '../../dto/match.dto';
import { Match } from '../../entities';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, right, left } from '../../utils';

export class UpdateMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(
    id: string,
    matchDto: Partial<CreateMatchDto>
  ): Promise<Either<HttpError, Match>> {
    try {
      const updatedMatch = await UpdateMatchUseCase.repository.update(
        id,
        matchDto
      );

      if (!updatedMatch) {
        return left(
          new HttpError(HttpStatusCode.BAD_REQUEST, 'Erro ao atualizar partida')
        );
      }

      return right(updatedMatch);
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao atualizar partida'
        )
      );
    }
  }
}
