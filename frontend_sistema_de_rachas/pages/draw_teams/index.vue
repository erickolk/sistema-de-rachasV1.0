<template>
  <div class="max-w-md mx-auto p-5">
    <h1 class="text-center text-2xl font-bold mb-4">Sorteio de Times</h1>
    <div v-if="players.length > 0">
      <h2 class="text-lg font-bold mb-2">Jogadores Cadastrados:</h2>
      <ul class="mb-4">
        <li v-for="(player, index) in players" :key="index">{{ player }}</li>
      </ul>
      <Button
        @click="drawTeams"
        label="Sortear Times"
        class="bg-green-600 rounded p-2"
      />
      <div v-if="teamA.length > 0 && teamB.length > 0" class="mt-4">
        <h2 class="text-lg font-bold mb-2">Time A:</h2>
        <ul>
          <li v-for="(player, index) in teamA" :key="index">{{ player }}</li>
        </ul>
        <h2 class="text-lg font-bold mb-2">Time B:</h2>
        <ul>
          <li v-for="(player, index) in teamB" :key="index">{{ player }}</li>
        </ul>
      </div>
    </div>
    <p v-else class="text-center text-lg font-bold">
      Nenhum jogador cadastrado.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';

const players = ref<string[]>([]);
const teamA = ref<string[]>([]);
const teamB = ref<string[]>([]);

onMounted(() => {
  const storedMatches = localStorage.getItem('matches');
  if (storedMatches) {
    const matches = JSON.parse(storedMatches);
    if (matches.length > 0) {
      players.value = matches[0].players;
    }
  }
});

const drawTeams = () => {
  const shuffledPlayers = [...players.value].sort(() => Math.random() - 0.5);
  const midIndex = Math.ceil(shuffledPlayers.length / 2);
  teamA.value = shuffledPlayers.slice(0, midIndex);
  teamB.value = shuffledPlayers.slice(midIndex); 
};
</script>
