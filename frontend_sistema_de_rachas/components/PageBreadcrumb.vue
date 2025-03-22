<template>
    <div class="flex border-b border-black-20 px-0 py-2 mb-4 text-zinc-600">
      <Breadcrumb :home="undefined" :model="breadcrumbItems">
        <template #item="{ item }">
            <router-link :to="item.to ?? '#'" class="flex items-center gap-x-2" :class="item.current ? 'opacity-50 cursor-not-allowed' : ''">
                <span :class="item.icon" v-if="item.icon"></span>
                <span>{{ item.label }}</span>
            </router-link>
        </template>
        <template #separator> / </template>
      </Breadcrumb>
    </div>
  </template>
  
  <script setup lang="ts">
  import Breadcrumb from 'primevue/breadcrumb';
  import { computed } from 'vue';
  
  interface BreadcrumbItem {
    label: string;
    to?: string | undefined;
    icon?: string;
    current?: boolean;
    children?: BreadcrumbItem[];
  }
  
  const props = defineProps<{
    items: BreadcrumbItem[];
  }>();
  
  const buildBreadcrumbItems = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
    return items.map(item => ({
      label: item.label,
      to: item?.to,
      icon: item?.icon,
      current: item?.current,
      children: item.children ? buildBreadcrumbItems(item.children) : undefined,
    }));
  };
  
  const breadcrumbItems = computed(() => buildBreadcrumbItems(props.items));
  
  defineExpose({
    breadcrumbItems
  });
  </script>
  
  <style scoped lang="postcss">
  .p-breadcrumb-active {
    @apply font-bold
  }
  .p-breadcrumb {
    @apply p-0 bg-transparent rounded-none;
  }
  </style>