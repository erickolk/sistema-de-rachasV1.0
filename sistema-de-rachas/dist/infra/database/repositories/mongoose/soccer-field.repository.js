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
exports.SoccerFieldMongoRepository = void 0;
const soccer_field_1 = require("../../../../domain/entities/soccer-field");
const user_1 = require("../../../../domain/entities/user");
const match_model_1 = __importDefault(require("../../mongose/models/match.model"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const domain_1 = require("../../../../domain");
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(utc_1.default);
class SoccerFieldMongoRepository {
    constructor(model) {
        this.model = model;
    }
    getAvailableTimes(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDay = day !== null && day !== void 0 ? day : new Date().toISOString();
            const soccerField = yield this.model.findById(id).exec();
            if (!soccerField) {
                throw new Error('Campo de futebol não encontrado');
            }
            const matchs = yield match_model_1.default.find()
                .populate(['soccerField', 'players', 'schedules'])
                .find({
                schedules: {
                    $elemMatch: {
                        day: { $gte: new Date(currentDay).toISOString() },
                    },
                },
                soccerField: id,
            })
                .exec();
            const occupiedTimes = matchs
                .map((match) => {
                return match.schedules.map((schedule) => ({
                    startTime: new domain_1.Time(schedule.startTime),
                    finishTime: new domain_1.Time(schedule.finishTime),
                }));
            })
                .flat();
            const workTimes = this.getWorkTimes(soccerField, currentDay);
            const availableTimes = this.getAvailableIntervals(workTimes, occupiedTimes);
            return availableTimes;
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
                    startTime = new domain_1.Time(Math.max(occupiedInterval.finishTime.toSeconds(), startTime.toSeconds()).toString());
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
        const dayOfWeek = (0, domain_1.convertNumberToDayOfWeek)(dayOfWeekIndex);
        if (!soccerField.workDays.includes(dayOfWeek)) {
            return [];
        }
        let startTime = new domain_1.Time(soccerField.workStartTime);
        const finishTime = new domain_1.Time(soccerField.workFinishTime);
        const interval = 1;
        if (startTime.isAfter(finishTime)) {
            throw new Error('Horário de início não pode ser depois do horário de término.');
        }
        const workTimes = [];
        while (startTime.isBefore(finishTime)) {
            const nextTime = startTime.add('hours', interval);
            if (nextTime.isAfter(finishTime)) {
                workTimes.push({
                    startTime: new domain_1.Time(startTime.toString()),
                    finishTime: new domain_1.Time(finishTime.toString()),
                });
                break;
            }
            workTimes.push({
                startTime: new domain_1.Time(startTime.toString()),
                finishTime: new domain_1.Time(nextTime.toString()),
            });
            startTime = nextTime;
        }
        return workTimes;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerFields = yield this.model.find().populate(['user']).exec();
            return soccerFields.map((soccerField) => {
                return this.parseToEntity(soccerField);
            });
        });
    }
    allByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerFields = yield this.model
                .where('user')
                .equals(userId)
                .populate(['user'])
                .exec();
            return soccerFields.map((soccerField) => {
                return this.parseToEntity(soccerField);
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerField = yield this.model.findById(id).populate(['user']).exec();
            if (!soccerField)
                return null;
            return this.parseToEntity(soccerField);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerField = yield this.model.findOne({ name }).exec();
            if (!soccerField)
                return null;
            return this.parseToEntity(soccerField);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerField = new this.model(data);
            yield soccerField.save();
            if (!soccerField)
                return null;
            return this.parseToEntity(soccerField);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.model
                .findByIdAndUpdate(id, payload, { new: true })
                .populate(['user'])
                .exec();
            if (!updated)
                return null;
            return this.parseToEntity(updated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedSoccerField = yield this.model.findByIdAndDelete(id).exec();
            if (!deletedSoccerField) {
                return null;
            }
            return this.parseToEntity(deletedSoccerField);
        });
    }
    parseToEntity(document) {
        return new soccer_field_1.SoccerField({
            id: document._id,
            name: document.name,
            pixKey: document.pixKey,
            rentalValue: document.rentalValue,
            workFinishTime: document.workFinishTime,
            workStartTime: document.workStartTime,
            workDays: document.workDays,
            user: document.user
                ? new user_1.User({
                    email: document.user.email,
                    id: document.user._id,
                    name: document.user.name,
                    password: document.user.password,
                    photoUrl: document.user.photoUrl,
                    role: document.user.role,
                })
                : new user_1.User({
                    email: '',
                    id: '',
                    name: '',
                    password: '',
                    photoUrl: '',
                    role: 1,
                }),
        });
    }
}
exports.SoccerFieldMongoRepository = SoccerFieldMongoRepository;
