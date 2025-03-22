"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const time_1 = require("./time");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
(0, vitest_1.describe)('Testes da classe Time', () => {
    vitest_1.it.only('Validando conversão de time para numero', () => {
        const time = new time_1.Time('10:30:00');
        const time2 = new time_1.Time('12:30:00');
        (0, vitest_1.expect)(time.number).equals(10.5);
        (0, vitest_1.expect)(time2.number).equals(12.5);
    });
    vitest_1.it.only('Validando conversão de time para string', () => {
        const time = new time_1.Time('10:30:00');
        const time2 = new time_1.Time('12:30:00');
        (0, vitest_1.expect)(time.toString()).equals('10:30:00');
        (0, vitest_1.expect)(time2.toString()).equals('12:30:00');
    });
    vitest_1.it.only('Validando cálculo de totalHours', () => {
        const schedule = new entities_1.Schedule({
            id: '1',
            startTime: '10:30:00',
            finishTime: '12:30:00',
            day: '2023-10-10',
        });
        (0, vitest_1.expect)(schedule.totalHours).equals(2);
    });
    vitest_1.it.only('Validando cálculo de totalHours de uma partida', () => {
        const user = new entities_1.User({ id: '1', name: 'Usuário A', email: 'dasdsa', role: enums_1.UserRoleEnum.OWNER, password: '123' });
        const soccerField = new entities_1.SoccerField({
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
            new entities_1.Schedule({
                id: '1',
                startTime: '10:00:00',
                finishTime: '12:00:00',
                day: '2023-10-10',
            }),
            new entities_1.Schedule({
                id: '2',
                startTime: '14:00:00',
                finishTime: '16:00:00',
                day: '2023-10-10',
            }),
        ];
        const match = new entities_1.Match({
            id: '1',
            name: 'Partida A',
            thumb: 'thumb.png',
            description: 'Descrição da Partida A',
            soccerField: soccerField,
            schedules: schedules,
            user
        });
        (0, vitest_1.expect)(match.totalHours).equals(4);
    });
});
