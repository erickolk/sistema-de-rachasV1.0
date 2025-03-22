<template>
  <div class="field-settings">
    <div
      class="container mx-auto flex flex-col items-center pt-8 px-16 max-w-screen-lg"
    >
      <h1 class="text-2xl font-bold mb-4">Configurações do Campo</h1>
      <form @submit.prevent="handleSave" class="w-full">
        <div class="gap-y-4 flex flex-col">
          <div class="flex gap-x-2 border border-custom rounded-md p-4">
            <div>
              <label class="block mb-2" for="fieldName">Nome do Campo:</label>
              <InputText
                id="fieldName"
                type="text"
                v-model="field.name"
                class="border p-2 w-full"
                required
              />
              <p v-if="nameError" class="text-red-500 text-sm">
                {{ nameError }}
              </p>
            </div>
            <div>
              <label class="block mb-2" for="pixKey">Chave PIX:</label>
              <InputText
                id="pixKey"
                type="text"
                v-model="field.pixKey"
                class="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label class="block mb-2" for="price">Preço por Hora:</label>
              <InputText
                id="price"
                type="number"
                v-model="field.price"
                class="border p-2 w-full"
                required
              />
              <p v-if="priceError" class="text-red-500 text-sm">
                {{ priceError }}
              </p>
            </div>
          </div>
          <div class="border border-custom rounded-md p-4">
            <label class="block mb-2">Dias Disponíveis:</label>
            <div class="flex gap-2">
              <div
                v-for="day in daysOfWeek"
                :key="day"
                class="flex items-center"
              >
                <Checkbox
                  :id="`day-${day}`"
                  v-model="field.availableDays"
                  :value="day"
                  class="mr-2"
                />
                <label :for="`day-${day}`" class="cursor-pointer">{{
                  day.charAt(0).toUpperCase() + day.slice(1)
                }}</label>
              </div>
            </div>
          </div>
          <div class="border border-custom rounded-md p-4">
            <label class="block mb-2">Horário de Funcionamento:</label>
            <div class="flex gap-2 items-center">
              <InputText
                type="time"
                v-model="field.workTime.start"
                class="border p-2 w-2/5"
                required
              />
              <span>-</span>
              <InputText
                type="time"
                v-model="field.workTime.end"
                class="border p-2 w-2/5"
                required
              />
            </div>
          </div>

          <Button label="Salvar" type="submit" class="w-1/4 self-end" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import {
  getSoccerFieldById,
  updateSoccerField,
} from '~/services/soccer-field.service';

const daysOfWeek = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
  'domingo',
];

const field = ref({
  name: '',
  pixKey: '',
  price: 0,
  availableDays: [],
  workTime: {
    start: '',
    end: '',
  },
});

const nameError = ref('');
const priceError = ref('');
const fieldData = ref(null);
const route = useRoute();
const id = route.params.id;
const toast = useToast();
const router = useRouter();

const fetchSoccerField = async () => {
  try {
    const data = await getSoccerFieldById(id);
    fieldData.value = data;
    if (data) {
      field.value = {
        name: data.name,
        pixKey: data.pixKey,
        price: data.rentalValue,
        availableDays: data.workDays,
        workTime: {
          start: data.workStartTime.slice(0, 5),
          end: data.workFinishTime.slice(0, 5),
        },
      };
    }
  } catch (error) {
    console.error('Erro ao buscar dados do campo:', error);
  }
};
const handleSave = async () => {
  try {
    if (!field.value.name || !field.value.pixKey || field.value.price <= 0) {
      if (!field.value.name) nameError.value = 'O nome do campo é obrigatório.';
      if (field.value.price <= 0)
        priceError.value = 'O preço deve ser um número positivo.';
      return;
    }

    const updateData = {
      name: field.value.name,
      pixKey: field.value.pixKey,
      rentalValue: field.value.price,
      workDays: field.value.availableDays,
      workStartTime: `${field.value.workTime.start}:00`,
      workFinishTime: `${field.value.workTime.end}:00`,
    };

    const { status } = await updateSoccerField(id, updateData);

    if (status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Campo atualizado com sucesso!',
        life: 3000,
      });

      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Erro ao atualizar campo:', error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao atualizar o campo',
      life: 3000,
    });
  }
};

onMounted(async () => {
  await fetchSoccerField();
});
</script>
