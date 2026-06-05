import { fallbackGames } from '../data/fallbackGames';

const API_URL = 'https://www.freetogame.com/api/games';

export async function fetchGames() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('FreeToGame API is unavailable.');
  }

  const games = await response.json();

  if (!Array.isArray(games)) {
    throw new Error('FreeToGame API returned an unexpected response.');
  }

  return games;
}

export function getFallbackGames() {
  return fallbackGames;
}
