import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { connect, disconnect } from 'mongoose';
import { UserFactory } from '../../factories/user';
import { env } from '../../../infra/environment/EnvSchema';
import { AutenticateUserUsecases } from './authenticate-user.usecase';
import { RegisterUserUseCase } from './register-user.usecase';

describe('Test get user by token', () => {
  beforeAll(async () => {
    await connect(env.DB_URI);
  });

  afterAll(async () => {
    await disconnect();
  });

  it('verify if authenticate works with invalid credentials', async () => {
    const result = await AutenticateUserUsecases.execute({
      email: 'd9j19d129jd29dd-12j9d1-29si12-s9i12-s9@gmdas.com',
      password: '123912jd192d01s012s012js01js',
    });

    expect(result.isRight()).toBe(false);
  });

  it('verify if authenticate works with valid credentials', async () => {
    const user = UserFactory.createUser();
    const result = await RegisterUserUseCase.execute(user);

    const result2 = await AutenticateUserUsecases.execute({
      email: user.email,
      password: user.password,
    });

    expect(result2.isRight()).toBe(true);
  });
});
