import { useParams, Link } from 'react-router-dom';
import { useCocktailById } from '../hooks/useCocktails';

export default function CocktailInfoPage() {
  const { id = '' } = useParams();
  const { data: c, loading, error } = useCocktailById(id);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;
  if (!c) return <p>Ingen data.</p>;

  return (
    <div>
      <Link to="/search">← Till sök</Link>
      <h1>{c.name}</h1>
      <img src={c.thumbnail} alt={c.name} width={300} />
      <p><strong>Category:</strong> {c.category}</p>
      <p><strong>Alcoholic:</strong> {c.alcoholic ? 'Yes' : 'No'}</p>
      <p><strong>Glass:</strong> {c.glass}</p>
      {c.tags.length > 0 && <p><strong>Tags:</strong> {c.tags.join(', ')}</p>}

      <h3>Ingredients</h3>
      <ul>
        {c.ingredients.map((i, idx) => (
          <li key={idx}>
            {i.ingredient} {i.measure ? `– ${i.measure}` : ''}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{c.instructions}</p>
    </div>
  );
}
