<template>
  <div>
    <div class="container p-4 mt-8">
      <!-- Dashboard-->
      <div class="mb-16 pb-8 border-b border-b-zinc-700">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Card>
              <template #title>
                <i class="pi pi-map-marker mr-2"></i>Total de Campos
              </template>
              <template #content>{{ userSoccerFields?.length || 0 }}</template>
            </Card>
          </div>
          <div>
            <Card>
              <template #title>
                <i class="pi pi-calendar mr-2"></i>Partidas Agendadas
              </template>
              <template #content>{{ totalMatches }}</template>
            </Card>
          </div>
          <div>
            <Card>
              <template #title>
                <i class="pi pi-check-circle mr-2"></i>Partidas Pagas
              </template>
              <template #content>{{ financialReport.totalMatches }}</template>
            </Card>
          </div>
          <div>
            <Card>
              <template #title>
                <i class="pi pi-money-bill mr-2"></i>Total Recebido
              </template>
              <template #content>{{ formatCurrency(financialReport.totalRevenue) }}</template>
            </Card>
          </div>
          <div>
            <Card>
              <template #title>
                <i class="pi pi-percentage mr-2"></i>Total em Descontos
              </template>
              <template #content>{{ formatCurrency(financialReport.totalDiscounts) }}</template>
            </Card>
          </div>
          <div>
            <Card>
              <template #title>
                <i class="pi pi-clock mr-2"></i>Pagamentos Pendentes
              </template>
              <template #content>{{ financialReport.unpaidMatches }}</template>
            </Card>
          </div>
        </div>
      </div>

      <!-- Meus campos-->
      <div class="mb-8 pb-8 border-b border-b-zinc-700">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-semibold">Meus Campos</h2>

          <RouterLink :to="{ name: 'fields-register' }">
            <Button icon="pi pi-plus" label="Adicionar Campo" />
          </RouterLink>
        </div>

        <DataTable :value="userSoccerFields || []">
          <Column field="name" header="Nome"></Column>
          <Column field="pixKey" header="Chave PIX"></Column>
          <Column field="rentalValue" header="Valor Aluguel"></Column>
          <Column field="workStartTime" header="Início Expediente"></Column>
          <Column field="workFinishTime" header="Fim Expediente"></Column>
          <Column>
            <template #body="slotProps">
              <div class="flex justify-end">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-success mr-2"
                  @click="editField(slotProps.data)"
                ></Button>
                <Button
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger"
                  @click="confirmDelete(slotProps.data)"
                ></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Próximas partidas-->
      <div class="mb-8 pb-8 border-b border-b-zinc-700">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-semibold">Próximas partidas</h2>
        </div>

        <DataTable :value="upcomingMatches" :rows="5">
          <Column field="name" header="Nome"></Column>
          <Column field="date" header="Data"></Column>
          <Column field="startTime" header="Início"></Column>
          <Column field="finishTime" header="Fim"></Column>
          <Column field="field" header="Campo"></Column>
          <Column field="paid" header="Pagamento"></Column>
        </DataTable>
      </div>

      <!-- Partidas não pagas -->
      <div class="mb-8 pb-8 border-b border-b-zinc-700">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-semibold">Pagamentos pendentes</h2>
        </div>

        <DataTable :value="unpaidMatches" :rows="5">
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nome"></Column>
          <Column field="date" header="Data"></Column>
          <Column field="schedules" header="Horário"></Column>
          <Column field="paid" header="Pagamento">
            <template #body="slotProps">
              <Button
                label="Realizar Pagamento"
                @click="openPaymentModal(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Pagamentos realizados -->
      <div class="mb-8 pb-8 border-b border-b-zinc-700">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-semibold">Pagamentos recebidos</h2>
        </div>

        <DataTable :value="payments" :rows="5">
          <Column field="match.id" header="ID da Partida"></Column>
          <Column field="match.name" header="Nome da Partida"></Column>
          <Column field="match.soccerField.name" header="Campo"></Column>
          <Column field="user.name" header="Usuário"></Column>
          <Column field="paymentDate" header="Data de Pagamento"></Column>
          <Column
            field="formattedTotalAmountWithDiscount"
            header="Total"
          ></Column>
          <Column field="paymentMethod" header="Método de Pagamento"></Column>
        </DataTable>
      </div>
    </div>

    <Dialog
      :visible="showDialog"
      @update:visible="showDialog = $event"
      modal
      header="Confirmação de Pagamento"
      class="payment-dialog"
    >
      <div class="p-4">
        <div class="flex gap-6">
          <!-- Informações da Partida -->
          <div class="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">Detalhes da Partida</h3>
            <div class="space-y-4">
              <div>
                <label class="text-sm text-gray-600">Nome da Partida</label>
                <div class="mt-1 p-3 bg-gray-50 rounded-md">
                  {{ selectedMatch.name }}
                </div>
              </div>
              
              <div>
                <label class="text-sm text-gray-600">ID da Partida</label>
                <div class="mt-1 p-3 bg-gray-50 rounded-md font-mono text-sm">
                  {{ selectedMatch.id }}
                </div>
              </div>

              <div>
                <label class="text-sm text-gray-600">Valor Original</label>
                <div class="mt-1 p-3 bg-gray-50 rounded-md font-semibold">
                  {{ formatCurrency(selectedField.rentalValue) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Configuração do Pagamento -->
          <div class="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">Configurar Desconto</h3>
            <div class="space-y-4">
              <div>
                <label class="text-sm text-gray-600">Tipo de Desconto</label>
                <Dropdown
                  v-model="discountType"
                  :options="discountTypes"
                  optionLabel="label"
                  class="w-full mt-1"
                />
              </div>

              <div>
                <label class="text-sm text-gray-600">Valor do Desconto</label>
                <div class="mt-1">
                  <InputNumber
                    v-model="discountValue"
                    :min="0"
                    :max="discountType.value === 'porcentagem' ? 100 : selectedField?.rentalValue"
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    class="w-full"
                    @update:modelValue="validateDiscount"
                  />
                  <small
                    v-if="discountValue > (discountType.value === 'porcentagem' ? 100 : selectedField?.rentalValue)"
                    class="text-red-500 block mt-1"
                  >
                    Desconto máximo permitido:
                    {{ discountType.value === "porcentagem" ? "100%" : formatCurrency(selectedField?.rentalValue) }}
                  </small>
                </div>
              </div>

              <div>
                <label class="text-sm text-gray-600">Total com Desconto</label>
                <div class="mt-1 p-3 bg-emerald-50 rounded-md">
                  <span class="text-lg font-semibold text-emerald-700">
                    {{ formatCurrency(calculateTotalWithDiscount) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <Button
                label="Confirmar Pagamento"
                icon="pi pi-check"
                class="w-full p-button-success"
                @click="handlePayment"
                :disabled="calculateTotalWithDiscount <= 0 || discountValue < 0"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { type PaymentDto } from "sistema-rachas-domain/dto";
import {
  getMatchByUser,
  getUnpaidMatchsByUser,
  makePaymentOwner,
} from "../../services/match.service";
import {
  deleteSoccerField,
  getSoccerFieldById,
  getSoccerFieldsByUser,
} from "../../services/soccer-field.service";
import { fetchPaymentsOwner, fetchFinancialReport } from "../../services/payment.service";

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const userSoccerFields = ref();
const totalMatches = ref(0);
const unpaidMatches = ref<any[]>([]);
const upcomingMatches = ref<any[]>([]);
const fields = ref<any[]>([]);
const payments = ref<Array<PaymentDto>>([]);
const showDialog = ref(false);
const selectedMatch = ref<any>(null);
const discountType = ref({ label: "Valor Fixo", value: "valor" });
const discountValue = ref(0);
const discountTypes = [
  { label: "Valor Fixo", value: "valor" },
  { label: "Porcentagem", value: "porcentagem" },
];

const financialReport = ref({
  totalMatches: 0,
  totalDiscounts: 0,
  totalRevenue: 0,
  unpaidMatches: 0
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const calculateTotalWithDiscount = computed(() => {
  const rentalValue = selectedField.value?.rentalValue || 0;
  let total = rentalValue;

  if (discountType.value.value === "porcentagem") {
    const percentual = Math.min(discountValue.value, 100);
    total = rentalValue * (1 - percentual / 100);
  } else {
    const desconto = Math.min(discountValue.value, rentalValue);
    total = rentalValue - desconto;
  }

  return Math.max(total, 0);
});

const selectedField = ref();

const validateDiscount = () => {
  if (discountValue.value < 0) {
    discountValue.value = 0;
    toast.add({
      severity: "warn",
      summary: "Valor inválido",
      detail: "O desconto não pode ser negativo",
      life: 3000,
    });
  }

  if (discountType.value.value === "porcentagem" && discountValue.value > 100) {
    discountValue.value = 100;
    toast.add({
      severity: "warn",
      summary: "Valor inválido",
      detail: "O desconto máximo é 100%",
      life: 3000,
    });
  }
};

const editField = (field: any): void => {
  router.push(`/fields/${field.id}/edit`);
};

const formatTime = (time: any): string => {
  if (!time) return "Hora não disponível";
  
  // Se for um objeto com hours e minutes
  if (typeof time === 'object' && 'hours' in time && 'minutes' in time) {
    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  // Se for uma string no formato HH:mm
  if (typeof time === 'string') {
    return time.substring(0, 5);
  }
  
  return "Hora não disponível";
};

const formatDateToBR = (dateString: string): string => {
  if (!dateString) return "Data não disponível";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Data não disponível";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return "Data não disponível";
  }
};

const loadOwnerUnpaidMatchs = async (): Promise<void> => {
  try {
    const response = await getUnpaidMatchsByUser();
    if (response && Array.isArray(response)) {
      unpaidMatches.value = response
        .filter(
          (match) => match && match.schedules && match.schedules.length > 0
        )
        .sort((a, b) => {
          const dateA = a.schedules[0]?.day
            ? new Date(a.schedules[0].day).getTime()
            : 0;
          const dateB = b.schedules[0]?.day
            ? new Date(b.schedules[0].day).getTime()
            : 0;
          return dateA - dateB;
        })
        .map((match) => {
          const schedule = match.schedules[0];
          return {
            id: match.id,
            name: match.name || "Nome não disponível",
            date: formatDateToBR(schedule?.day) || "Data não disponível",
            schedules: `${formatTime(schedule?.startTime)} às ${formatTime(
              schedule?.finishTime
            )}`,
            startTime: formatTime(schedule?.startTime),
            finishTime: formatTime(schedule?.finishTime),
            field: match.soccerField || "Campo não especificado",
            paid: match.paid,
            user: match.user,
          };
        });
    }
  } catch (error) {
    console.error("Erro ao carregar partidas não pagas:", error);
    unpaidMatches.value = [];
  }
};

const loadOwnerMatches = async (): Promise<void> => {
  try {
    const response = await getMatchByUser();
    if (response && Array.isArray(response)) {
      totalMatches.value = response.length;
      upcomingMatches.value = response
        .filter(
          (match) => match && match.schedules && match.schedules.length > 0
        )
        .sort((a, b) => {
          const dateA = a.schedules[0]?.day
            ? new Date(a.schedules[0].day).getTime()
            : 0;
          const dateB = b.schedules[0]?.day
            ? new Date(b.schedules[0].day).getTime()
            : 0;
          return dateA - dateB;
        })
        .map((match) => {
          const schedule = match.schedules[0];
          return {
            name: match.name || "Nome não disponível",
            date: formatDateToBR(schedule?.day) || "Data não disponível",
            startTime: formatTime(schedule?.startTime),
            finishTime: formatTime(schedule?.finishTime),
            field: match.soccerField?.name || "Campo não especificado",
            paid: match.paid,
          };
        });
    }
  } catch (error) {
    console.error("Erro ao carregar partidas:", error);
    upcomingMatches.value = [];
  }
};

const openPaymentModal = async (match: any): Promise<void> => {
  selectedMatch.value = match;
  if (selectedMatch.value && selectedMatch.value.field) {
    selectedField.value = await getSoccerFieldById(
      selectedMatch.value.field._id
    );
  }
  showDialog.value = true;
};

const handlePayment = async () => {
  try {
    const rentalValue = selectedField.value.rentalValue;
    let discountInReais = 0;

    // Calcula o desconto em reais
    if (discountType.value.value === "porcentagem") {
      const percentual = Math.min(discountValue.value, 100);
      discountInReais = rentalValue * (percentual / 100);
    } else {
      discountInReais = Math.min(discountValue.value, rentalValue);
    }

    const paymentData = {
      paymentDate: new Date().toISOString(),
      paymentMethod: "pix",
      match: selectedMatch.value.id,
      user: selectedMatch.value.user.id,
      amount: rentalValue,
      discount: discountInReais,
      totalAmountWithDiscount: calculateTotalWithDiscount.value,
    };

    await makePaymentOwner(paymentData);
    await loadOwnerUnpaidMatchs();
    const result = await fetchPaymentsOwner();
    payments.value = result.data;
    await loadFinancialReport();
    showDialog.value = false;

    toast.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Pagamento confirmado com sucesso!",
      life: 3000,
    });
  } catch (error) {
    console.error("Erro ao realizar pagamento:", error);
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Não foi possível realizar o pagamento. Tente novamente.",
      life: 3000,
    });
  }
};

const confirmDelete = (field: any): void => {
  confirm.require({
    message: "Você tem certeza que deseja excluir este item?",
    header: "Confirmação",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Confirmar",
    rejectLabel: "Cancelar",
    acceptClass: "p-button-primary",
    rejectClass: "p-button-secondary",
    accept: async () => {
      try {
        await deleteSoccerField(field.id);
        fields.value = fields.value.filter((f) => f.id !== field.id);
      } catch (error) {
        console.error("Erro ao deletar campo", error);
      }
    },
  });
};

const loadFinancialReport = async () => {
  try {
    const { data } = await fetchFinancialReport();
    if (data) {
      financialReport.value = {
        totalMatches: data.totalMatches || 0,
        totalDiscounts: data.totalDiscounts || 0,
        totalRevenue: data.totalRevenue || 0,
        unpaidMatches: data.unpaidMatches || 0
      };
    } else {
      // Define valores padrão para novo usuário
      financialReport.value = {
        totalMatches: 0,
        totalDiscounts: 0,
        totalRevenue: 0,
        unpaidMatches: 0
      };
    }
  } catch (error) {
    console.error('Erro ao carregar relatório financeiro:', error);
    // Define valores padrão em caso de erro
    financialReport.value = {
      totalMatches: 0,
      totalDiscounts: 0,
      totalRevenue: 0,
      unpaidMatches: 0
    };
  }
};

onMounted(async () => {
  try {
    await loadOwnerMatches();
    await loadOwnerUnpaidMatchs();
    try {
      const result = await fetchPaymentsOwner();
      payments.value = result?.data || [];
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
      payments.value = [];
    }
    
    try {
      userSoccerFields.value = await getSoccerFieldsByUser();
    } catch (error) {
      console.error('Erro ao carregar campos:', error);
      userSoccerFields.value = [];
    }
    
    await loadFinancialReport();
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
  }
});
</script>

<style scoped>
.payment-dialog :deep(.p-dialog-header) {
  background: #4CAF50;
  color: white;
  padding: 1rem !important;
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

:deep(.p-inputnumber-input) {
  width: 100%;
}

@media (max-width: 640px) {
  .flex {
    flex-direction: column;
  }
}
</style>
