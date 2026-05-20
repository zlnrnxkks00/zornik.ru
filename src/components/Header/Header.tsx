import { FC, useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import starIcon from "../../assets/other_elements/star.png";
import logo from "../../assets/logo_zornik.svg";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.headerLogo}>
        <img src={logo} alt="Zornik Logo" />
      </a>
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

      {/* Десктопная навигация */}
      <nav className={styles.navDesktop}>
        <NavLink className={styles.link} to="/lenormand" onClick={closeMenu}>
          Ленорман
        </NavLink>
        <NavLink className={styles.link} to="/taro" onClick={closeMenu}>
          Таро
        </NavLink>
        <NavLink className={styles.link} to="/combinations" onClick={closeMenu}>
          Сочетания
        </NavLink>
      </nav>
      <div className={styles.headerSpacer}></div>

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
              <NavLink className={styles.mobileLink} to="/lenormand" onClick={closeMenu}>
                Ленорман
              </NavLink>
              <img src={starIcon} alt="" className={styles.mobileStar} />
              <NavLink className={styles.mobileLink} to="/taro" onClick={closeMenu}>
                Таро
              </NavLink>
              <img src={starIcon} alt="" className={styles.mobileStar} />
              <NavLink className={styles.mobileLink} to="/combinations" onClick={closeMenu}>
                Сочетания
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
