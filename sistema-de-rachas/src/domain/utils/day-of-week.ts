import { DayOfWeek } from '../object-values/day';

export const convertNumberToDayOfWeek = (dayOfWeek: number): DayOfWeek => {
  const days: DayOfWeek[] = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ];
  return days[dayOfWeek];
};
