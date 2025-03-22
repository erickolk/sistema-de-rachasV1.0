export type ScheduleDto = {
  id: string;
  startTime: string;
  finishTime: string;
  day: string;
};

export type CreateScheduleDto = {
  startTime: string;
  finishTime: string;
  day: string;
};
