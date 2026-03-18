import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./TaroCardPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { Intro } from "../../components/Intro/Intro";

const TaroCardPage: FC = () => {
  const { id } = useParams();
  const cardId = Number(id);

  const card = TARO_CARDS.flatMap(({ cards }) => cards).find(
    ({ id: currentId }) => currentId === cardId
  );

  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>
          {card ? <img src={card.image} alt={card.name} className={styles.introImg} /> : "Таро"}
        </h1>
      </Intro>

      <div className={styles.wrapper}>
        {card ? (
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>{card.name}</h2>
          </article>
        ) : (
          <div className={styles.notFound}>
            <h2>Карта не найдена</h2>
            <Link to="/taro" className={styles.backLink}>
              Вернуться к списку Таро
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaroCardPage;
