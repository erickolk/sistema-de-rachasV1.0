import { PlayerPositionsEnum } from '../enums/player-position';

export type PlayerDto = {
  id: string;
  name: string;
  stars?: number;
  position?: PlayerPositionsEnum;
};

export type CreatePlayerDto = {
  name: string;
  stars: number;
  position: PlayerPositionsEnum;
};
