<script setup>
import { CalendarDays, Heart, Monitor, Tag } from 'lucide-vue-next';

defineProps({
  game: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['select', 'favorite']);
</script>

<template>
  <article class="game-card">
    <button class="image-button" type="button" @click="emit('select')">
      <img :src="game.thumbnail" :alt="game.title" loading="lazy" />
    </button>

    <div class="game-card-body">
      <div class="game-card-heading">
        <h2>{{ game.title }}</h2>
        <button
          class="icon-button favorite-button"
          :class="{ active: isFavorite }"
          type="button"
          :title="isFavorite ? 'Usun z ulubionych' : 'Dodaj do ulubionych'"
          @click="emit('favorite')"
        >
          <Heart :size="18" aria-hidden="true" />
        </button>
      </div>

      <p>{{ game.short_description }}</p>

      <dl class="game-meta">
        <div>
          <dt><Tag :size="14" /> Gatunek</dt>
          <dd>{{ game.genre }}</dd>
        </div>
        <div>
          <dt><Monitor :size="14" /> Platforma</dt>
          <dd>{{ game.platform }}</dd>
        </div>
        <div>
          <dt><CalendarDays :size="14" /> Premiera</dt>
          <dd>{{ game.release_date }}</dd>
        </div>
      </dl>

      <button class="text-button" type="button" @click="emit('select')">Szczegoly</button>
    </div>
  </article>
</template>
