"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const uid_1 = require("uid");
class Team {
    constructor(params) {
        this.id = (0, uid_1.uid)();
        this.name = params.name;
        this.players = params.players;
    }
    get totalStars() {
        return this.players.reduce((sum, player) => sum + player.stars, 0);
    }
    get isValid() {
        return (this.players.length >= Team.minPlayers &&
            this.players.length <= Team.maxPlayers);
    }
    get isComplete() {
        return this.players.length === Team.maxPlayers;
    }
    addPlayer(player) {
        if (this.isComplete) {
            throw new Error('O time já está completo!');
        }
        this.players.push(player);
    }
    removePlayer(playerId) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }
    editPlayer(playerId, newDetails) {
        const player = this.players.find((player) => player.id === playerId);
        if (player) {
            if (newDetails.name !== undefined)
                player.name = newDetails.name;
            if (newDetails.stars !== undefined)
                player.stars = newDetails.stars;
        }
    }
    getTeamInfo() {
        return {
            id: this.id,
            name: this.name,
            players: this.players,
        };
    }
}
exports.Team = Team;
Team.minPlayers = 6;
Team.maxPlayers = 12;
