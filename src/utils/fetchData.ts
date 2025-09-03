// src/utils/fetchData.ts
// Reusable fetch helpers + typed wrappers for TheCocktailDB

import { mapRawCocktailData } from '../utils/mapRawCocktailData'; // ändra sökväg om din fil ligger annorstädes

// Praktiskt sätt att få typen som mapRawCocktailData returnerar
export type Cocktail = ReturnType<typeof mapRawCocktailData>;

const BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

async function fetchJSON<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} – ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ---------- Endpoints ----------

// Slumpad drink (Landing Page)
export async function getRandomCocktail(signal?: AbortSignal): Promise<Cocktail> {
  const data = await fetchJSON<{ drinks: any[] | null }>('/random.php', signal);
  if (!data.drinks || data.drinks.length === 0) throw new Error('Inga resultat');
  return mapRawCocktailData(data.drinks[0]);
}

// Sök på namn (Search Page)
// Returnerar ALLA träffar (paginera i UI:t)
export async function searchCocktailsByName(
  name: string,
  signal?: AbortSignal
): Promise<Cocktail[]> {
  const q = name.trim();
  if (!q) return [];
  const data = await fetchJSON<{ drinks: any[] | null }>(`/search.php?s=${encodeURIComponent(q)}`, signal);
  return (data.drinks ?? []).map(mapRawCocktailData);
}

// Hämta detaljer (Cocktail Info Page)
export async function getCocktailById(id: string, signal?: AbortSignal): Promise<Cocktail> {
  const data = await fetchJSON<{ drinks: any[] | null }>(`/lookup.php?i=${encodeURIComponent(id)}`, signal);
  if (!data.drinks || data.drinks.length === 0) throw new Error('Drink hittades inte');
  return mapRawCocktailData(data.drinks[0]);
}

// Filter (bonus – kategori, ingrediens, glas)
// OBS! filter-endpoints returnerar inte alla fält, utan id+namn+thumb -> slå upp per id vid behov.
type FilterDrink = { idDrink: string; strDrink: string; strDrinkThumb: string };
export async function filterByCategory(category: string, signal?: AbortSignal): Promise<FilterDrink[]> {
  const data = await fetchJSON<{ drinks: FilterDrink[] | null }>(`/filter.php?c=${encodeURIComponent(category)}`, signal);
  return data.drinks ?? [];
}
export async function filterByIngredient(ingredient: string, signal?: AbortSignal): Promise<FilterDrink[]> {
  const data = await fetchJSON<{ drinks: FilterDrink[] | null }>(`/filter.php?i=${encodeURIComponent(ingredient)}`, signal);
  return data.drinks ?? [];
}
export async function filterByGlass(glass: string, signal?: AbortSignal): Promise<FilterDrink[]> {
  const data = await fetchJSON<{ drinks: FilterDrink[] | null }>(`/filter.php?g=${encodeURIComponent(glass)}`, signal);
  return data.drinks ?? [];
}
