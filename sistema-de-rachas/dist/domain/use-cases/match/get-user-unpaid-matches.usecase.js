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
exports.GetUserUnpaidMatchesUseCase = void 0;
const utils_1 = require("../../utils");
const http_error_1 = require("../../errors/http.error");
const enums_1 = require("../../enums");
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
class GetUserUnpaidMatchesUseCase {
    static execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const matchRepository = new match_repository_1.MatchMongoRepository(match_model_1.default);
                const matches = yield matchRepository.findUnpaidMatchesByUser(userId);
                if (!matches.length) {
                    return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.NOT_FOUND, 'Nenhuma partida não paga encontrada para o usuário.'));
                }
                return (0, utils_1.right)(matches);
            }
            catch (error) {
                console.error(`Erro ao buscar partidas não pagas: ${error}`);
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao buscar partidas não pagas'));
            }
        });
    }
}
exports.GetUserUnpaidMatchesUseCase = GetUserUnpaidMatchesUseCase;
