"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSchedulesToDateRange = exports.formatDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const formatDate = (date) => {
    const parsedDate = (0, dayjs_1.default)(date).utc();
    if (!parsedDate.isValid()) {
        return 'Invalid Date';
    }
    return parsedDate.format('DD/MM/YYYY');
};
exports.formatDate = formatDate;
const transformSchedulesToDateRange = (schedules) => {
    return schedules.map((schedule) => {
        // Combina a data e hora corretamente, levando em consideração o horário local
        const startDate = `${schedule.day} ${schedule.startTime}`;
        const finishDate = `${schedule.day} ${schedule.finishTime}`;
        // Retorna as datas no formato Date
        return {
            startDate, // Converte para o formato Date
            finishDate, // Converte para o formato Date
        };
    });
};
exports.transformSchedulesToDateRange = transformSchedulesToDateRange;
