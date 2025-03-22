import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDate = (date: Date | string): string => {
  const parsedDate = dayjs(date).utc();
  if (!parsedDate.isValid()) {
    return "Invalid Date";
  }
  return parsedDate.format("DD/MM/YYYY");
};

export const formatDateSubmit = (date: Date | string): string => {
  const parsedDate = dayjs(date, "DD/MM/YYYY");
  if (!parsedDate.isValid()) {
    console.warn("Invalid date received:", date);
    return "Invalid Date";
  }
  return parsedDate.format("YYYY-MM-DD");
};



export const daysAsNumbersMap: Record<string, number> = {
    domingo: 0,
    segunda: 1,
    terca: 2,
    quarta: 3,
    quinta: 4,
    sexta: 5,
    sabado: 6,
};

export const daysAsNumbers = [0, 1, 2, 3, 4, 5, 6]
