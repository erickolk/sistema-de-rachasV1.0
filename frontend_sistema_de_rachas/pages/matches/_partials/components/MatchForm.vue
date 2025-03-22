<template>
  <form @submit.prevent="handleSubmit" class="w-full">
    <FormSection title="Informações da Partida">
      <template #content>
        <div class="grid grid-cols-3 gap-x-4 min-w-0">
          <div>
            <label for="name">Nome da Partida:</label>
            <InputText
              type="text"
              v-model="form.name"
              id="name"
              :class="{ 'p-invalid': submitted && formErrors.name }"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <small class="text-red-500" v-if="submitted && formErrors.name">
              {{ formErrors.name }}
            </small>
          </div>
          <div>
            <label for="description">Descrição:</label>
            <InputText
              type="text"
              v-model="form.description"
              id="description"
              :class="{ 'p-invalid': submitted && formErrors.description }"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <small class="text-red-500" v-if="submitted && formErrors.description">
              {{ formErrors.description }}
            </small>
          </div>
          <div>
            <label for="field">Campo:</label>
            <Select
              v-model="form.soccerField"
              :options="fieldOptions"
              optionLabel="name"
              optionValue="id"
              placeholder="Selecione um campo"
              :class="{ 'p-invalid': submitted && formErrors.soccerField }"
              class="w-full"
              id="field"
            />
            <small class="text-red-500" v-if="submitted && formErrors.soccerField">
              {{ formErrors.soccerField }}
            </small>
          </div>
        </div>
      </template>
    </FormSection>

    <FormSection title="Horário da Partida">
      <template #content>
        <div class="grid grid-cols-3 gap-x-4">
          <div class="">
            <label for="date">Selecionar Data:</label>
            <DatePicker
              :placeholder="currentDate"
              dateFormat="dd/mm/yy"
              v-model="selectedDate"
              fluid
              id="date"
              required
              :disabled="!form.soccerField"
              @date-select="handleSelectDate"
            >
              <template #date="slotProps">
                <span
                  class="w-full h-full relative flex items-center justify-center"
                  :class="
                    isDateDisabled(slotProps.date)
                      ? 'cursor-not-allowed opacity-10'
                      : ''
                  "
                  @click="handleDateClick(slotProps.date, $event)"
                >
                  {{ slotProps.date.day }}
                </span>
              </template>
            </DatePicker>
          </div>

          <div>
            <label for="selecteSchedule">Selecionar Horário:</label>
            <Select
              v-model="selectedSchedule"
              :options="scheduleOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione um horário"
              class="w-full"
              fluid
              :sellectAll="false"
              :showToggleAll="false"
              display="chip"
              :disabled="!selectedDate"
            />
          </div>

          <div class="flex items-end">
            <Button
              type="button"
              label="Adicionar"
              icon="pi pi-plus"
              :disabled="!selectedDate || !selectedSchedule.startTime"
              @click="addSchedule"
            />
          </div>
        </div>

        <div
          class="flex flex-col flex-wrap mt-4 p-4 dark:bg-black/5 rounded-md border-bg-black/10 border relative"
          :class="{ 'border-red-500': submitted && formErrors.schedules }"
        >
          <div
            class="flex flex-wrap gap-x-2 gap-y-1 w-full min-w-0"
            v-if="!!schedules?.length"
          >
            <Chip
              v-for="(schedule, index) in schedules"
              :key="index"
              class="max-w-full"
            >
              <p class="text-sm truncate">
                {{ schedule.day }} das
                {{ schedule.startTime }} até {{ schedule.finishTime }}
              </p>
              <Button
                icon="pi pi-times-circle"
                severity="danger"
                variant="text"
                rounded
                @click="removeSchedule(index)"
              >
              </Button>
            </Chip>
          </div>

          <p v-if="!schedules?.length" class="text-xs">
            Sem horários adicionados
          </p>

          <small class="text-red-500 mt-2" v-if="submitted && formErrors.schedules">
            {{ formErrors.schedules }}
          </small>
        </div>
      </template>
    </FormSection>

    <FormSection title="Participantes">
      <template #content>
        <div class="flex gap-x-4 items-end flex-wrap">
          <div class="w-full sm:w-1/4">
            <label for="players">Nome do jogador:</label>
            <InputText
              type="text"
              v-model="playerForm.name"
              class="w-full"
              @keydown.enter.prevent="playerForm.name?.trim() && handleAddPlayer()"
            />
          </div>

          <div class="w-full sm:w-1/4">
            <label class="block">Posição:</label>
            <Select
              v-model="playerForm.position"
              :options="playerPositionOptions"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            />
          </div>

          <div class="w-full sm:flex-1 flex pb-4">
            <Rating
              v-model="playerForm.stars"
              :cancel="false"
              class="text-yellow-500"
            />
          </div>

          <div class="w-full sm:w-auto pb-2">
            <Button
              type="button"
              @click="handleAddPlayer()"
              label="Adicionar"
              icon="pi pi-plus"
              :disabled="!playerForm.name?.trim()"
            />
          </div>
        </div>

        <div
          class="flex flex-col mt-4 p-2 dark:bg-black/5 rounded-md border-black/10 border relative"
        >
          <draggable
            :list="players"
            ghost-class="ghost"
            class="list-group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 min-h-10 w-full min-w-0"
            item-key="name"
            group="players"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element, index }">
              <div
                v-show="isPlayersExpanded || index < ITEMS_TO_SHOW"
                class="list-group-item min-w-0"
              >
                <Player
                  :player="element"
                  :playerPositionAbbreviations="playerPositionAbbreviations"
                  :index="index"
                  :is-editable="true"
                  :showRemove="true"
                  @remove="() => removePlayer(index)"
                  @update:stars="(stars) => updatePlayerStars(index, stars)"
                />
              </div>
            </template>
          </draggable>

          <div
            v-if="(players?.length || 0) > ITEMS_TO_SHOW"
            class="w-full flex justify-center mt-2"
          >
            <Button
              type="button"
              :icon="
                isPlayersExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'
              "
              :label="
                isPlayersExpanded
                  ? 'Mostrar Menos'
                  : `Mostrar Mais (${players?.length - ITEMS_TO_SHOW})`
              "
              text
              @click="isPlayersExpanded = !isPlayersExpanded"
              class="p-button-sm"
            />
          </div>

          <p
            class="w-full h-full absolute flex items-center justify-center text-xs text-center rounded"
            v-if="!players?.length"
            style="top: 0; left: 0"
          >
            Sem jogadores adicionados. <br />
            É possível mover os jogadores que estão nessa área.
          </p>
        </div>
        <hr class="my-4 border-dashed border-white/30" />

        <h3>Times</h3>
        <div class="flex items-end gap-x-4 flex-wrap">
          <div class="w-full sm:w-1/4">
            <label for="players">Nome do Time:</label>
            <InputText type="text" v-model="teamForm.name" class="w-full" />
          </div>

          <div class="w-full sm:w-auto">
            <Button icon="pi pi-plus" label="Adicionar" @click="addTeam()" />
          </div>
        </div>

        <div
          class="flex flex-col mt-4 p-4 dark:bg-black/5 rounded-md border-bg-black/10 border relative"
        >
          <draggable
            :list="teams"
            ghost-class="ghost"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 min-h-10 w-full min-w-0"
            item-key="name"
            @start="drag = true"
            @end="drag = false"
            group="teams"
          >
            <template #item="{ element, index: teamIndex }">
              <div
                v-show="isTeamsExpanded || teamIndex < ITEMS_TO_SHOW"
                class="list-group-item flex-col dark:bg-white/5 bg-black/5 p-2 rounded min-w-0"
              >
                <div
                  class="flex justify-between mb-4 items-center border-b-2 pb-2"
                >
                  <div class="flex-1">{{ element.name }}</div>
                  <div class="flex items-center gap-x-2">
                    <div
                      class="text-xs bg-emerald-400 text-zinc-950 font-semibold px-2 py-1 rounded inline-block"
                    >
                      {{ countPlayerStars(element) }} estrelas
                    </div>

                    <Button
                      @click="removeTeam(teamIndex)"
                      severity="danger"
                      icon="pi pi-times"
                      rounded
                      variant="text"
                    />
                  </div>
                </div>

                <h4 class="text-black/70 text-sm mb-2">Jogadores:</h4>
                <draggable
                  :list="element.players"
                  ghost-class="ghost"
                  class="list-group flex-1 h-full"
                  item-key="name"
                  group="players"
                >
                  <template #item="{ element, index: playerIndex }">
                    <div class="mb-2">
                      <Player
                        :player="element"
                        :playerPositionAbbreviations="
                          playerPositionAbbreviations
                        "
                        :index="playerIndex"
                        @remove="
                          () => removeTeamPlayers(teamIndex, playerIndex)
                        "
                      />
                    </div>
                  </template>
                </draggable>
              </div>
            </template>
          </draggable>

          <div
            v-if="(teams?.length || 0) > ITEMS_TO_SHOW"
            class="w-full flex justify-center mt-2"
          >
            <Button
              type="button"
              :icon="
                isTeamsExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'
              "
              :label="
                isTeamsExpanded
                  ? 'Mostrar Menos'
                  : `Mostrar Mais (${teams?.length - ITEMS_TO_SHOW})`
              "
              text
              @click="isTeamsExpanded = !isTeamsExpanded"
              class="p-button-sm"
            />
          </div>

          <p v-if="!teams?.length" class="text-xs text-center py-4">
            Sem times adicionados. <br />
            É possível mover os jogadores que estão nessa área.
          </p>
        </div>
      </template>
    </FormSection>

    <div class="flex justify-end">
      <Button
        type="submit"
        :label="match?.id ? 'Atualizar Partida' : 'Criar Partida'"
        :icon="match?.id ? 'pi pi-pencil' : 'pi pi-check'"
        class="w-1/4 self-end mt-8"
        :disabled="isLoading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Rating from "primevue/rating";
