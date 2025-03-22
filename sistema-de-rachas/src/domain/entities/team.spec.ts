import { describe, it, expect } from 'vitest';
import { Player } from './player';
import { Team } from './team';
import { uid } from 'uid';

describe('Testes relacionados ao Time', () => {
  it('Verificar se os jogadores foram adicionados ao time', () => {
    const player1 = new Player({ id: uid(), name: 'João', stars: 2 });
    const player2 = new Player({ id: uid(), name: 'Carlos', stars: 3 });
    const team = new Team({
      id: '123125',
      name: 'Os Incríveis',
      players: [player1],
    });

    team.addPlayer(player2);
    const players = team.players;

    expect(players.length).equals(2);
    expect(players).toContain(player1);
    expect(players).toContain(player2);
  });

  it('Verificar se os jogadores foram removidos do time', () => {
    const player1 = new Player({ id: uid(), name: 'João', stars: 2 });
    const player2 = new Player({ id: uid(), name: 'Carlos', stars: 3 });
    const team = new Team({
      id: '412314',
      name: 'Os Incríveis',
      players: [player1, player2],
    });

    team.removePlayer(player1.id);
    const players = team.players;

    expect(players.length).equals(1);
    expect(players).not.toContain(player1);
    expect(players).toContain(player2);
  });

  it('Verificar se as informações do jogador foram editadas', () => {
    const player = new Player({ id: uid(), name: 'João', stars: 2 });
    const team = new Team({
      id: uid(),
      name: 'Os Incríveis',
      players: [player],
    });

    team.editPlayer(player.id, { name: 'João Silva', stars: 5 });
    const updatedPlayer = team.players.find((p) => p.id === player.id);

    expect(updatedPlayer?.name).equals('João Silva');
    expect(updatedPlayer?.stars).equals(5);
  });

  it('Verificar se as informações do time estão corretas', () => {
    const player1 = new Player({ id: uid(), name: 'João', stars: 2 });
    const player2 = new Player({ id: uid(), name: 'Carlos', stars: 3 });
    const team = new Team({
      id: uid(),
      name: 'Os Incríveis',
      players: [player1, player2],
    });

    const teamInfo = team.getTeamInfo();

    expect(teamInfo.name).equals('Os Incríveis');
    expect(teamInfo.players.length).equals(2);
    expect(teamInfo.players).toContain(player1);
    expect(teamInfo.players).toContain(player2);
  });
});
