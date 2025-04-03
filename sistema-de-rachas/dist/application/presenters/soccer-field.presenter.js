"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySoccerFieldPresenter = exports.SoccerFieldPresenter = void 0;
const user_presenter_1 = require("./user.presenter");
const SoccerFieldPresenter = (soccerField) => {
    return {
        id: soccerField.id.toString(),
        name: soccerField.name,
        pixKey: soccerField.pixKey,
        rentalValue: soccerField.rentalValue,
        workDays: soccerField.workDays,
        workFinishTime: soccerField.workFinishTime.toString(),
        workStartTime: soccerField.workStartTime.toString(),
        user: (0, user_presenter_1.UserPresenter)(soccerField.user)
    };
};
exports.SoccerFieldPresenter = SoccerFieldPresenter;
const ArraySoccerFieldPresenter = (soccerFields) => {
    return soccerFields.map((soccerField) => (0, exports.SoccerFieldPresenter)(soccerField));
};
exports.ArraySoccerFieldPresenter = ArraySoccerFieldPresenter;
