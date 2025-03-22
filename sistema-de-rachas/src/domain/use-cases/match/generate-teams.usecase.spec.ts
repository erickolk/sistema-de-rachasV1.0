import { uid } from 'uid';
import { describe, expect, it } from 'vitest';

import { Match } from '../../entities/match';
import { Schedule } from '../../entities/schedule';
import { SoccerField } from '../../entities/soccer-field';
import { Team } from '../../entities/team';
import { playerFactory } from '../../factories/player';
import { UserFactory } from '../../factories/user';

const soccerField = new SoccerField({
  id: uid(),
  name: 'Campo de teste',
  pixKey: uid(),
  rentalValue: 300,
  workDays: ['sábado', 'domingo'],
  workFinishTime: '08:00:00',
  workStartTime: '18:00:00',
  user: UserFactory.createUser(),
});
const schedule = new Schedule({
  id: uid(),
  day: '10/02/2024',
  startTime: '10:30:00',
  finishTime: '16:30:00',
});

describe('Gerar times do racha', () => {
});
