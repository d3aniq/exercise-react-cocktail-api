import { useMemo, useState } from 'react';
import { useCocktailSearch } from '../hooks/useCocktails';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [submitted, setSubmitted] = useState('');

  const { data, loading, error } = useCocktailSearch(submitted);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const results = data ?? [];

  const pages = Math.max(1, Math.ceil(results.length / pageSize));
  const slice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return results.slice(start, start + pageSize);
  }, [results, page]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSubmitted(q);
  }

  return (
    <div>
      <h1>Sök cocktail</h1>
      <form onSubmit={onSubmit}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="t.ex. margarita"
        />
        <button type="submit" disabled={!q.trim()}>
          Sök
        </button>
      </form>

      {loading && <p>Laddar...</p>}
      {error && <p>Fel: {error}</p>}

      <ul>
        {slice.map((c) => (
          <li key={c.id}>
            <Link to={`/cocktail/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>

      {results.length > pageSize && (
        <nav>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Föregående
          </button>
          <span> Sida {page} / {pages} </span>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
            Nästa
          </button>
        </nav>
      )}
    </div>
  );
}
