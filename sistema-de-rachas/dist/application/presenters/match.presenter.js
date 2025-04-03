"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchsPresenter = exports.MatchPresenter = void 0;
const payment_presenter_1 = require("./payment.presenter");
const player_presenter_1 = require("./player.presenter");
const schedule_presenter_1 = require("./schedule.presenter");
const soccer_field_presenter_1 = require("./soccer-field.presenter");
const team_presenter_1 = require("./team.presenter");
const user_presenter_1 = require("./user.presenter");
const MatchPresenter = (match) => {
    var _a;
    if (!match)
        return match;
    return {
        id: match.id.toString(),
        name: match.name,
        description: match.description,
        thumb: match.thumb,
        players: match.players.map((player) => (0, player_presenter_1.PlayerPresenter)(player)),
        schedules: match.schedules.map((schedule) => (0, schedule_presenter_1.SchedulePresenter)(schedule)),
        soccerField: (0, soccer_field_presenter_1.SoccerFieldPresenter)(match.soccerField),
        teams: ((_a = match.teams) !== null && _a !== void 0 ? _a : []).map((team) => (0, team_presenter_1.TeamPresenter)(team)),
        user: (0, user_presenter_1.UserPresenter)(match.user),
        paid: match.isPaid,
        payment: match.payment ? (0, payment_presenter_1.PaymentPresenter)(match.payment) : undefined,
    };
};
exports.MatchPresenter = MatchPresenter;
const MatchsPresenter = (matchs) => {
    if (!matchs.length)
        return [];
    return matchs.filter(match => match !== null).map(match => (0, exports.MatchPresenter)(match));
};
exports.MatchsPresenter = MatchsPresenter;
