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
exports.RegisterMatchUseCase = void 0;
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const utils_1 = require("../../utils");
const http_error_1 = require("../../errors/http.error");
const enums_1 = require("../../enums");
class RegisterMatchUseCase {
    static execute(matchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const match = yield RegisterMatchUseCase.repository.create(matchDto);
                if (!match) {
                    return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.BAD_REQUEST, 'Erro ao registrar partida'));
                }
                return (0, utils_1.right)(match);
            }
            catch (error) {
                console.error(error);
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.BAD_REQUEST, error instanceof Error ? error.message : 'Erro ao registrar partida'));
            }
        });
    }
}
exports.RegisterMatchUseCase = RegisterMatchUseCase;
RegisterMatchUseCase.repository = new match_repository_1.MatchMongoRepository(match_model_1.default);
