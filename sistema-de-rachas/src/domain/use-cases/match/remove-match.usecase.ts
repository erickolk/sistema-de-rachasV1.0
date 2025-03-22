import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class RemoveMatchUseCase {
  private static readonly repository: MatchRepository =
    new MatchMongoRepository(MatchModel);

  static async execute(id: string): Promise<Either<HttpError, string>> {
    try {
      const deletedSoccerField = await RemoveMatchUseCase.repository.delete(id);

      if (!deletedSoccerField) {
        return left(
          new HttpError(HttpStatusCode.NOT_FOUND, 'Partida não encontrado.')
        );
      }
      return right('Partida removido com sucesso');
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao remover partida'
        )
      );
    }
  }
}
