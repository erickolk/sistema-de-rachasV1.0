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
exports.FindMatchUseCase = void 0;
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const either_1 = require("../../utils/either");
const http_error_1 = require("../../errors/http.error");
const http_status_code_1 = require("../../enums/http-status-code");
class FindMatchUseCase {
    static execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const match = yield FindMatchUseCase.repository.findById(id);
                if (!match) {
                    return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.NOT_FOUND, 'Partida não encontrada'));
                }
                return (0, either_1.right)(match);
            }
            catch (error) {
                console.error(error);
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : 'Erro ao buscar a partida'));
            }
        });
    }
}
exports.FindMatchUseCase = FindMatchUseCase;
FindMatchUseCase.repository = new match_repository_1.MatchMongoRepository(match_model_1.default);
