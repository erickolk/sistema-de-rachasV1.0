<template>
  <div class="register-field">
    <div class="flex flex-col pt-8 px-16 max-w-screen-lg mx-auto">
      <div class="flex items-center justify-between mb-6">
        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
        >
          <i class="pi pi-arrow-left" /> Voltar
        </NuxtLink>
        <h1 class="text-xl font-bold text-center flex-1">Registrar Novo Campo</h1>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-6">
        <FormSection title="Informações do Campo">
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="name" class="block font-medium mb-2">Nome do Campo</label>
                <InputText id="name" v-model="name" class="w-full" />
                <span class="text-red-500 text-sm">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="rentalValue" class="block font-medium mb-2">Valor de Aluguel por Hora</label>
                <InputNumber
                  id="rentalValue"
                  v-model="rentalValue"
                  mode="currency"
                  currency="BRL"
                  class="w-full"
                />
                <span class="text-red-500 text-sm">{{ errors.rentalValue }}</span>
              </div>

              <div class="form-group">
                <label for="pixKey" class="block font-medium mb-2">Chave Pix</label>
                <InputText id="pixKey" v-model="pixKey" class="w-full" />
                <span class="text-red-500 text-sm">{{ errors.pixKey }}</span>
              </div>
            </div>
          </template>
        </FormSection>

        <FormSection title="Horário de Funcionamento">
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="workStartTime" class="block font-medium mb-2">Horário de Início</label>
                <InputText
                  id="workStartTime"
                  v-model="workStartTime"
                  class="w-full"
                  placeholder="HH:MM:SS"
                />
                <span class="text-red-500 text-sm">{{ errors.workStartTime }}</span>
              </div>

              <div class="form-group">
                <label for="workFinishTime" class="block font-medium mb-2">Horário de Término</label>
                <InputText
                  id="workFinishTime"
                  v-model="workFinishTime"
                  class="w-full"
                  placeholder="HH:MM:SS"
                />
                <span class="text-red-500 text-sm">{{ errors.workFinishTime }}</span>
              </div>

              <div class="form-group md:col-span-2">
                <label for="workDays" class="block font-medium mb-2">Dias de Trabalho</label>
                <InputText
                  id="workDays"
                  v-model.trim="workDays"
                  placeholder='Ex: "segunda, terça, quarta"'
                  class="w-full"
                />
                <span class="text-red-500 text-sm">{{ errors.workDays }}</span>
              </div>
            </div>
          </template>
        </FormSection>

        <div class="flex justify-end">
          <Button
            :label="loading ? 'Registrando...' : 'Registrar Campo'"
            :disabled="loading"
            type="submit"
            icon="pi pi-check"
            class="w-full md:w-1/4"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { registerSoccerFieldScheema } from './partials/validation';
import { createSoccerField } from '../../../services/soccer-field.service';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'nuxt/app';
import type { CreateSoccerFieldDto } from 'sistema-rachas-domain/dto/soccer-field.dto';

const toast = useToast();
const router = useRouter();
const loading = ref<boolean>(false);
const validationSchema = toTypedSchema(registerSoccerFieldScheema);
const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField<string>('name');
const { value: rentalValue } = useField<number | null>('rentalValue');
const { value: pixKey } = useField<string | null>('pixKey');
const { value: workStartTime } = useField<string | null>('workStartTime');
const { value: workFinishTime } = useField<string | null>('workFinishTime');
const { value: workDays } = useField<string | null>('workDays');

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const response = await createSoccerField(values as CreateSoccerFieldDto);
    if (response) {
      router.push('/dashboard');
      toast.add({
        severity: 'success',
        summary: 'Campo registrado com sucesso!',
        life: 3000,
      });
    } else {
      throw Error(`Erro ao salvar campo, STATUS_CODE: falha ao registrar campo`);
    }
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao salvar campo',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
});

defineOptions({
  name: 'RegisterField'
});
</script>
