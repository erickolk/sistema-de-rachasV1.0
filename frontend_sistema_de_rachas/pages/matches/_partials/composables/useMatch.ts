import { useRouter, useRoute } from 'vue-router';
import { HttpStatusCode } from 'axios';
import type {
  CreateMatchDto,
  CreatePlayerDto,
  CreateScheduleDto,
  CreateTeamDto,
  PlayerDto,
  ScheduleDto,
  SoccerFieldDto,
  MatchDto,
} from 'sistema-rachas-domain/dto';
import { createMatch, getMatch, updateMatch, getMatchById } from '~/services/match.service';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { matchValidationSchema } from '../validation';
import { PlayerPositionsEnum } from 'sistema-rachas-domain/enums';
import {
  daysAsNumbers,
  daysAsNumbersMap,
  formatDate,
} from '~/application/utils/date';
import {
  fetchAvailableTimes,
  getSoccerFields,
} from '../../../../services/soccer-field.service';
import type { MatchWithRelationsDto } from '../../../../types/match.type';
import { ref, reactive, computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

// Interfaces específicas para o formulário
interface FormPlayer extends CreatePlayerDto {
  id?: string;
  name: string;
  stars: number;
  position: PlayerPositionsEnum;
}

interface FormTeam extends Omit<CreateTeamDto, 'players'> {
  id?: string;
  name: string;
  players: FormPlayer[];
}

interface ScheduleFormDto {
  startTime: string;
  finishTime: string;
  day: string;
}

interface FormMatch {
  id?: string;
  name: string;
  description: string;
  soccerField: string;
  players: FormPlayer[];
  teams: FormTeam[];
  schedules: ScheduleFormDto[];
  thumb: string;
  user: string;
}

const playerPositionAbbreviations: Record<any, string> = {
  [PlayerPositionsEnum.GOALKEEPER]: 'GL',
  [PlayerPositionsEnum.DEFENDER]: 'ZG',
  [PlayerPositionsEnum.RIGHT_BACK]: 'LD',
  [PlayerPositionsEnum.LEFT_BACK]: 'LE',
  [PlayerPositionsEnum.MIDFIELDER]: 'ME',
  [PlayerPositionsEnum.DEFENSIVE_MIDFIELDER]: 'VOL',
  [PlayerPositionsEnum.ATTACKING_MIDFIELDER]: 'MA',
  [PlayerPositionsEnum.RIGHT_WINGER]: 'PD',
  [PlayerPositionsEnum.LEFT_WINGER]: 'PE',
  [PlayerPositionsEnum.FORWARD]: 'AT',
  [PlayerPositionsEnum.STRIKER]: 'CA',
};
const playerPositionOptions = Object.keys(PlayerPositionsEnum).map(
  (key, index) => ({
    label: `${
      playerPositionAbbreviations[
        PlayerPositionsEnum[key as keyof typeof PlayerPositionsEnum]
      ]
    } - ${PlayerPositionsEnum[key as keyof typeof PlayerPositionsEnum]}`,
    value: PlayerPositionsEnum[key as keyof typeof PlayerPositionsEnum],
  })
);
const playerInitialFormValue = {
  name: '',
  stars: 1,
  position: PlayerPositionsEnum.GOALKEEPER
};
const teamInitialFormValue: CreateTeamDto = {
  name: '',
  players: [],
};

const playerForm = reactive<FormPlayer>({ 
  name: '',
  stars: 1,
  position: PlayerPositionsEnum.GOALKEEPER
});

const players = reactive<FormPlayer[]>([]);
const editPlayers = reactive<FormPlayer[]>([]);
const teams = reactive<FormTeam[]>([]);
const teamForm = reactive<FormTeam>({ 
  name: '',
  players: []
});

const availableSchedules = ref<Record<string, ScheduleDto[]>>();
const dateError = ref('');
const scheduleError = ref('');
const selectedSchedule = ref<ScheduleFormDto>({
  startTime: '',
  finishTime: '',
  day: ''
});
const selectedDate = ref<Date>();
const schedules = reactive<ScheduleFormDto[]>([]);
const currentYear = new Date().getFullYear();
const currentDate = formatDate(new Date().toISOString().split('T')[0]);
const fieldOptions = ref<SoccerFieldDto[]>([]);
const match = reactive<MatchWithRelationsDto>({} as MatchWithRelationsDto);
const scheduleOptions = ref<Array<{ label: string; value: ScheduleFormDto }>>([]);

export const useMatch = () => {
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();

  const isLoading = ref(false);
  const submitted = ref(false);
  const initialFormValue: FormMatch = {
    description: '',
    name: '',
    players: [],
    schedules: [],
    soccerField: '',
    teams: [],
    thumb: '',
    user: getUserId() as string,
  };

  const form = reactive<FormMatch>({ ...initialFormValue });
  const formErrors = reactive<{ [key: string]: string }>({});
  
  const resetForm = () => {
    Object.assign(form, initialFormValue);
    Object.assign(formErrors, {});
    submitted.value = false;
  };

  const addPlayer = () => {
    players.push({
      name: playerForm.name,
      stars: playerForm.stars || 1,
      position: playerForm.position || PlayerPositionsEnum.GOALKEEPER,
    });
    Object.assign(playerForm, playerInitialFormValue);
  };

  const removePlayer = (index: number) => {
    console.log(index);
    players.splice(index, 1);
  };

  const updatePlayerStars = (index: number, stars: number) => {
    if (players[index]) {
      players[index].stars = stars;
    }
  };

  const addTeam = () => {
    if (!teamForm?.name) return;
    teams.push({ ...teamForm, players: [] });
    Object.assign(teamForm, { ...teamInitialFormValue });
  };

  const removeTeam = (index: number) => {
    teams.splice(index, 1);
  };

  const removeTeamPlayers = (teamIndex: number, playerIndex: number) => {
    teams[teamIndex].players.splice(playerIndex, 1);
  };

  const countPlayerStars = (team: CreateTeamDto) => {
    return team.players.reduce(
      (acc, player: PlayerDto) => acc + (player.stars || 0),
      0
    );
  };

  const fetchSoccerFields = async () => {
    const fields = await getSoccerFields();
    fieldOptions.value = fields.map(field => ({
      ...field,
      name: `${field.name} - R$ ${field.rentalValue.toFixed(2)}`
    }));
  };

  const handleNotificate = async (status: HttpStatusCode) => {
    try {
      if (status === 200) {
        router.push('/dashboard-client');
        toast.add({
          severity: 'success',
          summary: 'Partida registrada com sucesso!',
          life: 3000,
        });
      } else {
        throw new Error(`Erro ao salvar partida, STATUS_CODE: ${status}`);
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro ao salvar partida',
        life: 3000,
      });
    }
  };

  const onSubmit = async (values: FormMatch) => {
    try {
      isLoading.value = true;
      submitted.value = true;

      if (!getUserId()) {
        toast.add({
          severity: 'error',
          summary: 'Erro de autenticação',
          detail: 'Realize o login para continuar',
          life: 3000,
        });
        return;
      }

      // Validação dos campos obrigatórios
      const errors: Record<string, string> = {};
      
      if (!values.name) {
        errors.name = 'O nome da partida é obrigatório';
      }
      
      if (!values.soccerField) {
        errors.soccerField = 'Selecione um campo para a partida';
      }
      
      if (!schedules.length) {
        errors.schedules = 'Adicione pelo menos um horário para a partida';
      }

      // Se houver erros, atualiza o estado e retorna
      if (Object.keys(errors).length > 0) {
        Object.assign(formErrors, errors);
        toast.add({
          severity: 'error',
          summary: 'Erro de validação',
          detail: 'Por favor, preencha todos os campos obrigatórios',
          life: 3000,
        });
        return;
      }

      const createData: CreateMatchDto = {
        name: values.name,
        description: values.description || '',
        thumb: values.thumb || '',
        soccerField: values.soccerField,
        schedules: schedules.map(schedule => ({
          day: schedule.day,
          startTime: schedule.startTime,
          finishTime: schedule.finishTime,
        })),
        players: players.map(player => ({
          id: '',
          name: player.name,
          position: player.position,
          stars: player.stars,
        })),
        teams: teams.map(team => ({
          name: team.name,
          players: team.players.map(player => ({
            id: '',
            name: player.name,
            position: player.position,
            stars: player.stars,
          })),
        })),
        user: getUserId() as string,
      };

      console.log('Dados a serem enviados:', createData);

      try {
        const response = match.id
          ? await updateMatch(match.id, createData)
          : await createMatch(createData);

        console.log('Resposta da API:', response);

        if (response.status === 200 || response.status === 201) {
          toast.add({
            severity: 'success',
            summary: match.id ? 'Partida atualizada' : 'Partida criada',
            detail: match.id ? 'Partida atualizada com sucesso!' : 'Partida criada com sucesso!',
            life: 3000,
          });
          router.push('/dashboard-client');
        } else {
          throw new Error(`Erro ao salvar partida: ${response.status}`);
        }
      } catch (apiError: any) {
        console.error('Erro na chamada da API:', apiError);
        const errorMessage = apiError.message || 'Erro ao salvar partida. Tente novamente.';
        toast.add({
          severity: 'error',
          summary: 'Erro ao salvar partida',
          detail: errorMessage,
          life: 3000,
        });
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
      toast.add({
        severity: 'error',
        summary: 'Erro ao salvar partida',
        detail: 'Verifique os dados e tente novamente',
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const getAvailableTimes = async (fieldId: string, date: string): Promise<ScheduleDto[]> => {
    try {
      const response = await fetchAvailableTimes(fieldId, date);
      if (!response) {
        return [];
      }
      
      // Se a resposta já for um array, retorna diretamente
      if (Array.isArray(response)) {
        return response;
      }
      
      // Se for um objeto com arrays, concatena todos os arrays
      if (typeof response === 'object') {
        return Object.values(response).reduce((acc, curr) => acc.concat(curr), []);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      throw error;
    }
  };

  const handleSelectDate = async () => {
    try {
      if (!selectedDate.value || !form.soccerField) {
        scheduleOptions.value = [];
        selectedSchedule.value = { startTime: '', finishTime: '', day: '' };
        return;
      }

      isLoading.value = true;
      
      // Formatação da data para YYYY-MM-DD para enviar à API
      const date = new Date(selectedDate.value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDateForApi = `${year}-${month}-${day}`;
      
      // Formatação da data para exibição DD/MM/YYYY
      const formattedDateForDisplay = `${day}/${month}/${year}`;
      
      console.log('Data formatada para API:', formattedDateForApi);
      const availableTimes = await getAvailableTimes(form.soccerField, formattedDateForApi);

      if (!availableTimes?.length) {
        scheduleOptions.value = [];
        selectedSchedule.value = { startTime: '', finishTime: '', day: '' };
        toast.add({
          severity: 'info',
          summary: 'Sem horários',
          detail: 'Não há horários disponíveis para esta data',
          life: 3000,
        });
        return;
      }

      scheduleOptions.value = availableTimes.map((time: ScheduleDto) => ({
        label: `${time.startTime} - ${time.finishTime}`,
        value: {
          startTime: time.startTime,
          finishTime: time.finishTime,
          day: formattedDateForDisplay
        },
      }));
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível carregar os horários disponíveis',
        life: 3000,
      });
      scheduleOptions.value = [];
      selectedSchedule.value = { startTime: '', finishTime: '', day: '' };
    } finally {
      isLoading.value = false;
    }
  };

  const addSchedule = () => {
    if (!selectedSchedule.value || !selectedDate.value) return;

    // Formatação da data para YYYY-MM-DD
    const date = new Date(selectedDate.value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    schedules.push({
      day: formattedDate,
      startTime: selectedSchedule.value.startTime,
      finishTime: selectedSchedule.value.finishTime,
    });
    
    selectedSchedule.value = { 
      startTime: '', 
      finishTime: '', 
      day: '' 
    };
  };

  const removeSchedule = (index: number) => schedules.splice(index, 1);

  const handleDateClick = (
    date: {
      day: number;
      month: number;
      year: number;
      today: boolean;
      selectable: boolean;
    },
    event: Event
  ) => {
    if (isDateDisabled(date)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const disabledDays = () => {
    const selectedFieldObject = fieldOptions.value.find(
      (field) => field.id === form.soccerField
    );
    if (!selectedFieldObject || !selectedFieldObject.workDays) return [];

    const workDays = selectedFieldObject.workDays.map(
      (day: string) => daysAsNumbersMap[day]
    );
    return daysAsNumbers.filter((day) => !workDays.includes(day));
  };

  const isDateDisabled = (date: {
    day: number;
    month: number;
    year: number;
    today: boolean;
    selectable: boolean;
  }) => {
    const dayOfWeek = new Date(date.year, date.month, date.day).getDay();
    return disabledDays().includes(dayOfWeek);
  };

  const handleMatchResponse = async (matchId: string) => {
    const matchResponse = await getMatch(matchId);
    Object.assign(match, { ...matchResponse });
    if (match.soccerField?.id) {
      form.soccerField = match.soccerField.id;
    }
    form.name = match.name;
    form.description = match.description;

    const formattedSchedules: ScheduleFormDto[] = (match.schedules || []).map(schedule => ({
      day: schedule.day,
      startTime: schedule.startTime,
      finishTime: schedule.finishTime
    }));
    schedules.splice(0, schedules.length, ...formattedSchedules);
    
    const formattedPlayers: FormPlayer[] = (match.players || []).map(player => ({
      name: player.name,
      stars: player.stars || 1,
      position: player.position || PlayerPositionsEnum.GOALKEEPER
    }));
    players.splice(0, players.length, ...formattedPlayers);
    
    const formattedTeams: FormTeam[] = (match.teams || []).map(team => ({
      name: team.name,
      players: team.players.map(player => ({
        name: player.name,
        stars: player.stars || 1,
        position: player.position || PlayerPositionsEnum.GOALKEEPER
      }))
    }));
    teams.splice(0, teams.length, ...formattedTeams);
  };

  const handleOnMountedForm = async () => {
    const route = useRoute();
    const router = useRouter();
    const matchId = route.params.id;

    if (matchId) {
      try {
        const matchData = await getMatch(matchId as string);
        if (matchData) {
          // Armazena o ID da partida para identificar que é uma edição
          Object.assign(match, {
            id: matchData.id,
            teams: matchData.teams || [],
            players: matchData.players || [],
            schedules: matchData.schedules || []
          });
          
          // Atualiza o formulário
          form.name = matchData.name;
          form.description = matchData.description;
          form.soccerField = matchData.soccerField.id;
          
          // Carrega os jogadores
          if (matchData.players?.length) {
            players.splice(0, players.length, ...matchData.players.map((player: PlayerDto) => ({
              id: player.id,
              name: player.name,
              stars: player.stars || 1,
              position: player.position || PlayerPositionsEnum.GOALKEEPER
            })));
          }

          // Carrega os times
          if (matchData.teams?.length) {
            teams.splice(0, teams.length, ...matchData.teams.map((team: any) => ({
              id: team.id,
              name: team.name,
              players: team.players.map((player: any) => ({
                id: player.id,
                name: player.name,
                stars: player.stars || 1,
                position: player.position || PlayerPositionsEnum.GOALKEEPER
              }))
            })));
          }

          // Carrega os horários
          if (matchData.schedules?.length) {
            schedules.splice(0, schedules.length, ...matchData.schedules.map((schedule: ScheduleDto) => ({
              day: schedule.day,
              startTime: schedule.startTime,
              finishTime: schedule.finishTime
            })));
          }
        }
      } catch (error: any) {
        console.error('Erro ao carregar dados da partida:', error);
        
        // Se for erro de autenticação, redireciona para o login
        if (error?.response?.status === 401) {
          toast.add({
            severity: 'error',
            summary: 'Erro de autenticação',
            detail: 'Por favor, faça login novamente',
            life: 3000
          });
          router.push('/login');
          return;
        }

        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os dados da partida',
          life: 3000
        });
        
        // Redireciona para a lista de partidas em caso de erro
        router.push('/dashboard-client');
        return;
      }
    }

    await fetchSoccerFields();
  };

  return {
    // State and Consts
    dateError,
    scheduleError,
    selectedSchedule,
    schedules,
    selectedDate,
    currentYear,
    currentDate,
    match,
    isLoading,
    form,
    formErrors,
    submitted,
    playerForm,
    players,
    editPlayers,
    playerPositionOptions,
    playerPositionAbbreviations,
    teamForm,
    teams,

    // Computeds
    scheduleOptions,
    fieldOptions,

    // Methods
    onSubmit,
    resetForm,
    isDateDisabled,
    handleSelectDate,
    addSchedule,
    removeSchedule,
    handleDateClick,
    fetchSoccerFields,
    addPlayer,
    removePlayer,
    updatePlayerStars,
    countPlayerStars,
    removeTeamPlayers,
    addTeam,
    removeTeam,
    handleNotificate,
    handleOnMountedForm,
    getAvailableTimes,
  };
};
