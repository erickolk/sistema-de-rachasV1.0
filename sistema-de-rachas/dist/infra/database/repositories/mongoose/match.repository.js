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
exports.MatchMongoRepository = void 0;
const match_1 = require("../../../../domain/entities/match");
const player_1 = require("../../../../domain/entities/player");
const soccer_field_1 = require("../../../../domain/entities/soccer-field");
const schedule_1 = require("../../../../domain/entities/schedule");
const uid_1 = require("uid");
const domain_1 = require("../../../../domain");
const payment_model_1 = __importDefault(require("../../mongose/models/payment.model"));
const payment_repository_1 = require("./payment.repository");
const mongodb_1 = require("mongodb");
class MatchMongoRepository {
    constructor(model) {
        this.model = model;
        this.paymentRepository = new payment_repository_1.PaymentMongoRepository(payment_model_1.default);
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const matchs = yield this.model
                .find()
                .populate(['soccerField', 'players', 'schedules', 'teams'])
                .exec();
            const parsedMatches = yield Promise.all(matchs.map((match) => this.parseToEntity(match)));
            return parsedMatches.filter((match) => match !== null);
        });
    }
    unpaidMatchs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const matches = yield this.model
                .find({
                payment: { $exists: false },
                soccerField: { $ne: null }
            })
                .populate({
                path: 'soccerField',
                match: { user: userId }
            })
                .populate(['players', 'schedules', 'teams'])
                .exec();
            const parsedMatches = yield Promise.all(matches.map((match) => this.parseToEntity(match)));
            return parsedMatches.filter((match) => match !== null);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchData = Object.assign({}, data);
            const matchModel = new this.model(matchData);
            const match = yield matchModel.save();
            return this.findById(match._id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.model
                .findByIdAndUpdate(id, data, { new: true })
                .populate(['soccerField', 'players', 'schedules', 'teams'])
                .exec();
            if (!(updated === null || updated === void 0 ? void 0 : updated._id))
                return null;
            return this.parseToEntity(updated);
        });
    }
    createTeams(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.model
                .findByIdAndUpdate(id, data, { new: true })
                .populate(['soccerField', 'players', 'schedules', 'teams'])
                .exec();
            if (!(updated === null || updated === void 0 ? void 0 : updated._id))
                return null;
            return this.parseToEntity(updated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedMatch = yield this.model
                .findByIdAndDelete(id)
                .populate(['soccerField', 'players', 'schedules', 'teams'])
                .exec();
            if (!deletedMatch) {
                return null;
            }
            return this.parseToEntity(deletedMatch);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const match = yield this.model
                .findById(id)
                .populate(['soccerField', 'players', 'schedules', 'teams'])
                .exec();
            if (!match)
                throw Error('Partida não encontrada');
            if (!((_a = match.soccerField) === null || _a === void 0 ? void 0 : _a._id))
                throw Error('Campo não encontrado! Verifique as informações da partida.');
            if (!match.schedules.length)
                throw Error('Sem horários na partida');
            return this.parseToEntity(match);
        });
    }
    parseToEntities(matches) {
        return __awaiter(this, void 0, void 0, function* () {
            return matches.map((match) => new match_1.Match({
                id: match._id.toString(), // Converta o _id para string
                name: match.name,
                thumb: match.thumb,
                description: match.description,
                soccerField: match.soccerField,
                schedules: match.schedules,
                players: match.players || [],
                teams: match.teams || [],
                user: match.user,
                payment: match.payment,
            }));
        });
    }
    findUnpaidMatchesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unpaidMatches = yield this.model.aggregate([
                {
                    $lookup: {
                        from: 'payments',
                        localField: '_id',
                        foreignField: 'match',
                        as: 'payments',
                    },
                },
                {
                    $match: {
                        payments: { $size: 0 }
                    },
                },
                {
                    $lookup: {
                        from: 'soccerfields',
                        localField: 'soccerField',
                        foreignField: '_id',
                        as: 'soccerField',
                    },
                },
                {
                    $unwind: {
                        path: '$soccerField',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $match: {
                        'soccerField.user': new mongodb_1.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: {
                        path: '$user',
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ]);
            console.log('Unpaid Matches (Raw Aggregation Result) ->', unpaidMatches);
            return this.parseToEntities(unpaidMatches);
        });
    }
    parseToEntity(match) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!((_a = match === null || match === void 0 ? void 0 : match.soccerField) === null || _a === void 0 ? void 0 : _a._id) ||
                !Array.isArray(match === null || match === void 0 ? void 0 : match.schedules) ||
                match.schedules.length === 0) {
                return null;
            }
            const payment = match._id
                ? yield this.paymentRepository.findByMatch(match._id.toString())
                : null;
            const parsePlayers = (players) => (players !== null && players !== void 0 ? players : []).map((player) => new player_1.Player({
                id: player._id || (0, uid_1.uid)(),
                name: player.name,
                stars: player === null || player === void 0 ? void 0 : player.stars,
                position: player.position,
            }));
            const parseSoccerField = (soccerField) => {
                var _a;
                return new soccer_field_1.SoccerField({
                    id: (soccerField === null || soccerField === void 0 ? void 0 : soccerField._id) || (0, uid_1.uid)(),
                    name: soccerField.name,
                    pixKey: soccerField.pixKey,
                    rentalValue: soccerField.rentalValue,
                    workDays: (_a = soccerField === null || soccerField === void 0 ? void 0 : soccerField.workDays) !== null && _a !== void 0 ? _a : [],
                    workStartTime: soccerField.workStartTime,
                    workFinishTime: soccerField.workFinishTime,
                    user: parseUser(soccerField.user),
                });
            };
            const parseSchedules = (schedules) => schedules.map((schedule) => new schedule_1.Schedule({
                id: schedule._id || (0, uid_1.uid)(),
                day: schedule.day,
                startTime: schedule.startTime,
                finishTime: schedule.finishTime,
            }));
            const parseUser = (user) => {
                var _a;
                return new domain_1.User({
                    id: (_a = user === null || user === void 0 ? void 0 : user._id) !== null && _a !== void 0 ? _a : (0, uid_1.uid)(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    password: user.password,
                    photoUrl: user.photoUrl,
                });
            };
            const parseTeams = (teams) => {
                return (teams !== null && teams !== void 0 ? teams : []).map((team) => {
                    var _a, _b;
                    return new domain_1.Team({
                        id: (_a = team === null || team === void 0 ? void 0 : team._id) !== null && _a !== void 0 ? _a : (0, uid_1.uid)(),
                        name: team.name,
                        players: (_b = parsePlayers(team.players)) !== null && _b !== void 0 ? _b : [],
                    });
                });
            };
            return new match_1.Match({
                id: match._id || (0, uid_1.uid)(),
                description: match.description,
                name: match.name,
                thumb: match.thumb,
                payment: !payment ? undefined : payment,
                players: parsePlayers(match.players),
                soccerField: parseSoccerField(match.soccerField),
                schedules: parseSchedules(match.schedules),
                teams: parseTeams(match.teams),
                user: parseUser(match.user),
            });
        });
    }
}
exports.MatchMongoRepository = MatchMongoRepository;
