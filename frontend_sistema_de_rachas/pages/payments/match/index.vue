<template>
  <div class="payments-by-match">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Pagamentos por Partida</h1>
      <DataTable :value="matches" class="mt-2">
        <Column field="name" header="Nome da Partida"></Column>
        <Column field="amount" header="Valor Recebido"></Column>
        <Column header="Ações">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-info mr-2"
              @click="viewMatchPayments(slotProps.data.id)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const matches = ref([
  { id: 1, name: "Partida Amistosa", amount: 100 },
  { id: 2, name: "Partida de Campeonato", amount: 150 },
]);

const router = useRouter();

const viewMatchPayments = (matchId) => {
  router.push(`/payments/match/${matchId}`);
};
</script>
