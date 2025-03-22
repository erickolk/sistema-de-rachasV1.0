import { Document, Schema, model, Model } from 'mongoose';
import { PlayerPositionsEnum } from '../../../../domain/enums/player-position';

export interface PlayerDocument extends Document<string> {
  name: string;
  stars?: number;
  position?: PlayerPositionsEnum;
}

export const playerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: false,
  },
  position: {
    type: String,
    enum: Object.values(PlayerPositionsEnum),
    required: false,
  },
});

const PlayerModel: Model<PlayerDocument> = model<PlayerDocument>(
  'Player',
  playerSchema
);

export default PlayerModel;
