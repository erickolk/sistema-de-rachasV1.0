"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableTimesPresenter = void 0;
const schedule_presenter_1 = require("./schedule.presenter");
const AvailableTimesPresenter = (availableTimes) => {
    const mappedAvailableTimes = {};
    Object.keys(availableTimes).forEach((day) => {
        mappedAvailableTimes[day] = availableTimes[day].map((availableTime) => {
            return (0, schedule_presenter_1.SchedulePresenter)(availableTime);
        });
    });
    return mappedAvailableTimes;
};
exports.AvailableTimesPresenter = AvailableTimesPresenter;
