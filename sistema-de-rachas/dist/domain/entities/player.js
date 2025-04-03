"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(params) {
        var _a;
        this.id = params.id;
        this.name = params.name;
        this.stars = (_a = params.stars) !== null && _a !== void 0 ? _a : 0;
        this.position = params.position;
    }
    isPaid(match) {
        return !!match.paymentListPlayers.find((paymentPlayerId) => paymentPlayerId === this.id);
    }
}
exports.Player = Player;
