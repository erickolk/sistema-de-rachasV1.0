import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class RemoveSoccerFieldUsecase {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(id: string): Promise<Either<HttpError, string>> {
    try {
      const deletedSoccerField =
        await RemoveSoccerFieldUsecase.repository.delete(id);

      if (!deletedSoccerField) {
        return left(
          new HttpError(HttpStatusCode.NOT_FOUND, 'Campo não encontrado.')
        );
      }
      return right('Campo removido com sucesso');
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao remover campo'
        )
      );
    }
  }
}
