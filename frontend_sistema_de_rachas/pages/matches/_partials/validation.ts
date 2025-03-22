import { z } from "zod";
import { PlayerPositionsEnum } from "sistema-rachas-domain/enums";

const playerSchema = z.object({
  name: z.string().min(1, "O nome do jogador é obrigatório"),
  stars: z.number().min(1).max(5).default(1),
  position: z.nativeEnum(PlayerPositionsEnum).default(PlayerPositionsEnum.GOALKEEPER)
});

const teamSchema = z.object({
  name: z.string().min(1, "O nome do time é obrigatório"),
  players: z.array(playerSchema).default([])
});

const scheduleSchema = z.object({
  startTime: z.string(),
  finishTime: z.string(),
  day: z.string()
}).refine((data) => {
  if (!data.day || !data.startTime || !data.finishTime) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(data.day);
  return selectedDate >= today;
}, "A data deve ser hoje ou no futuro");

export const matchValidationSchema = z.object({
  name: z.string().min(1, "O nome da partida é obrigatório"),
  description: z.string().optional(),
  soccerField: z.string().min(1, "Selecione um campo para a partida"),
  schedules: z.array(scheduleSchema).min(1, "Adicione pelo menos um horário para a partida"),
  players: z.array(playerSchema).optional().default([]),
  teams: z.array(teamSchema).optional().default([]),
  thumb: z.string().optional(),
  user: z.string().optional()
});
