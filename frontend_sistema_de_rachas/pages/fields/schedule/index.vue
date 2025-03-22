<template>
  <div class="field-schedule">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Horários do Campo</h1>
      <div class="mb-4">
        <label for="fieldSelect" class="block mb-2">Selecione um Campo:</label>
        <Dropdown
          id="fieldSelect"
          v-model="selectedField"
          :options="fields"
          optionLabel="name"
          optionValue="id"
          placeholder="Selecione um campo"
          class="w-full"
          @change="loadSchedules"
        />
      </div>
      <div v-if="schedules.length > 0">
        <h2 class="text-xl font-semibold mb-2">Disponibilidade</h2>
        <div v-for="(schedule, index) in schedules" :key="index" class="mb-4">
          <h3 class="font-bold">{{ schedule.date }}</h3>
          <ul class="list-disc pl-4">
            <li v-for="range in schedule.ranges" :key="range.start">
              {{ range.start }} - {{ range.end }}:
              <span v-if="range.available" class="text-green-600"
                >Disponível</span
              >
              <span v-else class="text-red-600">Indisponível</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>Nenhum horário disponível para o campo selecionado.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";

const fields = ref([
  { id: 1, name: "Campo Principal" },
  { id: 2, name: "Campo Secundário" },
]);

const selectedField = ref(null);
const schedules = ref([]);

const loadSchedules = () => {
  if (selectedField.value) {
    schedules.value = [
      {
        date: "2023-06-10",
        ranges: [
          { start: "08:00", end: "10:00", available: true },
          { start: "10:00", end: "12:00", available: false },
          { start: "14:00", end: "16:00", available: true },
        ],
      },
      {
        date: "2023-06-11",
        ranges: [
          { start: "08:00", end: "10:00", available: false },
          { start: "10:00", end: "12:00", available: true },
          { start: "14:00", end: "16:00", available: true },
        ],
      },
    ];
  } else {
    schedules.value = [];
  }
};
</script>
