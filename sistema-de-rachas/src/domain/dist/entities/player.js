"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.stars = params.stars ?? 0;
        this.position = params.position;
    }
    isPaid(match) {
        return !!match.paymentListPlayers.find((paymentPlayerId) => paymentPlayerId === this.id);
    }
}
exports.Player = Player;
