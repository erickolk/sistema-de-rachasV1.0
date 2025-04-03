"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = exports.teamSchema = void 0;
const mongoose_1 = require("mongoose");
const player_model_1 = require("./player.model");
exports.teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    players: [player_model_1.playerSchema],
    minPlayers: { type: Number, default: 6 },
    maxPlayers: { type: Number, default: 12 },
});
exports.TeamModel = (0, mongoose_1.model)('Team', exports.teamSchema);
