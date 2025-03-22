import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { SoccerField } from '../../entities';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class FetchSoccerFieldUseCase {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(): Promise<Either<HttpError, Array<SoccerField>>> {
    try {
      const registredSoccerField =
        await FetchSoccerFieldUseCase.repository.all();

      return right(registredSoccerField);
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(HttpStatusCode.BAD_REQUEST, 'Erro ao obter campos')
      );
    }
  }
}
