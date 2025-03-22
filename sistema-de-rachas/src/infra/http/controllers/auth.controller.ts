import fastify, { FastifyReply, FastifyRequest } from 'fastify';

import { RegisterUserUseCase } from '../../../domain/use-cases/auth/register-user.usecase';
import { CreateUserDto, LoginDto } from '../../../domain/dto/user.dto';
import { UserPresenter } from '../../../application/presenters/user.presenter';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { AutenticateUserUsecases } from '../../../domain/use-cases/auth/authenticate-user.usecase';
import { GetUserInformationsUsecase } from '../../../domain/use-cases/auth/get-user-informations.usecase';
import { UpdateUserProfileUsecase } from '../../../domain/use-cases/auth/update-user-profile.usecase';

class AuthController {
  async me(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await GetUserInformationsUsecase.execute(user.id);

    if (result.isRight()) {
      return res.status(HttpStatusCode.OK).send(UserPresenter(result.value));
    }
  }

  async register(req: FastifyRequest, res: FastifyReply) {
    const result = await RegisterUserUseCase.execute(req.body as CreateUserDto);
    if (result.isLeft()) {
      res.status(result.value.code).send({
        message: result.value.message,
      });
    } else if (result.isRight() && result?.value) {
      res.status(HttpStatusCode.CREATED).send(UserPresenter(result.value));
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    const result = await AutenticateUserUsecases.execute(req.body as LoginDto);

    if (result.isLeft()) {
      res.status(result.value.code).send({
        message: result.value.message,
      });
    } else {
      res.status(HttpStatusCode.OK).send({ token: result.value });
    }
  }

  async updateProfile(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const { name, email } = req.body as { name: string; email: string };

    const result = await UpdateUserProfileUsecase.execute(user.id, { name, email });

    if (result.isLeft()) {
      return res.status(result.value.code).send({
        message: result.value.message,
      });
    }

    return res.status(HttpStatusCode.OK).send(UserPresenter(result.value));
  }
}

export default new AuthController();
