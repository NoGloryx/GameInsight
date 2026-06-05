<script setup>
import GameCard from './GameCard.vue';

defineProps({
  games: {
    type: Array,
    required: true,
  },
  favoriteIds: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['select', 'favorite']);
</script>

<template>
  <section class="results-panel" aria-label="Lista gier">
    <div v-if="loading" class="empty-state">Ladowanie wynikow...</div>
    <div v-else-if="games.length === 0" class="empty-state">Brak gier dla wybranych filtrow.</div>
    <div v-else class="game-grid">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        :is-favorite="favoriteIds.includes(game.id)"
        @select="emit('select', game)"
        @favorite="emit('favorite', game.id)"
      />
    </div>
  </section>
</template>
