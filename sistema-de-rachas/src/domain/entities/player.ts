import { PlayerPositionsEnum } from '../enums/player-position';
import { Match } from './match';

export type PlayerParams = {
  name: string;
  stars?: number;
  position?: PlayerPositionsEnum;
  id: string;
};

export class Player {
  id: string;
  name: string;
  stars: number;
  position?: PlayerPositionsEnum;

  public constructor(params: PlayerParams) {
    this.id = params.id;
    this.name = params.name;
    this.stars = params.stars ?? 0;
    this.position = params.position;
  }

  public isPaid(match: Match) {
    return !!match.paymentListPlayers.find(
      (paymentPlayerId) => paymentPlayerId === this.id
    );
  }
}
