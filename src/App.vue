<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { Gamepad2 } from 'lucide-vue-next';
import GameDetails from './components/GameDetails.vue';
import GameList from './components/GameList.vue';
import SearchPanel from './components/SearchPanel.vue';
import StatsPanel from './components/StatsPanel.vue';
import StatusBanner from './components/StatusBanner.vue';
import { fetchGames, getFallbackGames } from './services/freeToGameApi';
import { createGameStats, filterGames, getUniqueOptions, sortGames } from './utils/gameFilters';
import { readFavoriteIds, toggleFavorite, writeFavoriteIds } from './utils/favorites';

const games = ref([]);
const selectedGame = ref(null);
const favoriteIds = ref(readFavoriteIds());
const isLoading = ref(true);
const status = ref({
  type: 'info',
  message: 'Ladowanie katalogu gier...',
});
const filters = ref({
  query: '',
  genre: 'all',
  platform: 'all',
  sortBy: 'title',
});

const filteredGames = computed(() => {
  const matchingGames = filterGames(games.value, filters.value);
  return sortGames(matchingGames, filters.value.sortBy);
});

const genreOptions = computed(() => getUniqueOptions(games.value, 'genre'));
const platformOptions = computed(() => ['PC (Windows)', 'Web Browser']);
const stats = computed(() => createGameStats(filteredGames.value, favoriteIds.value));
const favoriteGames = computed(() =>
  games.value.filter((game) => favoriteIds.value.includes(game.id)).slice(0, 5),
);

const selectedGameIsFavorite = computed(
  () => selectedGame.value && favoriteIds.value.includes(selectedGame.value.id),
);

function updateFilters(nextFilters) {
  filters.value = nextFilters;
}

function resetFilters() {
  filters.value = {
    query: '',
    genre: 'all',
    platform: 'all',
    sortBy: 'title',
  };
}

function selectGame(game) {
  selectedGame.value = game;
}

function handleFavorite(gameId) {
  favoriteIds.value = toggleFavorite(favoriteIds.value, gameId);
}

async function loadGames() {
  isLoading.value = true;

  try {
    games.value = await fetchGames();
    status.value = {
      type: 'success',
      message: 'Dane pobrane z FreeToGame API.',
    };
  } catch {
    games.value = getFallbackGames();
    status.value = {
      type: 'warning',
      message: 'API jest chwilowo niedostepne. Pokazujemy dane zapasowe.',
    };
  } finally {
    isLoading.value = false;
  }
}

watch(
  favoriteIds,
  (nextFavoriteIds) => {
    writeFavoriteIds(nextFavoriteIds);
  },
  { deep: true },
);

watch(selectedGame, (game) => {
  document.title = game
    ? `${game.title} | GameInsight`
    : 'GameInsight | Wyszukiwarka gier free-to-play';
});

onMounted(loadGames);
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="GameInsight">
        <span class="brand-mark" aria-hidden="true">
          <Gamepad2 :size="24" />
        </span>
        <span>
          <strong>GameInsight</strong>
          <small>free-to-play finder</small>
        </span>
      </a>
      <div class="topbar-metrics" aria-label="Podsumowanie">
        <span>{{ stats.total }} wynikow</span>
        <span>{{ favoriteIds.length }} ulubionych</span>
      </div>
    </header>

    <StatusBanner :status="status" :loading="isLoading" @retry="loadGames" />

    <SearchPanel
      :filters="filters"
      :genres="genreOptions"
      :platforms="platformOptions"
      @update:filters="updateFilters"
      @reset="resetFilters"
    />

    <section class="workspace" aria-label="Wyniki i statystyki">
      <StatsPanel :stats="stats" :favorite-games="favoriteGames" @select="selectGame" />

      <GameList
        :games="filteredGames"
        :favorite-ids="favoriteIds"
        :loading="isLoading"
        @select="selectGame"
        @favorite="handleFavorite"
      />
    </section>

    <GameDetails
      v-if="selectedGame"
      :game="selectedGame"
      :is-favorite="selectedGameIsFavorite"
      @close="selectedGame = null"
      @favorite="handleFavorite"
    />
  </main>
</template>
