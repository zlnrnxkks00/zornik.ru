import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import moonIcon from "../../assets/moon.svg";
import startImage from "../../assets/start_image.png";

import logo from "../../assets/logo_zornik.svg";
const HomePage: FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.content}>
        <section className={styles.content__intro}>
          <div className={styles.title}>
            <img src={moonIcon} alt="Moon" className={styles.title__icon} />
            <h1 className={styles.title__text}>Zornik</h1>
          </div>

          <div className={styles.content__buttons}>
            <button onClick={() => handleNavigation("/taro")} type="button">
              ТАРО
            </button>
            <button onClick={() => handleNavigation("/lenormand")} type="button">
              ЛЕНОРМАН
            </button>
            <button onClick={() => handleNavigation("/combinations")} type="button">
              СОЧЕТАНИЯ
            </button>
          </div>
        </section>

        <img src={startImage} alt="Start" className={styles.introImg} />
      </div>
    </>
  );
};

export default HomePage;
