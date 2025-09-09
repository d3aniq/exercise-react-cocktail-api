import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRandomCocktail } from '../hooks/useCocktails';
import { getRandomCocktail } from '../utils/fetchData';

export default function LandingPage() {
  // 1) First load: useRandomCocktail
  const { data: initial, loading, error } = useRandomCocktail();

  // Local state to manage current cocktail and refreshing state
  const [current, setCurrent] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ synchronize current with initial when it changes
  useEffect(() => {
    if (initial) setCurrent(initial);
  }, [initial]);

  // 3) Determine which drink to show: current (if set) or initial (first load)
  const drink = current ?? initial;

  async function handleNewRandom() {
    try {
      setRefreshing(true);
      const c = await getRandomCocktail();
      setCurrent(c);
    } catch (e) {
      // optionally show error to user
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }

  // 4) Loading & error states
  if (loading && !drink) return <p>Loading random cocktail…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!drink) return <p>No cocktail was found.</p>;

  return (
    <div className="grid" style={{maxWidth: 720, margin: '0 auto', padding: '1rem', display: 'grid', gap: 16}}>
      <h1>Random Cocktail</h1>

      <article className="card" style={{ padding: 16, maxWidth: 420 }}>
        <img src={drink.thumbnail} alt={drink.name} className="rounded" />
        <h2>{drink.name}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/cocktail/${drink.id}`} className="btn">See more</Link>
          <button onClick={handleNewRandom} className="btn primary" disabled={refreshing}>
            {refreshing ? 'Loading…' : 'New random'}
          </button>
        </div>
      </article>
    </div>
  );
}
