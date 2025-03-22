import { ScheduleDto } from '../../domain/dto/schedule.dto';
import { Schedule } from '../../domain/entities/schedule';
import { AvailableTimesByDay } from '../../domain/types/available-times';
import { SchedulePresenter } from './schedule.presenter';

export const AvailableTimesPresenter = (
  availableTimes: AvailableTimesByDay
) => {
  const mappedAvailableTimes: Record<string, ScheduleDto[]> = {};

  Object.keys(availableTimes).forEach((day: string) => {
    mappedAvailableTimes[day] = availableTimes[day].map(
      (availableTime: Schedule) => {
        return SchedulePresenter(availableTime);
      }
    );
  });

  return mappedAvailableTimes;
};
