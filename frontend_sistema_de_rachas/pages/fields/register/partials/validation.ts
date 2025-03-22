import { DaysOfWeekListSchema } from "~/utils/validations/date.validations";
import zod from "zod";

export const registerSoccerFieldScheema = zod.object({
  name: zod
    .string({ message: "O nome é um campo obrigatório" })
    .min(4, { message: "O nome deve possuir no mínimo 4 caracteres" }),
  rentalValue: zod.number({
    message: "O valor por hora deve ser um número",
  }),
  pixKey: zod.string({
    message: "O valor por hora deve ser uma chave pix válida",
  }),
  workStartTime: zod.string({ message: "O horário de inicio é um campo obrigatório" }).regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
    message: "Horário inválido. Deve estar no formato HH:MM:SS.",
  }),
  workFinishTime: zod.string({ message: "O horario de termino é um campo obrigatório" }).regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
    message: "Horário inválido. Deve estar no formato HH:MM:SS.",
  }),
  workDays: DaysOfWeekListSchema,
});
