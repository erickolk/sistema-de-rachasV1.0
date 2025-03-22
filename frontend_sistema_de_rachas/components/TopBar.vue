<template>
  <div class="bg-white text-gray-800 border-b-2">
    <div class="container flex justify-between items-center">
      <div class="logo">
        <RouterLink
          :to="
            userType === 'client'
              ? { name: 'dashboard-client' }
              : { name: 'dashboard' }
          "
          class="text-xl font-bold"
        >
          Sistema de Rachas
        </RouterLink>
      </div>

      <div class="nav-links flex space-x-6" v-if="isAuthenticated">
        <RouterLink
          :to="
            userType === 'cliente'
              ? { name: 'dashboard-client' }
              : { name: 'dashboard' }
          "
          class="hover:underline flex items-center"
        >
          <i class="pi pi-home mr-1"></i> Dashboard
        </RouterLink>

        <!-- Links específicos para o cliente -->
        <template v-if="userType === 'cliente'">
          <RouterLink
            to="/matches/create"
            class="hover:underline flex items-center"
          >
            <i class="pi pi-plus mr-1"></i> Criar Partida
          </RouterLink>
          <RouterLink
            to="/dashboard-client"
            class="hover:underline flex items-center"
          >
            <i class="pi pi-calendar mr-1"></i> Minhas Partidas
          </RouterLink>
        </template>

        <RouterLink to="/profile" class="hover:underline flex items-center">
          <i class="pi pi-user mr-1"></i> Perfil
        </RouterLink>
      </div>

      <div class="auth-buttons flex space-x-4">
        <template v-if="!isAuthenticated">
          <RouterLink :to="{ name: 'auth-login' }">
            <Button label="Login" class="p-button-text" />
          </RouterLink>
          <RouterLink :to="{ name: 'auth-register-client' }">
            <Button label="Registrar" class="p-button-text" />
          </RouterLink>
        </template>
        <template v-else>
          <Button label="Logout" class="p-button-text" @click="handleLogout" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import useAuth from '../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();

const { isAuthenticated, userType, logout } = useAuth();
watch(userType, (newType) => {
  console.log('Novo tipo de usuário detectado:', newType);
});

const isFieldOwner = computed(() => userType.value === 'owner');

function handleLogout() {
  logout();
  router.push('/');
}
</script>
