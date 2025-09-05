import { Link, useParams } from 'react-router-dom';
import { useCocktailById } from '../hooks/useCocktails';

export default function CocktailInfoPage() {
  const { id = '' } = useParams();
  const { data: c, loading, error } = useCocktailById(id);

  if (loading) return <p>Laddar…</p>;
  if (error) return <p style={{ color: 'crimson' }}>Fel: {error}</p>;
  if (!c) return <p>Ingen data.</p>;

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '1rem', display: 'grid', gap: 16 }}>
      {/* 3) Navigation */}
      {/* <nav style={{ display: 'flex', gap: 8 }}>
        <Link to="/">&larr; Home</Link>
        <span>•</span>
        <Link to="/search">Search</Link>
      </nav> */}

      <header style={{ display: 'grid', gap: 8 }}>
        <h1 style={{ margin: 0 }}>{c.name}</h1>
        <div style={{ fontSize: 14, color: '#555' }}>
          <strong>Category:</strong> {c.category} &nbsp;|&nbsp; 
          <strong>Alcoholic:</strong> {c.alcoholic ? 'Yes' : 'No'} &nbsp;|&nbsp; 
          <strong>Glass:</strong> {c.glass}
        </div>
        {c.tags.length > 0 && (
          <div style={{ fontSize: 14 }}>
            <strong>Tags:</strong> {c.tags.join(', ')}
          </div>
        )}
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
        {/* { <img
          src={c.thumbnail}
          alt={c.name}
          style={{ width: '100%', borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}
        /> } */}

        <img src={c.thumbnail} alt={c.name} className="rounded" />


        <article style={{ display: 'grid', gap: 12 }}>
          <div>
            <h3 style={{ margin: '0 0 6px' }}>Ingredients</h3>
            <ul style={{ margin: 0 }}>
              {c.ingredients.map((i, idx) => (
                <li key={idx}>
                  {/* BONUS: gör ingrediensen klickbar till /ingredient/:name om du lägger till den sidan */}
                  {/* <Link to={`/ingredient/${encodeURIComponent(i.ingredient)}`}>{i.ingredient}</Link> */}
                  <span>{i.ingredient}</span>
                  {i.measure ? ` — ${i.measure}` : ''}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ margin: '0 0 6px' }}>Instructions</h3>
            <p style={{ margin: 0 }}>{c.instructions}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
