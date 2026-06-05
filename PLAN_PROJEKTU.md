# Plan projektu - GameInsight

## Temat i nazwa aplikacji

**GameInsight** - wyszukiwarka i mini-panel analityczny dla gier free-to-play.

## Opis funkcjonalnosci

- Pobieranie listy gier z publicznego API FreeToGame.
- Wyszukiwanie po tytule, opisie, wydawcy i deweloperze.
- Filtrowanie wynikow po gatunku oraz platformie.
- Sortowanie wynikow po nazwie, dacie premiery albo gatunku.
- Podglad szczegolow wybranej gry.
- Zapisywanie ulubionych gier w pamieci przegladarki i wyswietlanie prostych statystyk.

## Grupa docelowa

Aplikacja jest przeznaczona dla osob, ktore szukaja darmowych gier online i chca szybko porownac tytuly wedlug platformy, gatunku oraz daty premiery.

## Stos technologiczny

- Framework: Vue 3 z Composition API.
- Narzedzie budujace: Vite.
- Testy: Vitest.
- Ikony: lucide-vue-next.
- API: FreeToGame API.
- Przechowywanie danych uzytkownika: `localStorage`.

## Wstepna lista komponentow

- `App.vue` - glowny stan aplikacji, pobieranie danych i kompozycja widoku.
- `SearchPanel.vue` - formularz wyszukiwania, filtry i sortowanie.
- `StatsPanel.vue` - statystyki wynikow i ulubionych gier.
- `GameList.vue` - renderowanie listy wynikow.
- `GameCard.vue` - pojedyncza karta gry.
- `GameDetails.vue` - panel szczegolow wybranej gry.
- `StatusBanner.vue` - komunikaty o ladowaniu, bledach i fallbacku.

## Makieta UI

```text
+--------------------------------------------------------------+
| GameInsight                         [liczba wynikow] [fav]   |
+--------------------------------------------------------------+
| [szukaj...] [gatunek v] [platforma v] [sortowanie v] [reset] |
+-------------------------+------------------------------------+
| Statystyki              | Lista gier                         |
| - wyniki                | [karta] [karta] [karta]            |
| - ulubione              | [karta] [karta] [karta]            |
| - top gatunek           |                                    |
+-------------------------+------------------------------------+
| Panel szczegolow wybranej gry                                |
+--------------------------------------------------------------+
```

## Plan testow

- Filtrowanie po tekscie, gatunku i platformie.
- Sortowanie wynikow po nazwie i dacie premiery.
- Wyliczanie statystyk dla wynikow oraz ulubionych.
- Dodawanie i usuwanie identyfikatora gry z ulubionych.

## Link do repozytorium

https://github.com/NoGloryx/GameInsight
