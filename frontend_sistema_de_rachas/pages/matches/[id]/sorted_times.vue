<template>
  <div class="sorted-teams">
    <div class="flex flex-col pt-8 px-16 max-w-screen-lg mx-auto">
      <div class="flex items-center justify-between mb-6">
        <NuxtLink
          :to="`/matches/${$route.params.id}/`"
          class="flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
        >
          <i class="pi pi-arrow-left" /> Voltar
        </NuxtLink>
        <h1 class="text-xl font-bold text-center flex-1">Sorteio de Times</h1>
      </div>

      <FormSection title="Times Sorteados">
        <template #content>
          <div v-if="isLoading" class="flex justify-center items-center py-8">
            <i class="pi pi-spin pi-spinner text-4xl"></i>
          </div>

          <div v-else-if="teams.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(team, index) in teams" :key="index" class="team-card">
              <div class="bg-black/5 rounded-lg p-4">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold">Time {{ index + 1 }}</h3>
                  <span class="text-sm font-medium bg-emerald-400 text-zinc-950 px-2 py-1 rounded">
                    {{ calculateTeamStars(team) }} estrelas
                  </span>
                </div>

                <div class="space-y-2">
                  <div v-for="player in team.players" :key="player.id" class="player-card">
                    <Player
                      :player="player"
                      :playerPositionAbbreviations="playerPositionAbbreviations"
                      :showRemove="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <p class="text-gray-500">Nenhum time foi sorteado ainda.</p>
          </div>
        </template>
      </FormSection>

      <div class="flex justify-end gap-x-4 mt-6">
        <Button
          type="button"
          label="Sortear Novamente"
          icon="pi pi-refresh"
          severity="secondary"
          :disabled="isLoading"
          @click="generateTeams"
        />
        <Button
          type="button"
          label="Salvar Times"
          icon="pi pi-check"
          :disabled="isLoading || !teams.length"
          @click="saveTeams"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import type { CreateTeamDto } from 'sistema-rachas-domain/dto/team.dto';
import { PlayerPositionsEnum } from 'sistema-rachas-domain/enums';
import { generateTeamsByPlayerStars, updateMatch } from '../../../services/match.service';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const isLoading = ref(false);
const teams = ref<CreateTeamDto[]>([]);

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

const calculateTeamStars = (team: CreateTeamDto) => {
  return team.players.reduce((acc, player) => acc + (player.stars || 1), 0);
};

const generateTeams = async () => {
  try {
    isLoading.value = true;
    const response = await generateTeamsByPlayerStars(route.params.id as string);
    console.log('Resposta do serviço:', response);
    
    if (!response || !Array.isArray(response)) {
      console.error('Resposta inválida do servidor:', response);
      throw new Error('Formato de resposta inválido');
    }

    teams.value = response.map(team => {
      console.log('Processando time:', team);
      return {
        ...team,
        players: (team.players || []).map(player => ({
          ...player,
          stars: player.stars || 1,
          position: player.position || PlayerPositionsEnum.GOALKEEPER
        }))
      };
    });
    
    console.log('Times processados:', teams.value);
  } catch (error) {
    console.error('Erro completo:', error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao gerar times',
      detail: 'Não foi possível gerar os times. Tente novamente.',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

const saveTeams = async () => {
  try {
    isLoading.value = true;
    await updateMatch(route.params.id as string, { teams: teams.value });
    toast.add({
      severity: 'success',
      summary: 'Times salvos com sucesso!',
      life: 3000,
    });
    router.push(`/matches/${route.params.id}`);
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao salvar times',
      detail: 'Não foi possível salvar os times. Tente novamente.',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  generateTeams();
});

defineOptions({
  name: 'SortedTeams'
});
</script>
