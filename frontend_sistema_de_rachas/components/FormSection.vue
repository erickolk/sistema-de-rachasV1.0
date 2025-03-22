<template>
    <div class="mb-4">
      <div class="flex justify-between items-center mb-3" v-if="!withoutHeader">
        <div class="flex items-center">
            <i class="pi pi-caret-right text-[8px] mr-2"></i>
            <h2 class="text-md font-medium">{{ title }}</h2>
        </div>
        <div class="page-section-action">
          <slot name="action"></slot>
        </div>
      </div>
      <div class="bg-white/5 p-4 rounded-lg border border-black-20">
        <slot name="content"></slot>
      </div>

      <div>
        <slot name="actions"></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    withoutHeader: {
      type: Boolean,
      default: false
    }
  })
  </script>