"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const schedule_model_1 = require("./schedule.model");
const player_model_1 = require("./player.model");
const team_model_1 = require("./team.model");
const matchSchema = new mongoose_1.Schema({
    name: String,
    thumb: String,
    description: String,
    players: [player_model_1.playerSchema],
    schedules: [schedule_model_1.scheduleSchema],
    teams: [team_model_1.teamSchema],
    soccerField: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'SoccerField' },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    paid: { type: Boolean, default: false },
    payment: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Payment' },
});
matchSchema.pre('save', function (next) {
    console.log(`Salvando partida: ${JSON.stringify(this)}`);
    next();
});
matchSchema.post('find', function (docs) {
    docs.forEach((doc) => {
        console.log(`Partida encontrada: ${JSON.stringify(doc)}`);
    });
});
matchSchema.post('findOne', function (doc) {
    console.log(`Partida encontrada: ${JSON.stringify(doc)}`);
});
const MatchModel = (0, mongoose_1.model)('Match', matchSchema);
exports.default = MatchModel;
