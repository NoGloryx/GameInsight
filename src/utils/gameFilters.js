const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

const searchableText = (game) =>
  [
    game.title,
    game.short_description,
    game.genre,
    game.platform,
    game.publisher,
    game.developer,
  ]
    .map(normalizeText)
    .join(' ');

export function getUniqueOptions(games, key) {
  return [...new Set(games.map((game) => game[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function matchesPlatform(gamePlatform, selectedPlatform) {
  if (!selectedPlatform || selectedPlatform === 'all') {
    return true;
  }

  return normalizeText(gamePlatform).includes(normalizeText(selectedPlatform));
}

export function filterGames(games, filters = {}) {
  const query = normalizeText(filters.query);
  const genre = filters.genre ?? 'all';
  const platform = filters.platform ?? 'all';

  return games.filter((game) => {
    const matchesQuery = !query || searchableText(game).includes(query);
    const matchesGenre = genre === 'all' || game.genre === genre;

    return matchesQuery && matchesGenre && matchesPlatform(game.platform, platform);
  });
}

export function sortGames(games, sortKey = 'title') {
  const sortedGames = [...games];

  const sorters = {
    title: (a, b) => a.title.localeCompare(b.title),
    newest: (a, b) => new Date(b.release_date) - new Date(a.release_date),
    oldest: (a, b) => new Date(a.release_date) - new Date(b.release_date),
    genre: (a, b) => a.genre.localeCompare(b.genre) || a.title.localeCompare(b.title),
  };

  return sortedGames.sort(sorters[sortKey] ?? sorters.title);
}

export function createGameStats(games, favoriteIds = []) {
  const genreCounts = games.reduce((counts, game) => {
    counts[game.genre] = (counts[game.genre] ?? 0) + 1;
    return counts;
  }, {});

  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Brak';

  return {
    total: games.length,
    favorites: games.filter((game) => favoriteIds.includes(game.id)).length,
    topGenre,
    availableGenres: Object.keys(genreCounts).length,
  };
}
