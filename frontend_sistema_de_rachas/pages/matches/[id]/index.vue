<template>
  <PageContainer>
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-6">
        <NuxtLink
          to="/dashboard-client"
          class="flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
        >
          <i class="pi pi-arrow-left" /> Voltar
        </NuxtLink>
        <h1 class="text-2xl font-bold text-center flex-1">
          {{ isEditing ? 'Editar Partida' : currentMatch?.name }}
        </h1>
        <div class="flex gap-x-2">
          <Button
            v-if="!isEditing"
            :label="'Editar'"
            :icon="'pi pi-pencil'"
            @click="toggleEditing"
          />
          <Button
            v-else
            severity="secondary"
            :label="'Cancelar'"
            :icon="'pi pi-times'"
            @click="cancelEditing"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <i class="pi pi-spin pi-spinner text-4xl"></i>
      </div>

      <!-- View Mode -->
      <div v-else-if="!isEditing && currentMatch" class="flex flex-col gap-4">
        <FormSection title="Informações da Partida">
          <template #content>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <h2 class="text-sm font-medium text-black/70 mb-1">Nome da Partida:</h2>
                <p class="text-base">{{ currentMatch.name }}</p>
              </div>
              <div>
                <h2 class="text-sm font-medium text-black/70 mb-1">Descrição:</h2>
                <p class="text-base">{{ currentMatch.description }}</p>
              </div>
              <div>
                <h2 class="text-sm font-medium text-black/70 mb-1">Campo:</h2>
                <p class="text-base">{{ currentMatch.soccerField?.name }}</p>
              </div>
            </div>
          </template>
        </FormSection>

        <FormSection title="Horário da Partida">
          <template #content>
            <div class="flex flex-wrap gap-2">
              <Chip v-for="(schedule, index) in currentMatch.schedules" :key="index" class="max-w-full">
                <p class="text-sm truncate">
                  {{ schedule.day }} das {{ schedule.startTime }} até {{ schedule.finishTime }}
                </p>
              </Chip>
            </div>
          </template>
        </FormSection>

        <FormSection title="Pagamento">
          <template #content>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-4">
                <div>
                  <h2 class="text-sm font-medium text-black/70 mb-1">Chave Pix:</h2>
                  <p class="text-base">{{ currentMatch.soccerField?.pixKey }}</p>
                </div>
                <div class="flex gap-x-2">
                  <Button
                    label="Copiar Chave Pix"
                    icon="pi pi-copy"
                    severity="secondary"
                    @click="copyPixCode"
                  />
                  <Button
                    label="Ver QR Code"
                    icon="pi pi-qrcode"
                    severity="secondary"
                    @click="showQRCodeModal"
                  />
                </div>
              </div>
            </div>
          </template>
        </FormSection>

        <FormSection title="Participantes">
          <template #content>
            <div class="flex flex-col gap-4">
              <div>
                <h3 class="text-sm font-medium text-black/70 mb-2">Jogadores</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  <div v-for="player in currentMatch.players" :key="player.id" class="bg-black/5 rounded p-2">
                    <Player
                      :player="player"
                      :playerPositionAbbreviations="playerPositionAbbreviations"
                      :showRemove="false"
                      :is-editable="false"
                    />
                  </div>
                </div>
              </div>

              <div v-if="currentMatch.teams?.length">
                <h3 class="text-sm font-medium text-black/70 mb-2">Times</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="(team, index) in currentMatch.teams" :key="index" class="bg-black/5 rounded p-3">
                    <div class="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                      <h4 class="font-medium">{{ team.name }}</h4>
                      <span class="text-xs bg-emerald-400 text-zinc-950 px-2 py-1 rounded">
                        {{ countPlayerStars(team) }} estrelas
                      </span>
                    </div>
                    <div class="grid gap-2">
                      <Player
                        v-for="(player, playerIndex) in team.players"
                        :key="playerIndex"
                        :player="player"
                        :playerPositionAbbreviations="playerPositionAbbreviations"
                        :showRemove="false"
                        :is-editable="false"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <Button
                  label="Sortear times"
                  icon="pi pi-star"
                  class="mt-4"
                  @click="handleDrawTeams"
                />
              </div>
            </div>
          </template>
        </FormSection>

        <div class="flex justify-end gap-4 mt-4">
          <Button
            label="Excluir"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDelete"
          />
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else-if="isEditing && currentMatch">
        <MatchForm
          :initial-data="currentMatch"
          @save="handleSave"
          @cancel="cancelEditing"
        />
      </div>

      <div v-else class="text-center text-lg">Carregando partida...</div>

      <!-- QR Code Modal -->
      <Dialog
        v-model="qrCodeModalVisible"
        header="QR Code Pix"
        :modal="true"
        :closable="true"
        :style="{ width: '400px' }"
      >
        <div class="flex flex-col items-center gap-4 p-4">
          <p class="font-medium text-lg text-center">
            Escaneie o QR Code para realizar o pagamento
          </p>
          <div class="qr-code-container bg-white p-4 rounded-lg shadow-md">
            <canvas
              v-if="qrCodeModalVisible"
              ref="qrCodeCanvas"
              class="w-48 h-48"
            ></canvas>
            <div v-else class="w-48 h-48 flex items-center justify-center">
              Gerando QR Code...
            </div>
          </div>
          <p class="text-sm text-gray-600 text-center">
            Chave Pix: {{ currentMatch?.soccerField?.pixKey }}
          </p>
        </div>
      </Dialog>

      <!-- Confirm Delete Modal -->
      <Dialog
        v-model="deleteConfirmVisible"
        header="Confirmar Exclusão"
        :modal="true"
        :closable="true"
        :style="{ width: '400px' }"
      >
        <div class="flex flex-col gap-4 p-4">
          <p>Tem certeza que deseja excluir esta partida?</p>
          <div class="flex justify-end gap-x-2">
            <Button
              label="Cancelar"
              severity="secondary"
              @click="deleteConfirmVisible = false"
            />
            <Button
              label="Excluir"
              severity="danger"
              @click="handleDelete"
            />
          </div>
        </div>
      </Dialog>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import QRCode from 'qrcode';
