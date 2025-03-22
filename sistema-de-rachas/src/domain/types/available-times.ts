import { Schedule } from '../entities/schedule';
import { Time } from '../object-values';

export type AvailableTimesByDay = {
  [day: string]: Schedule[];
};

export type TimeInterval = {
  startTime: Time;
  finishTime: Time;
};

export type TimeStringInterval = {
  startTime: string;
  finishTime: string;
};
