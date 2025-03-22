import { Types } from 'mongoose';
import { CreatePlayerDto, PlayerDto } from '../../../domain/dto/player.dto';
import { Player } from '../../../domain/entities/player';

export interface PlayerRepository {
  findById(id: string): Promise<Player | null>;
  findByName(name: string): Promise<Player | null>;
  create(data: CreatePlayerDto): Promise<Player | null>;
  update(id: string, user: Partial<CreatePlayerDto>): Promise<Player | null>;
  delete(id: string): Promise<Player | null>;
}
