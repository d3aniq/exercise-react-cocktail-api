import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import CocktailInfoPage from './pages/CocktailInfoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/cocktail/:id" element={<CocktailInfoPage />} />
    </Routes>
  );
}

export default App;
