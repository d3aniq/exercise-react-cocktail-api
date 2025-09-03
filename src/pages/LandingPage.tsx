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
  if (loading && !drink) return <p>Laddar slumpad cocktail…</p>;
  if (error) return <p>Fel: {error}</p>;
  if (!drink) return <p>Ingen cocktail hittades.</p>;

  // 2) Visa cocktail-kort + 3) knapp för ny slumpad
  return (
    <main style={{ display: 'grid', gap: '1rem' }}>
      <h1>Random Cocktail</h1>

      <article
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 16,
          maxWidth: 420,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        }}
      >
        <img
          src={drink.thumbnail}
          alt={drink.name}
          style={{ width: '100%', borderRadius: 12, marginBottom: 12 }}
        />
        <h2 style={{ margin: '0 0 8px' }}>{drink.name}</h2>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            to={`/cocktail/${drink.id}`}
            style={{ padding: '8px 12px', border: '1px solid #999', borderRadius: 8 }}
          >
            See more
          </Link>
          <button
            onClick={handleNewRandom}
            disabled={refreshing}
            style={{ padding: '8px 12px', borderRadius: 8 }}
          >
            {refreshing ? 'Hämtar…' : 'Ny slumpad cocktail'}
          </button>
        </div>
      </article>
    </main>
  );
}
