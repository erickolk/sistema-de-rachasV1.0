import { ScheduleDto } from '../../domain/dto/schedule.dto';
import { Schedule } from '../../domain/entities/schedule';
import { formatDate } from '../utils/date';

export const SchedulePresenter = (schedule: Schedule): ScheduleDto => {
  return {
    id: schedule.id.toString(),
    day: formatDate(schedule.day),
    startTime: schedule.startTime.toString(),
    finishTime: schedule.finishTime.toString(),
  };
};
