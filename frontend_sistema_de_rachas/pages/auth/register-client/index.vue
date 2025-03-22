<template>
  <div class="form-container">
    <h1 class="text-2xl font-bold mb-4">Registrar</h1>
    <form @submit.prevent="onSubmit">
      <div class="space-y-4">
        <div class="border border-custom rounded-md p-4 space-x-4 flex">
          <!-- Nome de Usuário -->
          <div class="mb-4 w-1/2">
            <label class="block mb-2" for="username">Nome:</label>
            <InputText id="name" v-model="name" class="border p-2 w-full" />
            <span class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>

          <!-- Email -->
          <div class="mb-4 w-1/2">
            <label class="block mb-2" for="email">Email:</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              class="border p-2 w-full"
            />
            <span class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>
        </div>

        <div class="border border-custom rounded-md p-4 flex space-x-4">
          <!-- Senha -->
          <div class="mb-4 w-1/2">
            <label class="block mb-2" for="password">Senha:</label>
            <Password v-model="password" toggleMask fluid />
            <span class="text-red-500 text-sm">{{ errors.password }}</span>
          </div>

          <!-- Confirmação de Senha -->
          <div class="mb-4 w-1/2">
            <label class="block mb-2" for="confirmPassword"
              >Confirme sua Senha:</label
            >
            <Password
              v-model="confirmPassword"
              toggleMask
              fluid
              class="w-full"
            />
            <span class="text-red-500 text-sm">{{
              errors.confirmPassword
            }}</span>
          </div>
        </div>
        <div class="border border-custom rounded-md p-4 space-x-4 flex">
          <!-- Telefone -->
          <div class="mb-4 w-1/2">
            <label class="block mb-2" for="phone">Telefone:</label>
            <InputText v-model="phone" class="border p-2 w-full" />
            <span class="text-red-500 text-sm">{{ errors.phone }}</span>
          </div>
        </div>

        <Button type="submit" class="w-1/4 mt-4">Registrar</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { registerUserSchema } from './partials/validation';
import { useToast } from 'primevue/usetoast';
import { UserRoleEnum } from 'sistema-rachas-domain/enums';
import { registerUser } from '../../../services/auth.service';
import { HttpStatusCode } from 'axios';
import { useRouter} from 'nuxt/app';
import useAuth from '../../../composables/useAuth';
import { onMounted } from 'vue';
import type { CreateUserDto } from 'sistema-rachas-domain/dto/user.dto';

const router = useRouter();
const toast = useToast();
const validationSchema = toTypedSchema(registerUserSchema);
const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField<string>('name');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: confirmPassword } = useField<string>('confirmPassword');
const { value: phone } = useField<string>('phone');
const { loadAuthState } = useAuth();

onMounted(() => {
  loadAuthState();
});
const onSubmit = handleSubmit(async (values) => {
  try {
    const userData: CreateUserDto = {
      name: values.name || '',
      email: values.email || '',
      password: values.password || '',
      role: UserRoleEnum.CLIENT,
    };

    const response = await registerUser(userData);

    if (response?.status === HttpStatusCode.Created) {
      toast.add({
        severity: 'success',
        summary: 'Registro efetuado com sucesso!',
      });
      router.push('/auth/login');
    } else {
      toast.add({
        severity: 'error',
        summary: response?.data?.message || 'Houve um problema enesperado',
      });
    }
  } catch (error: any) {
    console.log(error);
    toast.add({
      severity: 'error',
      summary:
        error?.response?.data?.message ||
        'Erro inesperado ao registrar usuário!',
    });
  }
});
</script>