import { ref, onUnmounted, computed, onMounted, watch } from "vue";
import { useMatch } from "../composables/useMatch";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['save', 'cancel']);

const ITEMS_TO_SHOW = 10;
const isPlayersExpanded = ref(false);
const isTeamsExpanded = ref(false);
const drag = ref(false);
const isInitialized = ref(false);

const {
  form,
  isLoading,
  formErrors,
  submitted,
  addSchedule,
  handleDateClick,
  handleSelectDate,
  isDateDisabled,
  removeSchedule,
  scheduleOptions,
  selectedSchedule,
  schedules,
  selectedDate,
  currentDate,
  fieldOptions,
  players,
  addPlayer,
  removePlayer,
  playerForm,
  playerPositionOptions,
  playerPositionAbbreviations,
  teams,
  teamForm,
  addTeam,
  removeTeamPlayers,
  removeTeam,
  countPlayerStars,
  onSubmit,
  match,
  resetForm,
  handleOnMountedForm,
  updatePlayerStars,
} = useMatch();

const toast = useToast();

const visiblePlayers = computed(() => {
  if (isPlayersExpanded.value || (players?.length || 0) <= ITEMS_TO_SHOW) {
    return players;
  }
  return players?.slice(0, ITEMS_TO_SHOW);
});

const visibleTeams = computed(() => {
  if (isTeamsExpanded.value || (teams?.length || 0) <= ITEMS_TO_SHOW) {
    return teams;
  }
  return teams?.slice(0, ITEMS_TO_SHOW);
});

