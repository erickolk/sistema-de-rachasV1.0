import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { connect, disconnect } from 'mongoose';
import { UserFactory } from '../../factories/user';
import { env } from '../../../infra/environment/EnvSchema';
import { ManageMatchUseCase } from './manage-match.usecase';
import { UserRoleEnum } from '../../enums';

describe('Test for manage match use case', () => {
  beforeAll(async () => {
    await connect(env.DB_URI);
  });

  afterAll(async () => {
    await disconnect(); 
  });

  it('verify if create match works', async () => {
    const user = UserFactory.createUser({ role: UserRoleEnum.CLIENT });
    const matchDetails = {
      name: 'Test Match',
      description: 'Test Description',
      soccerField: 'Test Field',
      thumb: 'Test Thumb',
      user: user.id,
      schedules: [],
      players: [],
      teams: [],
    };

    const result = await ManageMatchUseCase.createMatch(user, matchDetails);

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value?.name).toBe(matchDetails.name);
    }
  });

  it('verify if add manager works', async () => {
    const user = UserFactory.createUser({ role: UserRoleEnum.CLIENT });
    const manager = UserFactory.createUser({ role: UserRoleEnum.CLIENT });
    const matchDetails = {
      name: 'Test Match',
      description: 'Test Description',
      soccerField: 'Test Field',
      thumb: 'Test Thumb',
      user: user.id,
      schedules: [],
      players: [],
      teams: [],
    };

    const createResult = await ManageMatchUseCase.createMatch(user, matchDetails);

    if (createResult.isRight()) {
      const matchId = createResult.value.id;
      const addManagerResult = await ManageMatchUseCase.addManager(user, matchId, manager.id);

      expect(addManagerResult.isRight()).toBe(true);

      if (addManagerResult.isRight()) {
        expect(addManagerResult.value?.managers).toContain(manager.id);
      }
    }
  });
});