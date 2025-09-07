import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCocktailSearch } from '../hooks/useCocktails';

export default function SearchPage() {
  // input state (controlled)
  const [q, setQ] = useState('');
  // the term actually used to query (submitted)
  const [submitted, setSubmitted] = useState('');

  // fetch results whenever `submitted` changes
  const { data, loading, error } = useCocktailSearch(submitted);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const results = data ?? [];
  const pages = Math.max(1, Math.ceil(results.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return results.slice(start, start + pageSize);
  }, [results, page]);

  // form submit with simple validation
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;        // validation: ignore empty
    setPage(1);               // reset to first page
    setSubmitted(term);
  }

  return (
    <main style={{maxWidth: 720, margin: '0 auto', padding: '1rem', display: 'grid', gap: 16}}>
      <h1>Search Cocktails</h1>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. margarita"
          aria-label="Search by cocktail name"
          style={{ flex: 1, padding: '8px 10px' }}
        />
        <button type="submit" disabled={!q.trim()}>
          Search
        </button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      <ul className="grid grid-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
  {paged.map((c) => (
    <li key={c.id} className="card" style={{ padding: 12 }}>
      <Link to={`/cocktail/${c.id}`}>{c.name}</Link>
    </li>
  ))}
</ul>

      {/* Pagination controls (only if needed) */}
      {results.length > pageSize && (
        <nav
          aria-label="Pagination"
          style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}
        >
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} / {pages}
          </span>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
            Next
          </button>
        </nav>
      )}

      {/* Empty state after a search */}
      {!loading && !error && submitted && results.length === 0 && (
        <p>No results for “{submitted}”.</p>
      )}
    </main>
  );
}
