import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { connect, disconnect } from 'mongoose';
import { UserFactory } from '../../factories/user';
import { env } from '../../../infra/environment/EnvSchema';
import { RegisterUserUseCase } from './register-user.usecase';
import { AutenticateUserUsecases } from './authenticate-user.usecase';
import { GetUserInformationsUsecase } from './get-user-informations.usecase';
import jwt from 'jsonwebtoken';

describe('Test get user by token', () => {
  beforeAll(async () => {
    await connect(env.DB_URI);
  });

  afterAll(async () => {
    await disconnect();
  });

  it('verify if get user by token its work', async () => {
    const user = UserFactory.createUser();
    const result = await RegisterUserUseCase.execute({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      photoUrl: user.photoUrl,
    });

    expect(result.isRight()).toBe(true);

    if (result.isLeft()) throw Error('user is not been registred');

    const resultToken = await AutenticateUserUsecases.execute({
      email: result.value.email,
      password: user.password,
    });

    if (resultToken.isRight()) {
      const jwtPayload: any = jwt.verify(resultToken.value, env.JWT_SECRET);
      const result3 = await GetUserInformationsUsecase.execute(jwtPayload.id);
      expect(result3.isRight()).toBe(true);
      expect(jwtPayload.id).equals(result.value.id.toString());
    }
  });
});
