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
exports.RegisterUserUseCase = void 0;
const user_model_1 = require("../../../infra/database/mongose/models/user.model");
const user_respository_1 = require("../../../infra/database/repositories/mongoose/user.respository");
const either_1 = require("../../utils/either");
const http_status_code_1 = require("../../enums/http-status-code");
const http_error_1 = require("../../errors/http.error");
const crypt_1 = require("../../utils/crypt");
class RegisterUserUseCase {
    static execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsUser = yield this.repository.findByEmail(payload.email);
            if (existsUser) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, 'O e-mail já foi cadastrado!'));
            }
            const password = yield crypt_1.crypt.hash(payload.password);
            const user = yield RegisterUserUseCase.repository.register(Object.assign(Object.assign({}, payload), { password, isMatchAdmin: false }));
            if (!user) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'User registration failed'));
            }
            return (0, either_1.right)(user);
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
RegisterUserUseCase.repository = new user_respository_1.UserMongoRespository(user_model_1.UserModel);
