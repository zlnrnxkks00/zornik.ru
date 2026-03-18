import { FC, PropsWithChildren } from "react";
import styles from "./Intro.module.scss";
import { NavLink } from "react-router-dom";

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

      <div className={styles.content}>{children}</div>
    </section>
  );
};
