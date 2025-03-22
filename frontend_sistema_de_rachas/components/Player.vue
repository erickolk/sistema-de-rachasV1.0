<template>
  <div class="flex items-center justify-between gap-x-2 bg-black/5 p-2 rounded">
    <div class="flex items-center gap-x-2 min-w-0">
      <div class="flex-1 truncate">
        <p class="text-sm truncate">{{ player.name }}</p>
        <div class="flex items-center gap-x-1">
          <Rating 
            v-model="player.stars" 
            :readonly="!isEditable" 
            :cancel="false" 
            class="text-yellow-500"
            @change="handleStarsChange" 
          />
          <span v-if="player.position" class="text-xs bg-black/10 px-1 rounded">
            {{ playerPositionAbbreviations[player.position] }}
          </span>
        </div>
      </div>
    </div>

    <Button
      v-if="showRemove"
      @click="$emit('remove')"
      icon="pi pi-times"
      severity="danger"
      text
      rounded
      size="small"
    />
  </div>
</template>

<script setup lang="ts">
import { PlayerPositionsEnum } from 'sistema-rachas-domain/enums';
import Rating from 'primevue/rating';
import Button from 'primevue/button';

interface PlayerProps {
  player: {
    id?: string;
    name: string;
    stars?: number;
    position?: PlayerPositionsEnum;
  };
  playerPositionAbbreviations: Record<PlayerPositionsEnum, string>;
  showRemove?: boolean;
  isEditable?: boolean;
}

const props = defineProps<PlayerProps>();
const emit = defineEmits<{
  (e: 'remove'): void;
  (e: 'update:stars', stars: number): void;
}>();

const handleStarsChange = (event: { value: number }) => {
  emit('update:stars', event.value);
};

defineOptions({
  name: 'Player'
});
</script>
