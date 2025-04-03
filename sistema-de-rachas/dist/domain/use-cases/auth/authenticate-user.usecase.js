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
exports.AutenticateUserUsecases = void 0;
const user_model_1 = require("../../../infra/database/mongose/models/user.model");
const user_respository_1 = require("../../../infra/database/repositories/mongoose/user.respository");
const either_1 = require("../../utils/either");
const http_status_code_1 = require("../../enums/http-status-code");
const http_error_1 = require("../../errors/http.error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_presenter_1 = require("../../../application/presenters/user.presenter");
const EnvSchema_1 = require("../../../infra/environment/EnvSchema");
const crypt_1 = require("../../utils/crypt");
class AutenticateUserUsecases {
    static execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findByEmail(payload.email);
            if (!user) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, 'Crendenciais inválidas'));
            }
            const isEqual = yield crypt_1.crypt.verify(payload.password, user.password);
            if (!isEqual) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, 'Crendenciais inválidas'));
            }
            const token = jsonwebtoken_1.default.sign((0, user_presenter_1.UserPresenter)(user), EnvSchema_1.env.JWT_SECRET);
            return (0, either_1.right)(token);
        });
    }
}
exports.AutenticateUserUsecases = AutenticateUserUsecases;
AutenticateUserUsecases.repository = new user_respository_1.UserMongoRespository(user_model_1.UserModel);
