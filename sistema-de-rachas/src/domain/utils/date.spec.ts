import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { transformSchedulesToDateRange } from '../../application/utils/date';
import { GetSoccerFieldAvailableTimes } from '../use-cases/soccer-field/get-soccer-field-available-times';
import { env } from '../../infra/environment/EnvSchema';
import { connect, disconnect } from 'mongoose';

describe('transformSchedulesToDateRange', () => {
  beforeAll(async () => {
    await connect(env.DB_URI);
  });

  afterAll(async () => {
    await disconnect();
  });

  it('should transform schedules to date range correctly', async () => {
    const schedules = await GetSoccerFieldAvailableTimes.execute(
      '672b9da4e7c38a59ac49b17d'
    );

    if (schedules.isLeft()) {
      return false;
    }

    // Chamando a função para transformar os horários
    const result = transformSchedulesToDateRange(schedules.value);

    // Verificação se o retorno contém as datas no formato esperado
    expect(result).toEqual([
      {
        startDate: '2024-11-05 10:00:00',
        finishDate: '2024-11-05 14:00:00',
      },
      {
        startDate: '2024-11-05 14:00:00',
        finishDate: '2024-11-05 21:00:00',
      },
    ]);
  });
});
