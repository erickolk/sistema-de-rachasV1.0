import dayjs from 'dayjs';
import { ScheduleDocument } from '../../infra/database/mongose/models/schedule.model';

export const formatDate = (date: Date | string): string => {
  const parsedDate = dayjs(date).utc();
  if (!parsedDate.isValid()) {
    return 'Invalid Date';
  }
  return parsedDate.format('DD/MM/YYYY');
};

interface Schedule {
  startTime: string;
  finishTime: string;
  day: string;
  _id: any;
}

export const transformSchedulesToDateRange = (
  schedules: ScheduleDocument[]
) => {
  return schedules.map((schedule) => {
    // Combina a data e hora corretamente, levando em consideração o horário local
    const startDate = `${schedule.day} ${schedule.startTime}`;
    const finishDate = `${schedule.day} ${schedule.finishTime}`;

    // Retorna as datas no formato Date
    return {
      startDate, // Converte para o formato Date
      finishDate, // Converte para o formato Date
    };
  });
};
