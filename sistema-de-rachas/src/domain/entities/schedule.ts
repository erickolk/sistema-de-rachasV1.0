import { Time } from '../object-values/time';

export type ScheduleParams = {
  id: string;
  startTime: string;
  finishTime: string;
  day: string;
};

export class Schedule {
  id: string;
  public startTime: Time;
  public finishTime: Time;
  day: Date;

  public constructor(params: ScheduleParams) {
    this.id = params.id;
    this.startTime = new Time(params.startTime);
    this.finishTime = new Time(params.finishTime);
    this.day = new Date(params.day);
  }

  public get totalHours(): number {
    return Math.abs(this.finishTime.number - this.startTime.number);
  }
}
