import { describe, expect, it } from 'vitest';
import { readFavoriteIds, toggleFavorite, writeFavoriteIds } from './favorites';

function createMemoryStorage(initialValue) {
  const store = new Map(initialValue ? [['gameinsight:favorites', initialValue]] : []);

  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
  };
}

describe('favorites', () => {
  it('adds and removes favorite ids', () => {
    expect(toggleFavorite([1, 2], 3)).toEqual([1, 2, 3]);
    expect(toggleFavorite([1, 2, 3], 2)).toEqual([1, 3]);
  });

  it('reads safe default when storage data is invalid', () => {
    const storage = createMemoryStorage('not-json');

    expect(readFavoriteIds(storage)).toEqual([]);
  });

  it('writes favorite ids to storage', () => {
    const storage = createMemoryStorage();

    writeFavoriteIds([4, 8], storage);

    expect(storage.getItem('gameinsight:favorites')).toBe('[4,8]');
  });
});
