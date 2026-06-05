const STORAGE_KEY = 'gameinsight:favorites';

export function toggleFavorite(favoriteIds, gameId) {
  if (favoriteIds.includes(gameId)) {
    return favoriteIds.filter((id) => id !== gameId);
  }

  return [...favoriteIds, gameId];
}

export function readFavoriteIds(storage = window.localStorage) {
  try {
    const savedValue = storage.getItem(STORAGE_KEY);
    const parsedValue = JSON.parse(savedValue ?? '[]');

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function writeFavoriteIds(favoriteIds, storage = window.localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
}
