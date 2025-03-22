<template>
  <div>
    <div class="container mt-16">
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-4">Bem-vindo ao Sistema de Rachas</h1>
        <p class="text-xl mb-8">
          Encontre partidas, gerencie campos e muito mais!
        </p>
        <div class="flex justify-center space-x-4">
          <RouterLink to="/auth/register-client">
            <Button label="Registrar" class="p-button-primary" />
          </RouterLink>
          <RouterLink to="/auth/login">
            <Button label="Login" class="p-button-outlined" />
          </RouterLink>
        </div>
      </div>

      <div class="mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4">Como Funciona</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="dark:bg-zinc-800 bg-green-100 p-4 rounded-lg dark:shadow text-green-950 dark:text-white"
          >
            <i class="pi pi-search text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Busque Partidas</h3>
            <p>Encontre partidas disponíveis em campos próximos a você.</p>
          </div>
          <div
            class="dark:bg-zinc-800 bg-green-100 p-4 rounded-lg dark:shadow text-green-950 dark:text-white"
          >
            <i class="pi pi-calendar text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Gerencie Partidas</h3>
            <p>Crie, edite e acompanhe suas partidas agendadas.</p>
          </div>
          <div
            class="dark:bg-zinc-800 bg-green-100 p-4 rounded-lg dark;shadow text-green-950 dark:text-white"
          >
            <i class="pi pi-money-bill text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Receba Pagamentos</h3>
            <p>Receba pagamentos de forma rápida e segura.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style scoped></style>
