import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TarotPage from "./pages/TaroPage/TaroPage";
import LenormandPage from "./pages/LenormandPage/LenormandPage";
import CombinationsPage from "./pages/CombinationsPage/CombinationsPage";
import TaroCardPage from "./pages/TaroCardPage/TaroCardPage";
import LenormandCardPage from "./pages/LenormandCardPage/LenormandCardPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/taro" element={<TarotPage />} />
          <Route path="/taro/:id" element={<TaroCardPage />} />
          <Route path="/lenormand" element={<LenormandPage />} />
          <Route path="/lenormand/:id" element={<LenormandCardPage />} />
          <Route path="/combinations" element={<CombinationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
