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
const vitest_1 = require("vitest");
const mongoose_1 = require("mongoose");
const user_1 = require("../../factories/user");
const EnvSchema_1 = require("../../../infra/environment/EnvSchema");
const manage_match_usecase_1 = require("./manage-match.usecase");
const enums_1 = require("../../enums");
(0, vitest_1.describe)('Test for manage match use case', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(EnvSchema_1.env.DB_URI);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.disconnect)();
    }));
    (0, vitest_1.it)('verify if create match works', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const user = user_1.UserFactory.createUser({ role: enums_1.UserRoleEnum.CLIENT });
        const matchDetails = {
            name: 'Test Match',
            description: 'Test Description',
            soccerField: 'Test Field',
            thumb: 'Test Thumb',
            user: user.id,
            schedules: [],
            players: [],
            teams: [],
        };
        const result = yield manage_match_usecase_1.ManageMatchUseCase.createMatch(user, matchDetails);
        (0, vitest_1.expect)(result.isRight()).toBe(true);
        if (result.isRight()) {
            (0, vitest_1.expect)((_a = result.value) === null || _a === void 0 ? void 0 : _a.name).toBe(matchDetails.name);
        }
    }));
    (0, vitest_1.it)('verify if add manager works', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const user = user_1.UserFactory.createUser({ role: enums_1.UserRoleEnum.CLIENT });
        const manager = user_1.UserFactory.createUser({ role: enums_1.UserRoleEnum.CLIENT });
        const matchDetails = {
            name: 'Test Match',
            description: 'Test Description',
            soccerField: 'Test Field',
            thumb: 'Test Thumb',
            user: user.id,
            schedules: [],
            players: [],
            teams: [],
        };
        const createResult = yield manage_match_usecase_1.ManageMatchUseCase.createMatch(user, matchDetails);
        if (createResult.isRight()) {
            const matchId = createResult.value.id;
            const addManagerResult = yield manage_match_usecase_1.ManageMatchUseCase.addManager(user, matchId, manager.id);
            (0, vitest_1.expect)(addManagerResult.isRight()).toBe(true);
            if (addManagerResult.isRight()) {
                (0, vitest_1.expect)((_a = addManagerResult.value) === null || _a === void 0 ? void 0 : _a.managers).toContain(manager.id);
            }
        }
    }));
});
