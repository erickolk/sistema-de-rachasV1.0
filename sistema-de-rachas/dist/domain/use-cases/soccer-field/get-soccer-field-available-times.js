"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSoccerFieldAvailableTimes = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const soccer_field_model_1 = __importDefault(require("../../../infra/database/mongose/models/soccer-field.model"));
const soccer_field_repository_1 = require("../../../infra/database/repositories/mongoose/soccer-field.repository");
const enums_1 = require("../../enums");
const http_error_1 = require("../../errors/http.error");
const utils_1 = require("../../utils");
const object_values_1 = require("../../object-values");
class GetSoccerFieldAvailableTimes {
    static execute(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availableTimes = yield GetSoccerFieldAvailableTimes.repository.getAvailableTimes(id, day);
                if (!availableTimes) {
                    return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao obter os horários disponíveis'));
                }
                return (0, utils_1.right)(availableTimes);
            }
            catch (error) {
                console.error(error);
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao obter os horários disponíveis'));
            }
        });
    }
    getAvailableIntervals(workTimes, occupiedTimes) {
        const availableTimes = [];
        workTimes.forEach((workInterval) => {
            let { startTime, finishTime } = workInterval;
            occupiedTimes.forEach((occupiedInterval) => {
                if (occupiedInterval.startTime.isBefore(finishTime) &&
                    occupiedInterval.finishTime.isAfter(startTime)) {
                    if (occupiedInterval.startTime.isAfter(startTime)) {
                        availableTimes.push({
                            startTime: startTime.toString(),
                            finishTime: occupiedInterval.startTime.toString(),
                        });
                    }
                    startTime = new object_values_1.Time(Math.max(occupiedInterval.finishTime.toSeconds(), startTime.toSeconds()).toString());
                }
            });
            if (startTime.isBefore(finishTime)) {
                availableTimes.push({
                    startTime: startTime.toString(),
                    finishTime: finishTime.toString(),
                });
            }
        });
        return availableTimes;
    }
    getWorkTimes(soccerField, currentDay) {
        const dayOfWeekIndex = (0, dayjs_1.default)(currentDay).day();
        const dayOfWeek = (0, utils_1.convertNumberToDayOfWeek)(dayOfWeekIndex);
        if (!soccerField.workDays.includes(dayOfWeek)) {
            return [];
        }
        let startTime = new object_values_1.Time(soccerField.workStartTime);
        const finishTime = new object_values_1.Time(soccerField.workFinishTime);
        const interval = 1;
        if (startTime.isAfter(finishTime)) {
            throw new Error('Horário de início não pode ser depois do horário de término.');
        }
        const workTimes = [];
        while (startTime.isBefore(finishTime)) {
            const nextTime = startTime.add('hours', interval);
            if (nextTime.isAfter(finishTime)) {
                workTimes.push({
                    startTime: new object_values_1.Time(startTime.toString()),
                    finishTime: new object_values_1.Time(finishTime.toString()),
                });
                break;
            }
            workTimes.push({
                startTime: new object_values_1.Time(startTime.toString()),
                finishTime: new object_values_1.Time(nextTime.toString()),
            });
            startTime = nextTime;
        }
        return workTimes;
    }
}
exports.GetSoccerFieldAvailableTimes = GetSoccerFieldAvailableTimes;
GetSoccerFieldAvailableTimes.repository = new soccer_field_repository_1.SoccerFieldMongoRepository(soccer_field_model_1.default);
