import { Model, Types } from 'mongoose';
import { PlayerRepository } from '../../repositories/player.respository';
import { Player } from '../../../../domain/entities/player';
import { CreatePlayerDto } from '../../../../domain/dto/player.dto';
import { PlayerDocument } from '../../mongose/models/player.model';

export class PlayerMongoRepository implements PlayerRepository {
  private model: Model<PlayerDocument>;

  constructor(model: Model<PlayerDocument>) {
    this.model = model;
  }

  async findById(id: string): Promise<Player | null> {
    const player = await this.model.findById(id).exec();
    if (!player) return null;

    return new Player({
      id: player._id,
      name: player.name,
      stars: player.stars,
    });
  }

  async findByName(name: string): Promise<Player | null> {
    const player = await this.model.findOne({ name }).exec();
    if (!player) return null;

    return new Player({
      id: player._id,
      name: player.name,
      stars: player.stars,
    });
  }

  async create(data: CreatePlayerDto): Promise<Player | null> {
    const player = new this.model(data);
    await player.save();
    if (!player?._id) return null;
    return this.parseToEntity(player);
  }

  async update(id: string, data: Partial<Player>): Promise<Player | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) return null;

    return this.parseToEntity(updated);
  }

  async delete(id: string): Promise<Player | null> {
    const deleted = await this.model.findByIdAndDelete(id).exec();

    if (!deleted) {
      return null;
    }

    return this.parseToEntity(deleted);
  }

  parseToEntity(document: PlayerDocument): Player {
    return new Player({
      id: document._id as string,
      name: document.name,
      stars: document.stars,
    });
  }
}
