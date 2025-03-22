import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { CreateUserDto } from '../../dto/user.dto';
import { User } from '../../entities/user';
import { Either, left, right } from '../../utils/either';
import { HttpStatusCode } from '../../enums/http-status-code';
import { HttpError } from '../../errors/http.error';
import { crypt } from '../../utils/crypt';

export class RegisterUserUseCase {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(
    payload: CreateUserDto
  ): Promise<Either<HttpError, User>> {
    const existsUser = await this.repository.findByEmail(payload.email);
    if (existsUser) {
      return left(
        new HttpError(HttpStatusCode.BAD_REQUEST, 'O e-mail já foi cadastrado!')
      );
    }
    const password = await crypt.hash(payload.password);
    const user = await RegisterUserUseCase.repository.register({
      ...payload,
      password,
      isMatchAdmin: false,
    });
    if (!user) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'User registration failed'
        )
      );
    }
    return right(user);
  }
}
