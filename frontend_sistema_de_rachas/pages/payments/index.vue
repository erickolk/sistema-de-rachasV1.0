<template>
  <div class="overview-payments">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Visão Geral de Pagamentos</h1>
      <div class="mb-4">
        <p><strong>Total Recebido:</strong> {{ totalReceived }}</p>
        <p><strong>Total de Partidas:</strong> {{ totalMatches }}</p>
      </div>
      <DataTable :value="payments" class="mt-2">
        <Column field="date" header="Data"></Column>
        <Column field="amount" header="Valor Recebido"></Column>
        <Column field="description" header="Descrição"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const payments = ref([
  {
    date: "2023-06-10",
    amount: 100,
    description: "Pagamento da Partida Amistosa",
  },
  {
    date: "2023-06-11",
    amount: 150,
    description: "Pagamento da Partida de Campeonato",
  },
]);

const totalReceived = payments.value.reduce(
  (sum, payment) => sum + payment.amount,
  0
);
const totalMatches = payments.value.length;
</script>
