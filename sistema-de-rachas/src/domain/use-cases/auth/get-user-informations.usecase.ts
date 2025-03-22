import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { Either, left, right } from '../../utils/either';
import { HttpStatusCode } from '../../enums/http-status-code';
import { HttpError } from '../../errors/http.error';
import { User } from '../../entities';

export class GetUserInformationsUsecase {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(userId: string): Promise<Either<HttpError, User>> {
    const user = await this.repository.findById(userId);

    if (!user) {
      return left(
        new HttpError(HttpStatusCode.NOT_FOUND, 'Usuárion não encontrado')
      );
    }

    return right(user);
  }
}
