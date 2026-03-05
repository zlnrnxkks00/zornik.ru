import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TarotPage from './pages/TaroPage';
import LenormandPage from './pages/LenormandPage';
import CombinationsPage from './pages/CombinationsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/lenormand" element={<LenormandPage />} />
          <Route path="/combinations" element={<CombinationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;