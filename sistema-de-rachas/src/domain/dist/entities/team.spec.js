"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const player_1 = require("./player");
const team_1 = require("./team");
const uid_1 = require("uid");
(0, vitest_1.describe)('Testes relacionados ao Time', () => {
    (0, vitest_1.it)('Verificar se os jogadores foram adicionados ao time', () => {
        const player1 = new player_1.Player({ id: (0, uid_1.uid)(), name: 'João', stars: 2 });
        const player2 = new player_1.Player({ id: (0, uid_1.uid)(), name: 'Carlos', stars: 3 });
        const team = new team_1.Team({
            id: '123125',
            name: 'Os Incríveis',
            players: [player1],
        });
        team.addPlayer(player2);
        const players = team.players;
        (0, vitest_1.expect)(players.length).equals(2);
        (0, vitest_1.expect)(players).toContain(player1);
        (0, vitest_1.expect)(players).toContain(player2);
    });
    (0, vitest_1.it)('Verificar se os jogadores foram removidos do time', () => {
        const player1 = new player_1.Player({ id: (0, uid_1.uid)(), name: 'João', stars: 2 });
        const player2 = new player_1.Player({ id: (0, uid_1.uid)(), name: 'Carlos', stars: 3 });
        const team = new team_1.Team({
            id: '412314',
            name: 'Os Incríveis',
            players: [player1, player2],
        });
        team.removePlayer(player1.id);
        const players = team.players;
        (0, vitest_1.expect)(players.length).equals(1);
        (0, vitest_1.expect)(players).not.toContain(player1);
        (0, vitest_1.expect)(players).toContain(player2);
    });
    (0, vitest_1.it)('Verificar se as informações do jogador foram editadas', () => {
        const player = new player_1.Player({ id: (0, uid_1.uid)(), name: 'João', stars: 2 });
        const team = new team_1.Team({
            id: (0, uid_1.uid)(),
            name: 'Os Incríveis',
            players: [player],
        });
        team.editPlayer(player.id, { name: 'João Silva', stars: 5 });
        const updatedPlayer = team.players.find((p) => p.id === player.id);
        (0, vitest_1.expect)(updatedPlayer?.name).equals('João Silva');
        (0, vitest_1.expect)(updatedPlayer?.stars).equals(5);
    });
    (0, vitest_1.it)('Verificar se as informações do time estão corretas', () => {
        const player1 = new player_1.Player({ id: (0, uid_1.uid)(), name: 'João', stars: 2 });
        const player2 = new player_1.Player({ id: (0, uid_1.uid)(), name: 'Carlos', stars: 3 });
        const team = new team_1.Team({
            id: (0, uid_1.uid)(),
            name: 'Os Incríveis',
            players: [player1, player2],
        });
        const teamInfo = team.getTeamInfo();
        (0, vitest_1.expect)(teamInfo.name).equals('Os Incríveis');
        (0, vitest_1.expect)(teamInfo.players.length).equals(2);
        (0, vitest_1.expect)(teamInfo.players).toContain(player1);
        (0, vitest_1.expect)(teamInfo.players).toContain(player2);
    });
});
