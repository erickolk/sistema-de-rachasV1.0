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
exports.UpdateUserProfileUsecase = void 0;
const user_model_1 = require("../../../infra/database/mongose/models/user.model");
const user_respository_1 = require("../../../infra/database/repositories/mongoose/user.respository");
const http_status_code_1 = require("../../enums/http-status-code");
const http_error_1 = require("../../errors/http.error");
const either_1 = require("../../utils/either");
class UpdateUserProfileUsecase {
    static execute(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar o usuário atual primeiro
                const currentUser = yield this.repository.findById(userId);
                if (!currentUser) {
                    return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.NOT_FOUND, 'Usuário não encontrado'));
                }
                // Verificar se o e-mail está sendo alterado
                if (data.email && data.email !== currentUser.email) {
                    // Só verificar duplicação se o e-mail estiver mudando
                    const existingUser = yield this.repository.findByEmail(data.email);
                    if (existingUser) {
                        return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, 'Este e-mail já está em uso por outro usuário'));
                    }
                }
                // Atualizar o usuário
                const updatedUser = yield this.repository.update(userId, {
                    name: data.name,
                    email: data.email
                });
                if (!updatedUser) {
                    return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao atualizar o perfil'));
                }
                return (0, either_1.right)(updatedUser);
            }
            catch (error) {
                console.error('Erro ao atualizar perfil:', error);
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao atualizar o perfil'));
            }
        });
    }
}
exports.UpdateUserProfileUsecase = UpdateUserProfileUsecase;
UpdateUserProfileUsecase.repository = new user_respository_1.UserMongoRespository(user_model_1.UserModel);
