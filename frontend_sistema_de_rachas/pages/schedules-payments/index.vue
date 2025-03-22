<template>
  <div class="schedule-payments">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">
        Verificação de Horários e Pagamentos
      </h1>
      <h2 class="mt-4 text-xl font-semibold">Horários Disponíveis</h2>
      <DataTable :value="availableSlots">
        <Column field="date" header="Data"></Column>
        <Column field="time" header="Horário"></Column>
        <Column header="Ações">
          <template #body="slotProps">
            <Button label="Reservar" @click="reserveSlot(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <h2 class="mt-4 text-xl font-semibold">Pagamentos Recebidos</h2>
      <DataTable :value="payments">
        <Column field="date" header="Data"></Column>
        <Column field="amount" header="Valor"></Column>
        <Column field="payer" header="Pagador"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const availableSlots = ref([
  { date: "2023-06-01", time: "10:00" },
  { date: "2023-06-01", time: "12:00" },
]);

const payments = ref([
  { date: "2023-06-01", amount: 100, payer: "Jogador 1" },
  { date: "2023-06-02", amount: 120, payer: "Jogador 2" },
]);

const reserveSlot = (slot) => {
};
</script>
