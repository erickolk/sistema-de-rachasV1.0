"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSchema = void 0;
const mongoose_1 = require("mongoose");
const player_position_1 = require("../../../../domain/enums/player-position");
exports.playerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: false,
    },
    position: {
        type: String,
        enum: Object.values(player_position_1.PlayerPositionsEnum),
        required: false,
    },
});
const PlayerModel = (0, mongoose_1.model)('Player', exports.playerSchema);
exports.default = PlayerModel;
