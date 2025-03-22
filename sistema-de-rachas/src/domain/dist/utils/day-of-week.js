"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberToDayOfWeek = void 0;
const convertNumberToDayOfWeek = (dayOfWeek) => {
    const days = [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sábado',
    ];
    return days[dayOfWeek];
};
exports.convertNumberToDayOfWeek = convertNumberToDayOfWeek;
