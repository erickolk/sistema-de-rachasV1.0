"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
class Match {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.thumb = params.thumb;
        this.description = params.description;
        this.soccerField = params.soccerField;
        this.schedules = params.schedules;
        this.players = params.players || [];
        this.teams = params.teams || [];
        this.user = params.user;
        this.payment = params.payment;
        this.paymentListPlayers = [];
    }
    addPlayer(player) {
        this.players.push(player);
    }
    removePlayer(playerID) {
        const indexPlayer = this.players.findIndex((player) => player.id === playerID);
        if (indexPlayer !== -1) {
            this.players.splice(indexPlayer, 1);
        }
    }
    getPlayer(playerID) {
        return this.players.find((playerItem) => playerItem.id === playerID);
    }
    pay(playerID) {
        this.paymentListPlayers.push(playerID);
    }
    get totalHours() {
        return this.schedules.reduce((sum, schedule) => sum + schedule.totalHours, 0);
    }
    get amountToBePaidPerPlayer() {
        if (this.players.length === 0) {
            return 0;
        }
        return (this.totalHours * this.soccerField.rentalValue) / this.players.length;
    }
    get isPaid() {
        return !!this.payment;
    }
}
exports.Match = Match;
