import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { SoccerField } from '../../../domain/entities/soccer-field';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';

export class UpdateSoccerFieldUseCase {
  static async execute(
    id: string,
    data: Partial<CreateSoccerFieldDto>
  ): Promise<Either<HttpError, SoccerField>> {
    try {
      const repository = new SoccerFieldMongoRepository(SoccerFieldModel);
      const soccerField = await repository.update(id, data);

      if (!soccerField) {
        return left(
          new HttpError(
            HttpStatusCode.NOT_FOUND,
            'Campo de futebol não encontrado'
          )
        );
      }

      return right(soccerField);
    } catch (error) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao atualizar campo de futebol'
        )
      );
    }
  }
}
