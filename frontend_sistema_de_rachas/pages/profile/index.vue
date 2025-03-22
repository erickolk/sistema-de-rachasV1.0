<template>
  <PageContainer>
    <PageBreadcrumb :items="breadcrumbItems" />
    <div class="profile">
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <ProgressSpinner />
      </div>

      <div v-else class="space-y-4">
        <FormSection title="Informações Pessoais">
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="space-y-1">
                <label for="name" class="flex items-center">
                  <i class="pi pi-user mr-2"></i>Nome
                </label>
                <InputText
                  id="name"
                  type="text"
                  v-model="user.name"
                  class="w-full"
                  :class="{ 'p-invalid': errors.name }"
                />
                <small class="text-red-500" v-if="errors.name">{{
                  errors.name
                }}</small>
              </div>
              <div class="space-y-1">
                <label for="email" class="flex items-center">
                  <i class="pi pi-envelope mr-2"></i>Email
                </label>
                <InputText
                  id="email"
                  type="email"
                  v-model="user.email"
                  class="w-full"
                  :class="{ 'p-invalid': errors.email }"
                />
                <small class="text-red-500" v-if="errors.email">{{
                  errors.email
                }}</small>
              </div>
              <div class="space-y-1">
                <label for="role" class="flex items-center">
                  <i class="pi pi-id-card mr-2"></i>Função
                </label>
                <InputText
                  id="role"
                  type="text"
                  :value="role"
                  class="w-full bg-gray-100"
                  disabled
                />
              </div>
            </div>
          </template>
        </FormSection>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        label="Salvar Alterações"
        icon="pi pi-save"
        @click="saveProfile"
        :loading="isSaving"
        class="p-button-success"
      />
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getUserProfile, updateUserProfile } from "../../services/auth.service";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";

interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: string;
  current?: boolean;
}

const breadcrumbItems = ref<BreadcrumbItem[]>([
  { label: "Dashboard", to: "/dashboard", icon: "pi pi-home" },
  { label: "Meu Perfil", current: true },
]);

const user = ref({
  name: "",
  email: "",
  role: "",
});

const isLoading = ref(true);
const isSaving = ref(false);
const errors = ref({
  name: "",
  email: "",
});
const toast = useToast();

const loadUserProfile = async () => {
  try {
    const profileData = await getUserProfile();
    user.value = profileData;
  } catch (error) {
    console.error("Erro ao carregar o perfil:", error);
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Erro ao carregar o perfil.",
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

const role = computed(() => {
  return Number(user.value.role) === 2 ? "Cliente" : "Dono";
});

const validateForm = () => {
  errors.value = {
    name: "",
    email: "",
  };

  if (!user.value.name?.trim()) {
    errors.value.name = "O nome é obrigatório";
  }

  if (!user.value.email?.trim()) {
    errors.value.email = "O email é obrigatório";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email)) {
    errors.value.email = "Email inválido";
  }

  return !errors.value.name && !errors.value.email;
};

const saveProfile = async () => {
  if (!validateForm()) return;

  isSaving.value = true;
  try {
    await updateUserProfile(user.value);
    toast.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Perfil atualizado com sucesso!",
      life: 3000,
    });
  } catch (error: any) {
    console.error("Erro ao salvar o perfil:", error);
    const errorMessage = error.message || "Erro ao salvar o perfil.";
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: errorMessage,
      life: 5000,
    });
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  loadUserProfile();
});
</script>
