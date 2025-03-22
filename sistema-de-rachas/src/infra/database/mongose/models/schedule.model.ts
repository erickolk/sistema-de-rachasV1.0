import mongoose, { Model, model, Schema, Document } from 'mongoose';

export interface ScheduleDocument extends Document<string> {
  startTime: string;
  finishTime: string;
  day: string;
}

export const scheduleSchema: Schema = new Schema({
  startTime: {
    type: String,
    required: true,
  },
  finishTime: {
    type: String,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
});

export const ScheduleModel: Model<ScheduleDocument> = model<ScheduleDocument>(
  'Schedule',
  scheduleSchema
);
