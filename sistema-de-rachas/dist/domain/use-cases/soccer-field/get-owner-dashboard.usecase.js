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
exports.GetOwnerDashboardUseCase = void 0;
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const soccer_field_model_1 = __importDefault(require("../../../infra/database/mongose/models/soccer-field.model"));
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const soccer_field_repository_1 = require("../../../infra/database/repositories/mongoose/soccer-field.repository");
const enums_1 = require("../../enums");
const http_error_1 = require("../../errors/http.error");
const utils_1 = require("../../utils");
class GetOwnerDashboardUseCase {
    static execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const soccerFieldRepository = new soccer_field_repository_1.SoccerFieldMongoRepository(soccer_field_model_1.default);
                const matchRepository = new match_repository_1.MatchMongoRepository(match_model_1.default);
                // Primeiro busca os campos do usuário
                const ownerFields = yield soccerFieldRepository.allByUser(userId);
                // Busca as partidas usando o modelo diretamente para garantir o populate
                const fieldIds = ownerFields.map((field) => field.id);
                const matches = yield match_model_1.default.find({
                    soccerField: { $in: fieldIds },
                })
                    .populate(['soccerField', 'schedules'])
                    .exec();
                return (0, utils_1.right)({
                    totalFields: ownerFields.length,
                    totalScheduledMatches: matches.length,
                    fields: ownerFields.map((field) => ({
                        name: field.name,
                        pixKey: field.pixKey,
                        rentalValue: field.rentalValue,
                        workStartTime: field.workStartTime.toString(),
                        workFinishTime: field.workFinishTime.toString(),
                    })),
                    upcomingMatches: matches
                        .sort((a, b) => new Date(a.schedules[0].day).getTime() -
                        new Date(b.schedules[0].day).getTime())
                        .map((match) => ({
                        name: match.name,
                        date: match.schedules[0].day,
                        startTime: match.schedules[0].startTime,
                        endTime: match.schedules[0].finishTime,
                        field: match.soccerField.name,
                    })),
                });
            }
            catch (error) {
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao buscar dados do dashboard'));
            }
        });
    }
}
exports.GetOwnerDashboardUseCase = GetOwnerDashboardUseCase;
