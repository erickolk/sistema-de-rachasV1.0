<template>
    <div class="mb-6">
        <slot name="title" v-if="!title"></slot>
        <h1 class="text-lg text-primary font-bold" v-else>{{ title }}</h1>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String
    }
})
</script>