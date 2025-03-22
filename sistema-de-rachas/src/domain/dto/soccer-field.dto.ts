import { DayOfWeek } from '../object-values/day';
import { ScheduleDto } from './schedule.dto';
import { UserDto } from './user.dto';

export type SoccerFieldDto = {
  id: string;
  pixKey: string;
  name: string;
  rentalValue: number;
  workDays: Array<DayOfWeek>;
  workStartTime: string;
  workFinishTime: string;
  schedules: ScheduleDto[];
  user: UserDto;
};

export type CreateSoccerFieldDto = {
  name: string;
  pixKey: string;
  rentalValue: number;
  workDays: Array<DayOfWeek>;
  workStartTime: string;
  workFinishTime: string;
  user: string;
};
