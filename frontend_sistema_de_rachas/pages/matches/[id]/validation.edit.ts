import { z } from "zod";

export const matchEditSchema = z
  .object({
    name: z.string().min(1, { message: "O nome da partida é obrigatório." }),
    description: z
      .string()
      .min(1, { message: "A descrição é obrigatória." })
      .max(200, { message: "A descrição não pode exceder 200 caracteres." }),
    date: z.string().refine((val) => new Date(val) > new Date(), {
      message: "A data da partida deve ser no futuro ou no dia atual.",
    }),
    startTime: z.string().nonempty("O horário de início é obrigatório."),
    finishTime: z.string().nonempty("O horário de fim é obrigatório."),
    players: z
      .array(z.string())
      .nonempty({ message: "É necessário ao menos um jogador." }),
  })
  .superRefine((data, context) => {
    const { startTime, finishTime } = data;

    if (
      startTime &&
      finishTime &&
      new Date(`1970-01-01T${finishTime}:00Z`) <=
        new Date(`1970-01-01T${startTime}:00Z`)
    ) {
      context.addIssue({
        code: "custom",
        path: ["finishTime"],
        message: "O horário de fim deve ser após o horário de início.",
      });
    }
  });
