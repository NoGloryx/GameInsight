# GameInsight

GameInsight to aplikacja Vue 3 do odkrywania gier free-to-play. Pobiera dane z publicznego API FreeToGame, pozwala filtrowac tytuly po gatunku i platformie, sortowac liste oraz zapisywac ulubione gry w `localStorage`.

## Funkcje

- Wyszukiwanie gier po nazwie, wydawcy, deweloperze i opisie.
- Filtrowanie po gatunku oraz platformie.
- Sortowanie po nazwie, dacie premiery i gatunku.
- Szczegoly wybranej gry z mozliwoscia dodania do ulubionych.
- Panel statystyk pokazujacy liczbe wynikow, ulubione gry i najpopularniejszy gatunek.
- Fallback danych, gdy publiczne API jest niedostepne.

## Technologie

- Vue 3 + Composition API
- Vite
- Vitest
- lucide-vue-next
- FreeToGame API

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Po uruchomieniu Vite aplikacja bedzie dostepna zwykle pod adresem `http://localhost:5173`.

## Testy

```bash
npm run test
```

Testy jednostkowe sprawdzaja filtrowanie, sortowanie, statystyki i obsluge ulubionych.

## Build produkcyjny

```bash
npm run build
npm run preview
```

## Demo

Projekt mozna opublikowac na Vercel, Netlify albo GitHub Pages. Dla Vercel wystarczy zaimportowac repozytorium i zostawic domyslne ustawienia Vite:

- Build command: `npm run build`
- Output directory: `dist`
