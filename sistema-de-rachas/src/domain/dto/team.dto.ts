import { PlayerDto } from './player.dto';

export type TeamDto = {
  id: string;
  name: string;
  players: Array<PlayerDto>;
  minPlayers?: number;
  maxPlayers?: number;
  totalStars?: number;
};

export type CreateTeamDto = {
  name: string;
  players: Array<PlayerDto>;
  minPlayers?: number;
  maxPlayers?: number;
};
