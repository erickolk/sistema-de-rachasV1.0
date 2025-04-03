"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamCreatePresenter = exports.TeamPresenter = void 0;
const player_presenter_1 = require("./player.presenter");
const TeamPresenter = (team) => {
    var _a;
    return {
        id: team.id,
        name: team.name,
        players: ((_a = team.players) !== null && _a !== void 0 ? _a : []).map((player) => (0, player_presenter_1.PlayerPresenter)(player)),
        totalStars: team.totalStars,
    };
};
exports.TeamPresenter = TeamPresenter;
const TeamCreatePresenter = (team) => {
    var _a;
    return {
        name: team.name,
        players: ((_a = team.players) !== null && _a !== void 0 ? _a : []).map((player) => (0, player_presenter_1.PlayerPresenter)(player)),
    };
};
exports.TeamCreatePresenter = TeamCreatePresenter;
