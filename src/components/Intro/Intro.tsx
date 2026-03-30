import { FC, PropsWithChildren } from "react";
import styles from "./Intro.module.scss";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const Intro: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={styles.intro}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink className={styles.link} to="/lenormand">
            Ленорман
          </NavLink>
          <NavLink className={styles.link} to="/taro">
            Таро
          </NavLink>
          <NavLink className={styles.link} to="/combinations">
            Сочетания
          </NavLink>
        </nav>
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
