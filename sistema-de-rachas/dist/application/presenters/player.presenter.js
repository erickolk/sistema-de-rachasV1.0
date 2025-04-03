"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerPresenter = void 0;
const PlayerPresenter = (player) => {
    return {
        id: player.id,
        name: player.name,
        stars: player.stars,
        position: player.position,
    };
};
exports.PlayerPresenter = PlayerPresenter;
