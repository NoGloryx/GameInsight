<script setup>
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-vue-next';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  platforms: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:filters', 'reset']);

function updateFilter(key, value) {
  emit('update:filters', {
    ...props.filters,
    [key]: value,
  });
}
</script>

<template>
  <section class="toolbar" aria-label="Filtry">
    <label class="search-field">
      <Search :size="18" aria-hidden="true" />
      <input
        :value="filters.query"
        type="search"
        placeholder="Szukaj gry, studia albo gatunku"
        @input="updateFilter('query', $event.target.value)"
      />
    </label>

    <label class="select-field">
      <span>Gatunek</span>
      <select :value="filters.genre" @change="updateFilter('genre', $event.target.value)">
        <option value="all">Wszystkie</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </label>

    <label class="select-field">
      <span>Platforma</span>
      <select :value="filters.platform" @change="updateFilter('platform', $event.target.value)">
        <option value="all">Wszystkie</option>
        <option v-for="platform in platforms" :key="platform" :value="platform">
          {{ platform }}
        </option>
      </select>
    </label>

    <label class="select-field">
      <span>Sortuj</span>
      <select :value="filters.sortBy" @change="updateFilter('sortBy', $event.target.value)">
        <option value="title">Tytul A-Z</option>
        <option value="newest">Najnowsze</option>
        <option value="oldest">Najstarsze</option>
        <option value="genre">Gatunek</option>
      </select>
    </label>

    <button class="icon-button icon-button-wide" type="button" title="Wyczysc filtry" @click="emit('reset')">
      <RotateCcw :size="18" aria-hidden="true" />
      <span>Reset</span>
    </button>

    <span class="toolbar-icon" aria-hidden="true">
      <SlidersHorizontal :size="20" />
    </span>
  </section>
</template>
