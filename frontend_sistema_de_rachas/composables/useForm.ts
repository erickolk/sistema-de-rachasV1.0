import type { CreateScheduleDto } from "sistema-rachas-domain/dto";

interface Player {
  id: string;
  name: string;
  stars: number;
}

interface Form {
  name: string;
  description: string;
  players: Player[];
  schedule: CreateScheduleDto | null;
  field: string;
}

export const form = ref<Form>({
  name: "",
  description: "",
  players: [],
  schedule: {
    day: "",
    startTime: "",
    finishTime: "",
  },
  field: "",
});
