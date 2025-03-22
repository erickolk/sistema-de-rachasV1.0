"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const time_1 = require("../object-values/time");
(0, vitest_1.describe)('SoccerField', () => {
    (0, vitest_1.it)('should format time correctly', () => {
        const time = new time_1.Time('1:2:3');
        (0, vitest_1.expect)(time.toString()).toBe('01:02:03');
        const time2 = new time_1.Time('10:20:30');
        (0, vitest_1.expect)(time2.toString()).toBe('10:20:30');
    });
});
