import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import introBg from "../../assets/intro_bg.png";
import starIcon from "../../assets/other elements/star.png";
import videoStars from "../../assets/other elements/video_stars.mp4";

const HomePage: FC = () => {
  const [animationStage, setAnimationStage] = useState<"title" | "menu">("title");
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStage("menu");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.page}>
      {/* Видео фон */}
      <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline>
        <source src={videoStars} type="video/mp4" />
      </video>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.circle}>
          <img src={introBg} alt="" className={styles.circleBg} />

          {/* Надпись ZORNIK */}
          {animationStage === "title" && <div className={styles.titleText}>ZORNIK</div>}

          {animationStage === "menu" && (
            <div className={styles.menu}>
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
