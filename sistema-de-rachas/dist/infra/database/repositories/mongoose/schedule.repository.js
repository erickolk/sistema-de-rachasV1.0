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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleMongoRepository = void 0;
const schedule_1 = require("../../../../domain/entities/schedule");
const uid_1 = require("uid");
class ScheduleMongoRepository {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = yield this.model.findById(id).exec();
            if (!schedule)
                return null;
            return new schedule_1.Schedule({
                id: (schedule === null || schedule === void 0 ? void 0 : schedule.id) || (0, uid_1.uid)(),
                day: schedule.day,
                finishTime: schedule.finishTime,
                startTime: schedule.startTime,
            });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = yield this.model.findOne({ name }).exec();
            if (!schedule)
                return null;
            return new schedule_1.Schedule({
                id: schedule.id || (0, uid_1.uid)(),
                day: schedule.day,
                finishTime: schedule.finishTime,
                startTime: schedule.startTime,
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = new this.model(data);
            schedule.save();
            if (!(schedule === null || schedule === void 0 ? void 0 : schedule._id))
                return null;
            return new schedule_1.Schedule({
                id: schedule.id || (0, uid_1.uid)(),
                day: schedule.day,
                finishTime: schedule.finishTime,
                startTime: schedule.startTime,
            });
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = yield this.model
                .findByIdAndUpdate(id, payload, { new: true })
                .exec();
            if (!schedule)
                return null;
            return new schedule_1.Schedule({
                id: schedule.id || (0, uid_1.uid)(),
                day: schedule.day,
                finishTime: schedule.finishTime,
                startTime: schedule.startTime,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.model.findByIdAndDelete(id).exec();
        });
    }
}
exports.ScheduleMongoRepository = ScheduleMongoRepository;
