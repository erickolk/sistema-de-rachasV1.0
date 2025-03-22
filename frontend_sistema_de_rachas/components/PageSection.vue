<template>
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4" v-if="!withoutHeader">
        <h2 class="text-lg font-medium">{{ title }}</h2>
        <div class="page-section-action">
          <slot name="action"></slot>
        </div>
      </div>
      <div class="bg-white/5 p-4 rounded-lg shadow-md">
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