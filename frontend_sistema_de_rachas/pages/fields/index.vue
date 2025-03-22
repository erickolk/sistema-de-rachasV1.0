<template>
  <div class="my-fields">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Meus Campos</h1>
      <Button
        label="Adicionar Campo"
        @click="addField"
        class="mb-4 bg-blue-600"
      />
      <DataTable :value="fields" class="mt-2">
        <Column field="name" header="Nome do Campo"></Column>
        <Column field="location" header="Localização"></Column>
        <Column field="rentalValue" header="Valor por Hora"></Column>
        <Column field="pixKey" header="Chave Pix"></Column>
        <Column field="workDays" header="Dias de Funcionamento">
          <template #body="slotProps">
            <span>{{ slotProps.data.workDays.join(", ") }}</span>
          </template>
        </Column>
        <Column field="workStartTime" header="Hora Início"></Column>
        <Column field="workFinishTime" header="Hora Término"></Column>
        <Column header="Ações">
          <template #body="slotProps">
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
            <ConfirmDialog ref="confirmPopup"></ConfirmDialog>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import {
  deleteSoccerField,
  getSoccerFieldsByUser,
} from "../../services/soccer-field.service";
import type { SoccerFieldDto } from "sistema-rachas-domain/dto";
import type { DayOfWeek } from "sistema-rachas-domain/object-values/day";
import { getUserProfile } from "../../services/auth.service";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";

type Field =
  | SoccerFieldDto
  | {
      id: string;
      pixKey: string;
      name: string;
      rentalValue: number;
      workDays: DayOfWeek[];
      workStartTime: string;
      workFinishTime: string;
    };

const fields = ref<Field[]>([]);

const router = useRouter();
const confirm = useConfirm();
const confirmPopup = ref<InstanceType<typeof ConfirmPopup> | null>(null);

const loadFields = async () => {
  console.log("Carregando campos...");
  try {
    const response = await getSoccerFieldsByUser();
    console.log("Resposta da API:", response);

    if (Array.isArray(response)) {
      fields.value = response;
      console.log("Campos carregados:", fields.value);
    } else {
      console.error("Nenhum campo encontrado ou formato inválido");
    }
  } catch (error) {
    console.error("Erro ao carregar campos:", error);
  }
};
onMounted(() => {
  loadFields();
  const user = ref();
  const userProfile = async () => {
    const profileData = await getUserProfile();
    user.value = profileData;
  };
  console.log("Perfil atual", user.value);
});

const addField = () => {
  router.push("fields/register");
};

const editField = (field: any) => {
  router.push(`/fields/${field.id}/edit`);
};

const confirmDelete = (field: any) => {
  confirm.require({
    message: "Você tem certeza que deseja excluir este item?",
    header: "Confirmação",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: 'Confirmar',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-primary',
    rejectClass: 'p-button-secondary',
    accept: async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          throw new Error("Token não encontrado. Faça login novamente.");
        }

        const response = await deleteSoccerField(field.id);
        console.log("Campo deletado com sucesso:", response);
        fields.value = fields.value.filter((f: any) => f.id !== field.id);
        alert(`Campo "${field.name}" apagado.`);
      } catch (error) {
        console.error("Erro ao deletar campo", error);
      }
      console.log("Item excluído");
    },
    reject: () => {
      console.log("Exclusão cancelada");
    },
  });
};
</script>
