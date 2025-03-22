<template>
  <PageContainer>
    <PageBreadcrumb :items="breadcrumbItems" />
    <MatchForm />
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MatchForm from '../_partials/components/MatchForm.vue';
import { useMatch } from '../_partials/composables/useMatch';


const breadcrumbItems = ref([
  { label: 'Dashboard Cliente', to: '/dashboard-client', icon: 'pi pi-home' },
  { label: 'Criar partida', current: true },
]);

const { handleOnMountedForm } = useMatch();

onMounted(async () => {
  await handleOnMountedForm();
})
</script>
