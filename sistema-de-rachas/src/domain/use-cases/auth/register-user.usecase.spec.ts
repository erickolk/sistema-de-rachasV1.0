import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { connect, disconnect } from 'mongoose';
import { UserFactory } from '../../factories/user';
import { env } from '../../../infra/environment/EnvSchema';
import { RegisterUserUseCase } from './register-user.usecase';
describe('Test for register user use case', () => {
  beforeAll(async () => {
    await connect(env.DB_URI);
  });

  afterAll(async () => {
    await disconnect();
  });

  it('verify if register user it`s work', async () => {
    const user = UserFactory.createUser();
    const result = await RegisterUserUseCase.execute({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      photoUrl: user.photoUrl,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value?.email).toBe(user.email);
    }
  });
});
