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
exports.GetUserInformationsUsecase = void 0;
const user_model_1 = require("../../../infra/database/mongose/models/user.model");
const user_respository_1 = require("../../../infra/database/repositories/mongoose/user.respository");
const either_1 = require("../../utils/either");
const http_status_code_1 = require("../../enums/http-status-code");
const http_error_1 = require("../../errors/http.error");
class GetUserInformationsUsecase {
    static execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findById(userId);
            if (!user) {
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.NOT_FOUND, 'Usuárion não encontrado'));
            }
            return (0, either_1.right)(user);
        });
    }
}
exports.GetUserInformationsUsecase = GetUserInformationsUsecase;
GetUserInformationsUsecase.repository = new user_respository_1.UserMongoRespository(user_model_1.UserModel);
