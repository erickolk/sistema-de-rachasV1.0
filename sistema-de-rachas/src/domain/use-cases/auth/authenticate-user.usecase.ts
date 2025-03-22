import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { LoginDto } from '../../dto/user.dto';
import { Either, left, right } from '../../utils/either';
import { HttpStatusCode } from '../../enums/http-status-code';
import { HttpError } from '../../errors/http.error';
import jwt from 'jsonwebtoken';
import { UserPresenter } from '../../../application/presenters/user.presenter';
import { env } from '../../../infra/environment/EnvSchema';
import { crypt } from '../../utils/crypt';

export class AutenticateUserUsecases {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(payload: LoginDto): Promise<Either<HttpError, string>> {
    const user = await this.repository.findByEmail(payload.email);

    if (!user) {
      return left(
        new HttpError(HttpStatusCode.BAD_REQUEST, 'Crendenciais inválidas')
      );
    }

    const isEqual = await crypt.verify(payload.password, user.password);

    if (!isEqual) {
      return left(
        new HttpError(HttpStatusCode.BAD_REQUEST, 'Crendenciais inválidas')
      );
    }

    const token = jwt.sign(UserPresenter(user), env.JWT_SECRET);

    return right(token);
  }
}
