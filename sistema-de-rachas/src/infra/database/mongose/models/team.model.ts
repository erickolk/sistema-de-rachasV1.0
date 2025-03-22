import mongoose, { Document, Schema, model } from 'mongoose';
import { PlayerDocument, playerSchema } from './player.model';

export interface TeamDocument extends Document<string> {
  name: string;
  players: mongoose.Types.ObjectId[];
  minPlayers?: number;
  maxPlayers?: number;
}

export interface TeamDocumentWithRelationships extends Document<string> {
  name: string;
  players: PlayerDocument[];
  minPlayers?: number;
  maxPlayers?: number;
}

export const teamSchema: Schema = new Schema({
  name: { type: String, required: true },
  players: [playerSchema],
  minPlayers: { type: Number, default: 6 },
  maxPlayers: { type: Number, default: 12 },
});

export const TeamModel = model<TeamDocument>('Team', teamSchema);
