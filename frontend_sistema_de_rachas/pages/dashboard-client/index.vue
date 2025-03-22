<template>
  <div>
    <PageContainer>
      <!-- <PageBreadcrumb :items="breadcrumbItems" /> -->

      <PageSection title="Minhas Partidas">
        <template #action>
          <Button
            label="Criar Partida"
            icon="pi pi-plus"
            class="p-button-success"
            to="/matches/create"
            as="router-link"
          />
        </template>

        <template #content>
          <div v-if="myMatches.length === 0" class="text-center p-4">
            <p class="text-gray-600">
              Você ainda não tem nenhuma partida cadastrada.
            </p>
            <p class="text-gray-600">Clique em "Criar Partida" para começar!</p>
          </div>

          <DataTable
            v-else
            :value="myMatches"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
          >
            <Column field="name" header="Nome"></Column>
            <Column header="Horários">
              <template #body="slotProps">
                <div
                  class="grid grid-cols-4 gap-x-2 gap-y-1"
                  v-if="!!slotProps.data.schedules?.length"
                >
                  <Chip
                    v-for="(schedule, index) in slotProps.data.schedules"
                    :key="index"
                    class="flex flex-col"
                  >
                    <div class="text-xs font-bold leading-none">
                      {{ schedule.day }}
                    </div>
                    <div class="text-xs leading-none">
                      {{ schedule.startTime }} até
                      {{ schedule.finishTime }}
                    </div>
                  </Chip>
                </div>
              </template>
            </Column>
            <Column header="Pagamento">
              <template #body="slotProps">
                <div>
                  <span>{{
                    slotProps.data.paid ? "Realizado" : "Não Realizado"
                  }}</span>
                  <Button
                    v-if="!slotProps.data.paid"
                    size="small"
                    severity="primary"
                    class="ml-4"
                    style="padding: 6px"
                    @click="openPaymentModal(slotProps.data)"
                  >
                    Pagar agora
                  </Button>
                </div>
              </template>
            </Column>
            <Column header="Campo">
              <template #body="slotProps">
                {{ slotProps.data.soccerField?.name }}
              </template>
            </Column>
            <Column header="Ações">
              <template #body="slotProps">
                <div class="flex gap-x-2">
                  <Button
                    icon="pi pi-external-link"
                    class="p-button-rounded p-button-primary"
                    v-tooltip.top="'Visualizar/Editar Partida'"
                    @click="viewMatch(slotProps.data)"
                  />
                  <Button
                    icon="pi pi-times"
                    class="p-button-rounded p-button-danger"
                    v-tooltip.top="'Excluir Partida'"
                    @click="confirmDelete(slotProps.data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </PageSection>
    </PageContainer>

    <Dialog 
      :visible="displayModal"
      @update:visible="(val) => displayModal = val"
      modal 
      header="Pagamento da Partida"
      class="payment-dialog"
      @show="onDialogShow"
    >
      <div class="p-4">
        <div class="flex gap-4 items-stretch">
          <div class="bg-white rounded-lg p-4 shadow-md">
            <h3 class="text-lg font-semibold mb-2 text-center">QR Code PIX</h3>
            <div class="flex justify-center items-center bg-white p-2 rounded-lg">
              <canvas ref="qrCodeCanvas"></canvas>
            </div>
          </div>

          <div class="flex-1 flex flex-col justify-between bg-white rounded-lg p-4 shadow-md">
            <div>
              <div class="flex flex-col items-center">
                <h3 class="text-lg font-semibold mb-2">Chave PIX</h3>
                <div class="flex items-center justify-center gap-4 bg-white px-6 py-3 rounded-md border border-gray-200 min-w-[280px] h-[45px] shadow-sm">
                  <p class="text-base font-medium">
                    {{ selectedMatch?.soccerField?.pixKey }}
                  </p>
                  <Button
                    @click="copyPixCode"
                    icon="pi pi-copy"
                    class="p-button-text p-button-rounded"
                    v-tooltip.top="'Copiar Chave PIX'"
                  />
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <p class="text-center font-medium text-gray-700 text-sm mb-2">
                Após realizar o pagamento, envie o comprovante:
              </p>
              <Button
                @click="sendWhatsApp"
                class="whatsapp-button w-full"
                label="Enviar Comprovante via WhatsApp"
                icon="pi pi-whatsapp"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Chip from "primevue/chip";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import type { MatchDto } from "sistema-rachas-domain/dto";
import QRCode from "qrcode";
import type { MatchWithRelationsDto } from "../../types/match.type";
import { getMatchByUser, deleteMatch } from "../../services/match.service";

const confirm = useConfirm();
const toast = useToast();
const myMatches = ref<MatchDto[]>([]);
const router = useRouter();
const displayModal = ref(false);
const selectedMatch = ref<MatchDto | null>(null);
const qrCodeCanvas = ref<HTMLCanvasElement | null>(null);

