// src/hooks/useCocktails.ts
import { useEffect, useState } from 'react';
import {
  getRandomCocktail,
  getCocktailById,
  searchCocktailsByName,
  type Cocktail,
} from '../utils/fetchData';

// generic async hook
function useAsync<T>(runner: (signal: AbortSignal) => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    runner(ac.signal)
      .then((res) => setData(res))
      .catch((err) => {
        if (err?.name !== 'AbortError') setError(err?.message ?? 'Något gick fel');
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

// specialized hooks

export function useRandomCocktail() {
  return useAsync<Cocktail>((signal) => getRandomCocktail(signal), []);
}

export function useCocktailById(id: string) {
  return useAsync<Cocktail>((signal) => getCocktailById(id, signal), [id]);
}

export function useCocktailSearch(name: string) {
  return useAsync<Cocktail[]>(
    (signal) => searchCocktailsByName(name, signal),
    [name]
  );
}
