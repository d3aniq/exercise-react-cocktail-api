import { useState } from 'react';
import { useRandomCocktail } from '../hooks/useCocktails';
import { getRandomCocktail } from '../utils/fetchData';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  // Första laddningen via hook
  const { data: cocktail, loading, error } = useRandomCocktail();
  const [refreshing, setRefreshing] = useState(false);
  const [current, setCurrent] = useState(cocktail);

  async function refresh() {
    try {
      setRefreshing(true);
      const c = await getRandomCocktail();
      setCurrent(c);
    } finally {
      setRefreshing(false);
    }
  }

  const drink = current ?? cocktail;

  if (loading && !drink) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;
  if (!drink) return <p>Ingen drink hittades.</p>;

  return (
    <div>
      <h1>{drink.name}</h1>
      <img src={drink.thumbnail} alt={drink.name} width={300} />
      <div>
        <Link to={`/cocktail/${drink.id}`}>See more</Link>
      </div>
      <button onClick={refresh} disabled={refreshing}>
        {refreshing ? 'Hämtar...' : 'Ny slumpad cocktail'}
      </button>
    </div>
  );
}
