import dayjs from 'dayjs';
import { ScheduleDocument } from '../../../infra/database/mongose/models/schedule.model';
import SoccerFieldModel, {
  SoccerFieldDocumentWithRelations,
} from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { AvailableTimesByDay } from '../../types/available-times';
import { convertNumberToDayOfWeek, Either, left, right } from '../../utils';
import { Time } from '../../object-values';

export class GetSoccerFieldAvailableTimes {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(
    id: string,
    day?: string
  ): Promise<Either<HttpError, ScheduleDocument[]>> {
    try {
      const availableTimes =
        await GetSoccerFieldAvailableTimes.repository.getAvailableTimes(
          id,
          day
        );

      if (!availableTimes) {
        return left(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            'Erro ao obter os horários disponíveis'
          )
        );
      }

      return right(availableTimes);
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao obter os horários disponíveis'
        )
      );
    }
  }

  private getAvailableIntervals(
    workTimes: Array<{ startTime: Time; finishTime: Time }>,
    occupiedTimes: Array<{ startTime: Time; finishTime: Time }>
  ): Array<{ startTime: string; finishTime: string }> {
    const availableTimes: Array<{ startTime: string; finishTime: string }> = [];

    workTimes.forEach((workInterval) => {
      let { startTime, finishTime } = workInterval;

      occupiedTimes.forEach((occupiedInterval) => {
        if (
          occupiedInterval.startTime.isBefore(finishTime) &&
          occupiedInterval.finishTime.isAfter(startTime)
        ) {
          if (occupiedInterval.startTime.isAfter(startTime)) {
            availableTimes.push({
              startTime: startTime.toString(),
              finishTime: occupiedInterval.startTime.toString(),
            });
          }
          startTime = new Time(
            Math.max(
              occupiedInterval.finishTime.toSeconds(),
              startTime.toSeconds()
            ).toString()
          );
        }
      });

      if (startTime.isBefore(finishTime)) {
        availableTimes.push({
          startTime: startTime.toString(),
          finishTime: finishTime.toString(),
        });
      }
    });

    return availableTimes;
  }

  private getWorkTimes(
    soccerField: SoccerFieldDocumentWithRelations,
    currentDay: string
  ) {
    const dayOfWeekIndex = dayjs(currentDay).day();
    const dayOfWeek = convertNumberToDayOfWeek(dayOfWeekIndex);

    if (!soccerField.workDays.includes(dayOfWeek)) {
      return [];
    }

    let startTime = new Time(soccerField.workStartTime);
    const finishTime = new Time(soccerField.workFinishTime);
    const interval = 1;

    if (startTime.isAfter(finishTime)) {
      throw new Error(
        'Horário de início não pode ser depois do horário de término.'
      );
    }

    const workTimes = [];

    while (startTime.isBefore(finishTime)) {
      const nextTime = startTime.add('hours', interval);

      if (nextTime.isAfter(finishTime)) {
        workTimes.push({
          startTime: new Time(startTime.toString()),
          finishTime: new Time(finishTime.toString()),
        });
        break;
      }

      workTimes.push({
        startTime: new Time(startTime.toString()),
        finishTime: new Time(nextTime.toString()),
      });

      startTime = nextTime;
    }

    return workTimes;
  }
}
