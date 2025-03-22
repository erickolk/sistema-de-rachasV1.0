import { uid } from 'uid';

import { Player } from './player';

export type TeamParams = {
  id: string;
  name: string;
  players: Array<Player>;
  minPlayers?: number;
  maxPlayers?: number;
};

export class Team {
  id: string;
  name: string;
  public static readonly minPlayers: number = 6;
  public static readonly maxPlayers: number = 12;
  players: Array<Player>;

  constructor(params: TeamParams) {
    this.id = uid();
    this.name = params.name;
    this.players = params.players;
  }

  public get totalStars(): number {
    return this.players.reduce((sum, player) => sum + player.stars, 0);
  }

  public get isValid(): boolean {
    return (
      this.players.length >= Team.minPlayers &&
      this.players.length <= Team.maxPlayers
    );
  }

  public get isComplete(): boolean {
    return this.players.length === Team.maxPlayers;
  }

  addPlayer(player: Player): void {
    if (this.isComplete) {
      throw new Error('O time já está completo!');
    }
    this.players.push(player);
  }

  removePlayer(playerId: string): void {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  editPlayer(playerId: string, newDetails: Partial<Player>): void {
    const player = this.players.find((player) => player.id === playerId);
    if (player) {
      if (newDetails.name !== undefined) player.name = newDetails.name;
      if (newDetails.stars !== undefined) player.stars = newDetails.stars;
    }
  }

  getTeamInfo(): { id: string; name: string; players: Player[] } {
    return {
      id: this.id,
      name: this.name,
      players: this.players,
    };
  }
}
