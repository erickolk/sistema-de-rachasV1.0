
import zod from "zod";
import { DaysOfWeekListSchema } from "~/utils/validations/date.validations";

export const createMatchScheema = zod.object({
  name: zod
    .string({ message: "O nome é um campo obrigatório" })
    .min(4, { message: "O nome deve possuir no mínimo 4 caracteres" }),
  rentalValue: zod.number({
    message: "O valor por hora deve ser um número",
  }),
  thumb: zod.string({
    message: "O valor deve ser uma thumb válida",
  }),
  description: zod.string({
    message: "O valor deve ser um descrição válida",
  }),
  schedule: zod.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
    message: "Horário inválido. Deve estar no formato HH:MM:SS.",
  }), 
  workDays: DaysOfWeekListSchema,
});
