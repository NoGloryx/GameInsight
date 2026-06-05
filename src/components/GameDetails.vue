<script setup>
import { ExternalLink, Heart, X } from 'lucide-vue-next';

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

const emit = defineEmits(['close', 'favorite']);
</script>

<template>
  <section class="details-drawer" aria-label="Szczegoly gry">
    <div class="details-media">
      <img :src="game.thumbnail" :alt="game.title" />
    </div>
    <div class="details-content">
      <div class="details-heading">
        <div>
          <span>{{ game.genre }}</span>
          <h2>{{ game.title }}</h2>
        </div>
        <button class="icon-button" type="button" title="Zamknij" @click="emit('close')">
          <X :size="18" aria-hidden="true" />
        </button>
      </div>

      <p>{{ game.short_description }}</p>

      <dl class="details-grid">
        <div>
          <dt>Platforma</dt>
          <dd>{{ game.platform }}</dd>
        </div>
        <div>
          <dt>Wydawca</dt>
          <dd>{{ game.publisher }}</dd>
        </div>
        <div>
          <dt>Deweloper</dt>
          <dd>{{ game.developer }}</dd>
        </div>
        <div>
          <dt>Premiera</dt>
          <dd>{{ game.release_date }}</dd>
        </div>
      </dl>

      <div class="details-actions">
        <button
          class="primary-action"
          type="button"
          :class="{ saved: isFavorite }"
          @click="emit('favorite', game.id)"
        >
          <Heart :size="18" aria-hidden="true" />
          <span>{{ isFavorite ? 'Zapisano' : 'Dodaj' }}</span>
        </button>
        <a :href="game.game_url" target="_blank" rel="noreferrer" class="secondary-action">
          <ExternalLink :size="18" aria-hidden="true" />
          <span>Strona gry</span>
        </a>
      </div>
    </div>
  </section>
</template>
