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
const date_1 = require("../../application/utils/date");
const get_soccer_field_available_times_1 = require("../use-cases/soccer-field/get-soccer-field-available-times");
const EnvSchema_1 = require("../../infra/environment/EnvSchema");
const mongoose_1 = require("mongoose");
(0, vitest_1.describe)('transformSchedulesToDateRange', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(EnvSchema_1.env.DB_URI);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.disconnect)();
    }));
    (0, vitest_1.it)('should transform schedules to date range correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const schedules = yield get_soccer_field_available_times_1.GetSoccerFieldAvailableTimes.execute('672b9da4e7c38a59ac49b17d');
        if (schedules.isLeft()) {
            return false;
        }
        // Chamando a função para transformar os horários
        const result = (0, date_1.transformSchedulesToDateRange)(schedules.value);
        // Verificação se o retorno contém as datas no formato esperado
        (0, vitest_1.expect)(result).toEqual([
            {
                startDate: '2024-11-05 10:00:00',
                finishDate: '2024-11-05 14:00:00',
            },
            {
                startDate: '2024-11-05 14:00:00',
                finishDate: '2024-11-05 21:00:00',
            },
        ]);
    }));
});
