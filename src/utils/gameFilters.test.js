import { describe, expect, it } from 'vitest';
import { createGameStats, filterGames, sortGames } from './gameFilters';

const games = [
  {
    id: 1,
    title: 'Apex Legends',
    short_description: 'Hero shooter',
    genre: 'Shooter',
    platform: 'PC (Windows)',
    publisher: 'Electronic Arts',
    developer: 'Respawn',
    release_date: '2019-02-04',
  },
  {
    id: 2,
    title: 'Forge Arena',
    short_description: 'Browser fantasy tactics',
    genre: 'Strategy',
    platform: 'Web Browser',
    publisher: 'Indie Lab',
    developer: 'Indie Lab',
    release_date: '2023-05-12',
  },
  {
    id: 3,
    title: 'Cyber Strike',
    short_description: 'Fast tactical battles',
    genre: 'Shooter',
    platform: 'PC (Windows), Web Browser',
    publisher: 'Arc Systems',
    developer: 'Arc Systems',
    release_date: '2021-08-20',
  },
];

describe('game filtering', () => {
  it('filters games by query and genre', () => {
    const result = filterGames(games, {
      query: 'hero',
      genre: 'Shooter',
      platform: 'all',
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Apex Legends');
  });

  it('matches platform fragments for mixed platform games', () => {
    const result = filterGames(games, {
      query: '',
      genre: 'all',
      platform: 'Web Browser',
    });

    expect(result.map((game) => game.title)).toEqual(['Forge Arena', 'Cyber Strike']);
  });
});

describe('game sorting and statistics', () => {
  it('sorts games by newest release date', () => {
    const result = sortGames(games, 'newest');

    expect(result.map((game) => game.title)).toEqual([
      'Forge Arena',
      'Cyber Strike',
      'Apex Legends',
    ]);
  });

  it('creates stats for current results and favorites', () => {
    const stats = createGameStats(games, [1, 3, 999]);

    expect(stats).toEqual({
      total: 3,
      favorites: 2,
      topGenre: 'Shooter',
      availableGenres: 2,
    });
  });
});
