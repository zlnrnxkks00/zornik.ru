import { FC, PropsWithChildren, useState } from "react";
import styles from "./Intro.module.scss";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import starIcon from "../../assets/other elements/star.png";

export const Intro: FC<PropsWithChildren> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className={styles.intro}>
      <header className={styles.header}>
        {/* Бургер-кнопка для мобильных устройств */}
        <button 
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ''}`} 
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

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className={styles.navMobile}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className={styles.navMobileContent}>
                <NavLink 
                  className={styles.mobileLink} 
                  to="/lenormand" 
                  onClick={closeMenu}
                >
                  Ленорман
                </NavLink>
                <img src={starIcon} alt="" className={styles.mobileStar} />
                <NavLink 
                  className={styles.mobileLink} 
                  to="/taro" 
                  onClick={closeMenu}
                >
                  Таро
                </NavLink>
                <img src={starIcon} alt="" className={styles.mobileStar} />
                <NavLink 
                  className={styles.mobileLink} 
                  to="/combinations" 
                  onClick={closeMenu}
                >
                  Сочетания
                </NavLink>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};