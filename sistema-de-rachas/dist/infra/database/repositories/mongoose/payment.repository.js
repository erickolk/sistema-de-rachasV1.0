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
exports.PaymentMongoRepository = void 0;
const payment_1 = require("../../../../domain/entities/payment");
const uid_1 = require("uid");
const domain_1 = require("../../../../domain");
const mongodb_1 = require("mongodb");
class PaymentMongoRepository {
    constructor(model) {
        this.model = model;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this.model
                .find()
                .populate('match')
                .populate('user')
                .exec();
            return documents.map(this.parseToEntity);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model
                .findById(id)
                .populate({
                path: 'match',
                populate: [
                    { path: 'schedules' },
                    { path: 'players' },
                    { path: 'user' },
                    { path: 'soccerField' },
                ],
            })
                .populate('user')
                .exec();
            return document ? this.parseToEntity(document) : null;
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentsSelected = yield this.model.aggregate([
                {
                    $lookup: {
                        from: 'matches',
                        localField: 'match',
                        foreignField: '_id',
                        as: 'match'
                    }
                },
                { $unwind: '$match' },
                {
                    $lookup: {
                        from: 'soccerfields',
                        localField: 'match.soccerField',
                        foreignField: '_id',
                        as: 'match.soccerField'
                    }
                },
                { $unwind: '$match.soccerField' },
                {
                    $match: {
                        'match.soccerField.user': new mongodb_1.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' }
            ]).exec();
            return paymentsSelected.map(this.parseToEntity);
        });
    }
    findByMatch(matchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model
                .findOne({ match: matchId })
                .populate({
                path: 'match',
                populate: [
                    { path: 'schedules' },
                    { path: 'players' },
                    { path: 'user' },
                    { path: 'soccerField' },
                ],
            })
                .populate('user')
                .exec();
            return document ? this.parseToEntity(document) : null;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = new this.model(data);
            const savedDocument = yield document.save();
            const populatedDocument = yield this.findById(savedDocument._id);
            return populatedDocument;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model
                .findByIdAndUpdate(id, payload, { new: true })
                .populate('match')
                .populate('user')
                .exec();
            return document ? this.parseToEntity(document) : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.model
                .findByIdAndDelete(id)
                .populate('match')
                .populate('user')
                .exec();
            return document ? this.parseToEntity(document) : null;
        });
    }
    parseToEntity(document) {
        console.log(document);
        if (!document) {
            throw new Error('Document is null');
        }
        const parseSchedule = (schedule) => {
            return new domain_1.Schedule({
                id: (schedule === null || schedule === void 0 ? void 0 : schedule._id) || (0, uid_1.uid)(),
                startTime: schedule.startTime,
                finishTime: schedule.finishTime,
                day: schedule.day,
            });
        };
        const parseSoccerField = (document) => {
            return new domain_1.SoccerField({
                id: (document === null || document === void 0 ? void 0 : document._id) || (0, uid_1.uid)(),
                name: document.name,
                pixKey: document.pixKey,
                rentalValue: document.rentalValue,
                workFinishTime: document.workFinishTime,
                workStartTime: document.workStartTime,
                workDays: document.workDays,
                user: parseUser(document.user),
            });
        };
        const parseMatch = (match) => {
            return new domain_1.Match({
                id: (match === null || match === void 0 ? void 0 : match._id) || (0, uid_1.uid)(),
                name: match.name,
                thumb: match.thumb,
                description: match.description,
                soccerField: parseSoccerField(match.soccerField),
                schedules: match.schedules.map(parseSchedule),
                players: match.players,
                user: match.user,
            });
        };
        const parseUser = (user) => {
            return new domain_1.User({
                id: (user === null || user === void 0 ? void 0 : user._id) || (0, uid_1.uid)(),
                name: (user === null || user === void 0 ? void 0 : user.name) || '',
                email: (user === null || user === void 0 ? void 0 : user.email) || '',
                role: (user === null || user === void 0 ? void 0 : user.role) || '',
                password: (user === null || user === void 0 ? void 0 : user.password) || '',
                photoUrl: (user === null || user === void 0 ? void 0 : user.photoUrl) || '',
            });
        };
        return new payment_1.Payment({
            id: (document === null || document === void 0 ? void 0 : document._id) || (0, uid_1.uid)(),
            paymentDate: document.paymentDate,
            paymentMethod: document.paymentMethod,
            amount: document.amount,
            discount: document.discount,
            totalAmountWithDiscount: document.totalAmountWithDiscount,
            match: parseMatch(document.match),
            user: parseUser(document.user),
        });
    }
}
exports.PaymentMongoRepository = PaymentMongoRepository;
