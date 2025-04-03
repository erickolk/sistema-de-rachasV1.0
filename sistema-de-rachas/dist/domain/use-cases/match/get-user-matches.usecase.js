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
exports.GetUserMatchesUseCase = void 0;
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const http_error_1 = require("../../errors/http.error");
const utils_1 = require("../../utils");
const enums_1 = require("../../enums");
const soccer_field_repository_1 = require("../../../infra/database/repositories/mongoose/soccer-field.repository");
const soccer_field_model_1 = __importDefault(require("../../../infra/database/mongose/models/soccer-field.model"));
class GetUserMatchesUseCase {
    static execute(userId, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new match_repository_1.MatchMongoRepository(match_model_1.default);
                let matches;
                if (userType === 1) {
                    // owner
                    const soccerFieldRepository = new soccer_field_repository_1.SoccerFieldMongoRepository(soccer_field_model_1.default);
                    const ownerFields = yield soccerFieldRepository.allByUser(userId);
                    const fieldIds = ownerFields.map((field) => field.id);
                    matches = yield match_model_1.default.find({
                        soccerField: { $in: fieldIds },
                    })
                        .populate(['soccerField', 'schedules', 'players', 'teams'])
                        .exec();
                }
                else {
                    // client
                    matches = yield match_model_1.default.find({
                        user: userId,
                    })
                        .populate(['soccerField', 'schedules', 'players', 'teams'])
                        .exec();
                }
                const matchEntities = (yield Promise.all(matches.map((match) => repository.parseToEntity(match))))
                    .filter((match) => match !== null)
                    .sort((a, b) => {
                    const dateA = new Date(`${a.schedules[0].day} ${a.schedules[0].startTime}`);
                    const dateB = new Date(`${b.schedules[0].day} ${b.schedules[0].startTime}`);
                    return dateA.getTime() - dateB.getTime();
                });
                return (0, utils_1.right)(matchEntities);
            }
            catch (error) {
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao buscar partidas'));
            }
        });
    }
}
exports.GetUserMatchesUseCase = GetUserMatchesUseCase;
