import mongoose, { Document, Model, model, Schema } from 'mongoose';
import { UserDocument } from './user.model';
import { Schedule } from '../../../../domain';
import { ScheduleDocument } from './schedule.model';

export interface SoccerFieldDocument extends Document<string> {
  name: string;
  pixKey: string;
  rentalValue: number;
  workDays: Array<string>;
  workStartTime: string;
  workFinishTime: string;
  user: mongoose.Types.ObjectId[];
}

export interface SoccerFieldDocumentWithRelations extends Document<string> {
  name: string;
  pixKey: string;
  rentalValue: number;
  workDays: Array<string>;
  workStartTime: string;
  workFinishTime: string;
  user: UserDocument;
  schedules: ScheduleDocument[];
}

export const soccerFieldSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pixKey: {
    type: String,
    required: true,
  },
  workDays: {
    type: Array<string>,
    required: true,
  },
  workStartTime: {
    type: String,
    required: true,
  },
  workFinishTime: {
    type: String,
    required: true,
  },
  rentalValue: {
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const SoccerFieldModel: Model<SoccerFieldDocumentWithRelations> =
  model<SoccerFieldDocumentWithRelations>('SoccerField', soccerFieldSchema);

export default SoccerFieldModel;
