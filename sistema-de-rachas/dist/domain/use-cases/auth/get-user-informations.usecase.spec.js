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
const vitest_1 = require("vitest");
const mongoose_1 = require("mongoose");
const user_1 = require("../../factories/user");
const EnvSchema_1 = require("../../../infra/environment/EnvSchema");
const register_user_usecase_1 = require("./register-user.usecase");
const authenticate_user_usecase_1 = require("./authenticate-user.usecase");
const get_user_informations_usecase_1 = require("./get-user-informations.usecase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, vitest_1.describe)('Test get user by token', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(EnvSchema_1.env.DB_URI);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.disconnect)();
    }));
    (0, vitest_1.it)('verify if get user by token its work', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = user_1.UserFactory.createUser();
        const result = yield register_user_usecase_1.RegisterUserUseCase.execute({
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role,
            photoUrl: user.photoUrl,
        });
        (0, vitest_1.expect)(result.isRight()).toBe(true);
        if (result.isLeft())
            throw Error('user is not been registred');
        const resultToken = yield authenticate_user_usecase_1.AutenticateUserUsecases.execute({
            email: result.value.email,
            password: user.password,
        });
        if (resultToken.isRight()) {
            const jwtPayload = jsonwebtoken_1.default.verify(resultToken.value, EnvSchema_1.env.JWT_SECRET);
            const result3 = yield get_user_informations_usecase_1.GetUserInformationsUsecase.execute(jwtPayload.id);
            (0, vitest_1.expect)(result3.isRight()).toBe(true);
            (0, vitest_1.expect)(jwtPayload.id).equals(result.value.id.toString());
        }
    }));
});
