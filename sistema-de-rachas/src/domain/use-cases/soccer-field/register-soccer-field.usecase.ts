import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { CreateSoccerFieldDto } from '../../dto/soccer-field.dto';
import { SoccerField } from '../../entities';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class RegisterSoccerFieldUseCase {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(
    SoccerFieldDto: CreateSoccerFieldDto
  ): Promise<Either<HttpError, SoccerField>> {
    try {
      const registredSoccerField =
        await RegisterSoccerFieldUseCase.repository.create(SoccerFieldDto);

      if (!registredSoccerField) {
        return left(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            'Erro ao registrar campo'
          )
        );
      }

      return right(registredSoccerField);
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao registrar campo'
        )
      );
    }
  }
}