// Inicializa o formulário com os dados recebidos
watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(form, newData);
    if (newData.players) {
      players.splice(0, players.length, ...newData.players);
    }
    if (newData.teams) {
      teams.splice(0, teams.length, ...newData.teams);
    }
    if (newData.schedules) {
      schedules.splice(0, schedules.length, ...newData.schedules);
    }
  }
}, { immediate: true });

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  submitted.value = true;

  try {
    const updatedMatch = await onSubmit(form);
    emit('save', updatedMatch);
  } catch (error) {
    console.error('Erro ao salvar:', error);
  }
};

const handleCancel = () => {
  resetForm();
  emit('cancel');
};

const checkDuplicatePlayer = (playerName: string): boolean => {
  const normalizedName = playerName.trim().toLowerCase();
  return (players || []).some((player: { name: string }) => player.name.toLowerCase() === normalizedName);
};

const handleAddPlayer = () => {
  if (!playerForm.name?.trim()) return;
  
  if (checkDuplicatePlayer(playerForm.name)) {
    toast.add({
      severity: 'warn',
      summary: 'Jogador Duplicado',
      detail: 'Já existe um jogador com este nome. Tente adicionar um sobrenome ou número para diferenciar.',
      life: 5000,
    });
    return;
  }
  
  addPlayer();
};

watch(form, (newVal) => {
  console.log("Formulário atualizado:", newVal);
}, { deep: true });

watch(schedules, (newVal) => {
  console.log("Horários atualizados:", newVal);
}, { deep: true });

onMounted(async () => {
  if (!isInitialized.value) {
    try {
      await handleOnMountedForm();
      isInitialized.value = true;
    } catch (error) {
      console.error("Erro ao montar o formulário:", error);
    }
  }
});

onUnmounted(() => {
  resetForm();
  isInitialized.value = false;
});

// Observa mudanças no campo selecionado
watch(() => form.soccerField, async (newField) => {
  if (newField && selectedDate.value) {
    await handleSelectDate();
  }
}, { immediate: true });

defineOptions({
  name: "MatchForm",
});
</script>

<script lang="ts">
export default {
  name: "MatchForm",
};
</script>

<style scoped lang="postcss">
:deep(.p-chip) {
  @apply py-1 bg-black/5 max-w-full truncate;
}

:deep(.p-button-sm) {
  @apply text-sm py-1 px-2;
}

.list-group-item {
  @apply min-w-0;
}
</style>
