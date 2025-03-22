import { DayOfWeek } from '../object-values/day';
import { Time } from '../object-values/time';
import { AvailableTimesByDay } from '../types/available-times';
import { convertNumberToDayOfWeek } from '../utils/day-of-week';
import { Schedule } from './schedule';
import { User } from './user';

export type SoccerFieldParams = {
  id: string;
  name: string;
  rentalValue: number;
  pixKey: string;
  workDays: Array<DayOfWeek>;
  workStartTime: string;
  workFinishTime: string;
  user: User;
};

export class SoccerField {
  id: string;
  name: string;
  rentalValue: number;
  pixKey: string;
  workDays: Array<DayOfWeek>;
  workStartTime: Time;
  workFinishTime: Time;
  user: User;

  public constructor(params: SoccerFieldParams) {
    console.log('params', params);
    this.id = params.id;
    this.name = params.name;
    this.rentalValue = params.rentalValue;
    this.pixKey = params.pixKey;
    this.workDays = params.workDays;
    this.workStartTime = new Time(params.workStartTime);
    this.workFinishTime = new Time(params.workFinishTime);
    this.user = params.user;
  }
}
