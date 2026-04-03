import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import introBg from "../../assets/intro_bg.png";
import starIcon from "../../assets/other elements/star.png";
import videoStars from "../../assets/other elements/video_stars.mp4";
import { motion, AnimatePresence } from "framer-motion";

const HomePage: FC = () => {
  const [animationStage, setAnimationStage] = useState<"title" | "menu">("title");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, мобильное ли устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // На мобильных устройствах не скрываем надпись
    if (!isMobile) {
      const timer = setTimeout(() => {
        setAnimationStage("menu");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.page}>
      {/* Видео фон */}
      <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline>
        <source src={videoStars} type="video/mp4" />
      </video>

      {/* Бургер-кнопка для мобильных устройств */}
      <button
        className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
        onClick={toggleMenu}
        aria-label="Меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className={styles.navMobile}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.navMobileContent}>
              <button
                className={styles.mobileMenuButton}
                onClick={() => handleNavigation("/lenormand")}
              >
                ЛЕНОРМАН
              </button>
              <img src={starIcon} alt="" className={styles.mobileStar} />
              <button className={styles.mobileMenuButton} onClick={() => handleNavigation("/taro")}>
                ТАРО
              </button>
              <img src={starIcon} alt="" className={styles.mobileStar} />
              <button
                className={styles.mobileMenuButton}
                onClick={() => handleNavigation("/combinations")}
              >
                СОЧЕТАНИЯ
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.circle}>
          <img src={introBg} alt="" className={styles.circleBg} />

          {/* Надпись ZORNIK - на мобильных всегда видна */}
          {(animationStage === "title" || isMobile) && (
            <div className={`${styles.titleText} ${isMobile ? styles.titleTextMobile : ""}`}>
              ZORNIK
            </div>
          )}

          {/* Десктопное меню (только не на мобильных) */}
          {animationStage === "menu" && !isMobile && (
            <div className={styles.menuDesktop}>
              <button className={styles.menuButton} onClick={() => handleNavigation("/lenormand")}>
                ЛЕНОРМАН
              </button>
              <img src={starIcon} alt="" className={styles.star} />
              <button className={styles.menuButton} onClick={() => handleNavigation("/taro")}>
                ТАРО
              </button>
              <img src={starIcon} alt="" className={styles.star} />
              <button
                className={styles.menuButton}
                onClick={() => handleNavigation("/combinations")}
              >
                СОЧЕТАНИЯ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
