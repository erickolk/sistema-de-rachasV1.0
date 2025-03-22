import { describe, expect, it } from 'vitest';

import { Time } from './time';
import { Match, Schedule, SoccerField, User } from '../entities';
import { UserRoleEnum } from '../enums';

describe('Testes da classe Time', () => {
  it.only('Validando conversão de time para numero', () => {
    const time = new Time('10:30:00');
    const time2 = new Time('12:30:00');

    expect(time.number).equals(10.5);
    expect(time2.number).equals(12.5);
  });

  it.only('Validando conversão de time para string', () => {
    const time = new Time('10:30:00');
    const time2 = new Time('12:30:00');

    expect(time.toString()).equals('10:30:00');
    expect(time2.toString()).equals('12:30:00');
  });

  it.only('Validando cálculo de totalHours', () => {
    const schedule = new Schedule({
      id: '1',
      startTime: '10:30:00',
      finishTime: '12:30:00',
      day: '2023-10-10',
    });

    expect(schedule.totalHours).equals(2);
  });

  it.only('Validando cálculo de totalHours de uma partida', () => {
    const user = new User({ id: '1', name: 'Usuário A', email: 'dasdsa', role: UserRoleEnum.OWNER, password: '123' })

    const soccerField = new SoccerField({
      id: '1',
      name: 'Campo A',
      pixKey: 'pixkey',
      rentalValue: 100,
      user,
      workDays: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
      workFinishTime: '22:00:00',
      workStartTime: '08:00:00',
    });

    const schedules = [
      new Schedule({
        id: '1',
        startTime: '10:00:00',
        finishTime: '12:00:00',
        day: '2023-10-10',
      }),
      new Schedule({
        id: '2',
        startTime: '14:00:00',
        finishTime: '16:00:00',
        day: '2023-10-10',
      }),
    ];

    const match = new Match({
      id: '1',
      name: 'Partida A',
      thumb: 'thumb.png',
      description: 'Descrição da Partida A',
      soccerField: soccerField,
      schedules: schedules,
      user
    });

    expect(match.totalHours).equals(4);
  });
});
