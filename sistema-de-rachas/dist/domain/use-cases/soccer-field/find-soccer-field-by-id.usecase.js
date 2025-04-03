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
exports.FindSoccerFieldByIdUseCase = void 0;
const utils_1 = require("../../utils");
const http_error_1 = require("../../errors/http.error");
const enums_1 = require("../../enums");
const soccer_field_repository_1 = require("../../../infra/database/repositories/mongoose/soccer-field.repository");
const soccer_field_model_1 = __importDefault(require("../../../infra/database/mongose/models/soccer-field.model"));
class FindSoccerFieldByIdUseCase {
    static execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new soccer_field_repository_1.SoccerFieldMongoRepository(soccer_field_model_1.default);
                const soccerField = yield repository.findById(id);
                if (!soccerField) {
                    return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.NOT_FOUND, 'Campo de futebol não encontrado'));
                }
                return (0, utils_1.right)(soccerField);
            }
            catch (error) {
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao buscar campo de futebol'));
            }
        });
    }
}
exports.FindSoccerFieldByIdUseCase = FindSoccerFieldByIdUseCase;
