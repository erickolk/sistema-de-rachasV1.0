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
exports.RegisterPlayerUseCase = void 0;
const player_model_1 = __importDefault(require("../../../infra/database/mongose/models/player.model"));
const player_repository_1 = require("../../../infra/database/repositories/mongoose/player.repository");
const enums_1 = require("../../enums");
const http_error_1 = require("../../errors/http.error");
const utils_1 = require("../../utils");
class RegisterPlayerUseCase {
    static execute(playerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registredPlayer = yield RegisterPlayerUseCase.repository.create(playerDto);
                if (!registredPlayer) {
                    return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao registrar jogador'));
                }
                return (0, utils_1.right)(registredPlayer);
            }
            catch (error) {
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao registrar jogador'));
            }
        });
    }
}
exports.RegisterPlayerUseCase = RegisterPlayerUseCase;
RegisterPlayerUseCase.repository = new player_repository_1.PlayerMongoRepository(player_model_1.default);
