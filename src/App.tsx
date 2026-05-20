import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TarotPage from "./pages/TaroPage/TaroPage";
import LenormandPage from "./pages/LenormandPage/LenormandPage";
import CombinationsPage from "./pages/CombinationsPage/CombinationsPage";
import styles from "./App.module.scss";
import { useEffect, useRef } from "react";
import bgVideo from "../src/assets/bgVideo.mp4";
import { Header } from "./components/Header/Header";

function AppContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    // Запускаем сразу и при событии canplay (Safari ждёт готовности буфера)
    tryPlay();
    video.addEventListener("canplay", tryPlay);

    // Запасной вариант: первое касание/клик (iOS в режиме энергосбережения)
    document.addEventListener("touchstart", tryPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  return (
    <div className={styles.page}>
      {/* Видео фон */}
      {location.pathname !== "/" && <Header />}

      <video
        ref={videoRef}
        className={styles.video}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        x-webkit-airplay="allow"
        preload="auto"
        disablePictureInPicture
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/taro" element={<TarotPage />} />
        <Route path="/lenormand" element={<LenormandPage />} />
        <Route path="/combinations" element={<CombinationsPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
