"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uid_1 = require("uid");
const vitest_1 = require("vitest");
const schedule_1 = require("../../entities/schedule");
const soccer_field_1 = require("../../entities/soccer-field");
const user_1 = require("../../factories/user");
const soccerField = new soccer_field_1.SoccerField({
    id: (0, uid_1.uid)(),
    name: 'Campo de teste',
    pixKey: (0, uid_1.uid)(),
    rentalValue: 300,
    workDays: ['sábado', 'domingo'],
    workFinishTime: '08:00:00',
    workStartTime: '18:00:00',
    user: user_1.UserFactory.createUser(),
});
const schedule = new schedule_1.Schedule({
    id: (0, uid_1.uid)(),
    day: '10/02/2024',
    startTime: '10:30:00',
    finishTime: '16:30:00',
});
(0, vitest_1.describe)('Gerar times do racha', () => {
});