const ownerPhoneNumber = "5582999915223";

const formatarData = (data: string) => {
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatarHora = (hora: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  if (!hora) return "";

  const horaFormatada = `${String(hora.hours).padStart(2, "0")}:${String(
    hora.minutes
  ).padStart(2, "0")}`;
  return horaFormatada;
};

function onDialogShow() {
  console.log("Dialog shown");
  nextTick(() => {
    generateQRCode();
  });
}

function openPaymentModal(match: MatchDto) {
  console.log("Abrindo modal de pagamento", match);
  selectedMatch.value = match;
  nextTick(() => {
    displayModal.value = true;
    console.log("Estado do modal após nextTick:", displayModal.value);
  });
}

function generateQRCode() {
  console.log("Gerando QR Code...");
  if (!qrCodeCanvas.value || !selectedMatch.value?.soccerField?.pixKey) {
    console.log("Faltando dados para gerar QR Code");
    return;
  }

  const pixKey = selectedMatch.value.soccerField.pixKey;

  try {
    QRCode.toCanvas(
      qrCodeCanvas.value,
      pixKey,
      {
        width: 180,
        errorCorrectionLevel: "H",
        margin: 2,
      },
      (error: any) => {
        if (error) {
          console.error("Erro ao gerar QR Code:", error);
          return;
        }
        console.log("QR Code gerado com sucesso!");
      }
    );
  } catch (error) {
    console.error("Erro ao tentar gerar QR Code:", error);
  }
}

function copyPixCode() {
  if (!selectedMatch.value?.soccerField?.pixKey) return;

  navigator.clipboard
    .writeText(selectedMatch.value.soccerField.pixKey)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Código PIX copiado!",
        life: 3000,
      });
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao copiar código",
        life: 3000,
      });
    });
}

function sendWhatsApp() {
  if (!selectedMatch.value) return;

  const message = `Comprovante de pagamento da partida: ${selectedMatch.value.name}`;
  const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text="${encodeURIComponent(
    message
  )}"`;
  window.open(whatsappUrl, "_blank");
}

async function loadMatches() {
  try {
    const response = await getMatchByUser();
    myMatches.value = Array.isArray(response) ? response : [];
    console.log("Match data:", myMatches.value);

    if (
      myMatches.value.length > 0 &&
      myMatches.value[0].schedules?.length > 0
    ) {
      console.log("Match Schedules:", myMatches.value[0].schedules[0].day);
    }
  } catch (error) {
    console.error("Erro ao carregar partidas:", error);
    myMatches.value = [];

    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Não foi possível carregar as partidas",
      life: 3000,
    });
  }
}

const viewMatch = (match: MatchWithRelationsDto) => {
  router.push(`/matches/${match.id}`);
};

const editMatch = (match: MatchWithRelationsDto) => {
  router.push(`/matches/${match.id}`);
};

const confirmDelete = (match: any) => {
  confirm.require({
    message: "Você tem certeza que deseja excluir esta partida?",
    header: "Confirmação de Exclusão",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Não",
    rejectLabel: "Sim",
    acceptClass: "p-button-secondary",
    rejectClass: "p-button-danger",
    reject: () => deleteMatchHandler(match.id),
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Cancelado",
        detail: "Exclusão cancelada",
        life: 3000,
      });
    },
  });
};

const deleteMatchHandler = async (id: string) => {
  try {
    await deleteMatch(id);
    myMatches.value = myMatches.value.filter((m: any) => m.id !== id);
    toast.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Partida excluída com sucesso",
      life: 3000,
    });
  } catch (error) {
    console.error("Erro ao excluir partida:", error);
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Não foi possível excluir a partida",
      life: 3000,
    });
  }
};

const createMatch = () => {
  router.push("/matches/create");
};

onMounted(async () => {
  await loadMatches();
  console.log(`matches`, myMatches.value);
});
</script>

<style scoped>
.payment-dialog :deep(.p-dialog-header) {
  background: #4CAF50;
  color: white;
  padding: 1rem !important;
}

.whatsapp-button {
  background: #25D366 !important;
  border: none !important;
  transition: all 0.3s ease;
}

.whatsapp-button:hover {
  background: #128C7E !important;
  transform: translateY(-1px);
}

:deep(.p-dialog-content) {
  padding: 0 !important;
  background: #f0f2f5;
}

:deep(.p-dialog) {
  border-radius: 12px;
  overflow: hidden;
  max-width: 90vw;
  width: auto !important;
}

:deep(.p-dialog-header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 640px) {
  .flex {
    flex-direction: column;
  }
  
  canvas {
    max-width: 100%;
    height: auto;
  }
}
</style>
