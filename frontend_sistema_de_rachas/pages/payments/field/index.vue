<template>
  <div class="payments-by-field">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Pagamentos por Campo</h1>
      <DataTable :value="fields" class="mt-2">
        <Column field="name" header="Nome do Campo"></Column>
        <Column field="totalPayments" header="Total Recebido"></Column>
        <Column header="Ações">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-info mr-2"
              @click="viewPayments(slotProps.data.id)"
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

const fields = ref([
  { id: 1, name: "Campo Principal", totalPayments: 500 },
  { id: 2, name: "Campo Secundário", totalPayments: 300 },
]);

const router = useRouter();

const viewPayments = (fieldId) => {
  router.push(`/payments/field/${fieldId}`);
};
</script>
