"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const time_1 = require("../object-values/time");
class Schedule {
    constructor(params) {
        this.id = params.id;
        this.startTime = new time_1.Time(params.startTime);
        this.finishTime = new time_1.Time(params.finishTime);
        this.day = new Date(params.day);
    }
    get totalHours() {
        return Math.abs(this.finishTime.number - this.startTime.number);
    }
}
exports.Schedule = Schedule;
