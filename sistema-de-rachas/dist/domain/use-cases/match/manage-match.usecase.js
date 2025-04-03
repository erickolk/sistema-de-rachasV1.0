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
exports.ManageMatchUseCase = void 0;
const either_1 = require("../../utils/either");
const http_error_1 = require("../../errors/http.error");
const http_status_code_1 = require("../../enums/http-status-code");
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const enums_1 = require("../../enums");
const player_position_1 = require("../../enums/player-position");
class ManageMatchUseCase {
    static createMatch(user, matchDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== enums_1.UserRoleEnum.CLIENT) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.FORBIDDEN, 'Apenas clientes podem criar partidas'));
            }
            const matchData = Object.assign(Object.assign({}, matchDetails), { createdBy: user.id, managers: [user.id] });
            const match = yield this.repository.create(matchData);
            if (!match) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Falha ao criar a partida'));
            }
            return (0, either_1.right)(match);
        });
    }
    static addManager(user, matchId, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield this.repository.findById(matchId);
            if (!match) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.NOT_FOUND, 'Partida não encontrada'));
            }
            if (match.createdBy !== user.id) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.FORBIDDEN, 'Apenas o criador da partida pode adicionar gerentes'));
            }
            match.managers.push(managerId);
            const matchUpdateData = Object.assign(Object.assign({}, match), { soccerField: match.soccerField.id, schedules: match.schedules.map(schedule => (Object.assign(Object.assign({}, schedule), { startTime: schedule.startTime.toString(), finishTime: schedule.finishTime.toString(), day: schedule.day.toISOString() }))), players: match.players.map(player => (Object.assign(Object.assign({}, player), { position: player.position || player_position_1.PlayerPositionsEnum.DEFAULT_POSITION }))), user: match.user.id });
            const updatedMatch = yield this.repository.update(matchId, matchUpdateData);
            if (!updatedMatch) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Falha ao atualizar a partida'));
            }
            return (0, either_1.right)(updatedMatch);
        });
    }
}
exports.ManageMatchUseCase = ManageMatchUseCase;
ManageMatchUseCase.repository = new match_repository_1.MatchMongoRepository(match_model_1.default);
