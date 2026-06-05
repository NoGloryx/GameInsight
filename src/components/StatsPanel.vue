<script setup>
import { BarChart3, Heart, Layers3, Trophy } from 'lucide-vue-next';

defineProps({
  stats: {
    type: Object,
    required: true,
  },
  favoriteGames: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['select']);
</script>

<template>
  <aside class="stats-panel" aria-label="Statystyki">
    <div class="stat-row">
      <span class="stat-icon"><BarChart3 :size="18" /></span>
      <div>
        <strong>{{ stats.total }}</strong>
        <span>wynikow</span>
      </div>
    </div>
    <div class="stat-row">
      <span class="stat-icon"><Heart :size="18" /></span>
      <div>
        <strong>{{ stats.favorites }}</strong>
        <span>w wynikach</span>
      </div>
    </div>
    <div class="stat-row">
      <span class="stat-icon"><Layers3 :size="18" /></span>
      <div>
        <strong>{{ stats.availableGenres }}</strong>
        <span>gatunkow</span>
      </div>
    </div>
    <div class="stat-row accent-row">
      <span class="stat-icon"><Trophy :size="18" /></span>
      <div>
        <strong>{{ stats.topGenre }}</strong>
        <span>top gatunek</span>
      </div>
    </div>

    <div class="favorites-box">
      <h2>Ulubione</h2>
      <p v-if="favoriteGames.length === 0">Brak zapisanych gier.</p>
      <button
        v-for="game in favoriteGames"
        :key="game.id"
        class="favorite-link"
        type="button"
        @click="emit('select', game)"
      >
        <img :src="game.thumbnail" :alt="game.title" />
        <span>{{ game.title }}</span>
      </button>
    </div>
  </aside>
</template>
