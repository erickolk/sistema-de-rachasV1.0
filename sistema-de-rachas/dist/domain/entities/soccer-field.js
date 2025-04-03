"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerField = void 0;
const time_1 = require("../object-values/time");
class SoccerField {
    constructor(params) {
        console.log('params', params);
        this.id = params.id;
        this.name = params.name;
        this.rentalValue = params.rentalValue;
        this.pixKey = params.pixKey;
        this.workDays = params.workDays;
        this.workStartTime = new time_1.Time(params.workStartTime);
        this.workFinishTime = new time_1.Time(params.workFinishTime);
        this.user = params.user;
    }
}
exports.SoccerField = SoccerField;
