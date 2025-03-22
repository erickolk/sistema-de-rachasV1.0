import { PlayerDto } from '../../domain/dto/player.dto';
import { Player } from '../../domain/entities/player';

export const PlayerPresenter = (player: Player): PlayerDto => {
  return {
    id: player.id,
    name: player.name,
    stars: player.stars,
    position: player.position,
  };
};
