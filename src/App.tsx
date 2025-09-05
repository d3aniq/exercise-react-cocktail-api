import { Routes, Route, Link, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import CocktailInfoPage from './pages/CocktailInfoPage';

export default function App() {
  return (
    <>
      <header className="nav">
        <nav className="nav-inner">
          {/* <Link to="/" className="logo" style={{ fontWeight: 700 }}>Cocktail Wiki</Link> */}
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/search" className={({isActive}) => isActive ? 'active' : ''}>Search</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cocktail/:id" element={<CocktailInfoPage />} />
        </Routes>
      </main>

      <footer className="container" style={{ color: 'var(--muted)', fontSize: 14 }}>
        © {new Date().getFullYear()} Cocktail Wiki
      </footer>
    </>
  );
}