import type { MatchWithRelationsDto } from '../../../types/match.type';
import { getMatchById, deleteMatch } from '../../../services/match.service';
import { generateTeamsByPlayerStars } from '../../../services/team.service';
import MatchForm from '../_partials/components/MatchForm.vue';
import FormSection from '~/components/FormSection.vue';
import Chip from 'primevue/chip';
import Player from '~/components/Player.vue';
import { PlayerPositionsEnum } from 'sistema-rachas-domain/enums';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const confirm = useConfirm();

const currentMatch = ref<MatchWithRelationsDto | null>(null);
const isLoading = ref(true);
const isEditing = ref(false);
const qrCodeModalVisible = ref(false);
const qrCodeCanvas = ref<HTMLCanvasElement | null>(null);
const deleteConfirmVisible = ref(false);
const matchId = route.params.id as string;

const playerPositionAbbreviations: Record<PlayerPositionsEnum, string> = {
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

const countPlayerStars = (team: { players: Array<{ stars: number }> }) => {
  return team.players.reduce((acc, player) => acc + (player.stars || 1), 0);
};

async function fetchMatchById() {
  try {
    isLoading.value = true;
    const response = await getMatchById(matchId);
    currentMatch.value = response;
  } catch (error) {
    console.error("Erro ao buscar a partida:", error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível carregar a partida',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

function toggleEditing() {
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
}

async function handleSave(updatedMatch: MatchWithRelationsDto) {
  currentMatch.value = updatedMatch;
  isEditing.value = false;
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Partida atualizada com sucesso!',
    life: 3000,
  });
}

function copyPixCode() {
  if (!currentMatch.value?.soccerField?.pixKey) return;
  
  navigator.clipboard.writeText(currentMatch.value.soccerField.pixKey);
  toast.add({
    severity: 'success',
    summary: 'Copiado',
    detail: 'Chave Pix copiada para a área de transferência!',
    life: 3000,
  });
}

function showQRCodeModal() {
  qrCodeModalVisible.value = true;
}

async function generateQRCode() {
  if (!qrCodeCanvas.value || !currentMatch.value?.soccerField?.pixKey) {
    console.error("Canvas ou chave PIX não disponível");
    return;
  }

  try {
    await QRCode.toCanvas(qrCodeCanvas.value, currentMatch.value.soccerField.pixKey, {
      width: 192,
      margin: 1,
    });
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível gerar o QR Code',
      life: 3000,
    });
  }
}

watch(qrCodeModalVisible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      generateQRCode();
    });
  }
});

async function handleDrawTeams() {
  try {
    const response = await generateTeamsByPlayerStars(matchId);
    router.push({
      name: 'matches-id-sorted_times',
      params: { id: matchId },
      query: { teams: JSON.stringify(response.data) },
    });
  } catch (error: any) {
    console.error("Erro ao sortear times:", error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.response?.data || 'Erro ao sortear os times',
      life: 3000,
    });
  }
}

function confirmDelete() {
  deleteConfirmVisible.value = true;
}

async function handleDelete() {
  try {
    await deleteMatch(matchId);
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Partida excluída com sucesso!',
      life: 3000,
    });
    router.push('/dashboard-client');
  } catch (error) {
    console.error("Erro ao excluir partida:", error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível excluir a partida',
      life: 3000,
    });
  } finally {
    deleteConfirmVisible.value = false;
  }
}

onMounted(() => {
  fetchMatchById();
});
</script> 