import { Either, right, left } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { SoccerField } from '../../../domain/entities/soccer-field';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { Model } from 'mongoose';
import SoccerFieldModel, { SoccerFieldDocumentWithRelations } from '../../../infra/database/mongose/models/soccer-field.model';

export class FindSoccerFieldByIdUseCase {
  static async execute(id: string): Promise<Either<HttpError, SoccerField>> {
    try {
      const repository = new SoccerFieldMongoRepository(SoccerFieldModel);
      const soccerField = await repository.findById(id);

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
          'Erro ao buscar campo de futebol'
        )
      );
    }
  }
}
