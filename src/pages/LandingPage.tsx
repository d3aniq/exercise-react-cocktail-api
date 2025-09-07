import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRandomCocktail } from '../hooks/useCocktails';
import { getRandomCocktail } from '../utils/fetchData';

export default function LandingPage() {
  // 1) Första slumpade drinken hämtas på mount via hooken
  const { data: initial, loading, error } = useRandomCocktail();

  // Lokal state för “refresh” så vi kan hämta en ny utan att remounta sidan
  const [current, setCurrent] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);

  // Om vi redan har hämtat en “current” visa den, annars visa initial
  const drink = current ?? initial;

  async function handleNewRandom() {
    try {
      setRefreshing(true);
      const c = await getRandomCocktail();
      setCurrent(c);
    } catch (e) {
      // valfritt: visa toast/alert
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }

  // 4) Loading & error states
  if (loading && !drink) return <p>Loading random cocktail…</p>;
  if (error) return <p>Eror: {error}</p>;
  if (!drink) return <p>No cocktail was found.</p>;

  return (
  <div className="grid" style={{ gap: '1.25rem' }}>
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

