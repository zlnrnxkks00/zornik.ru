import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./LenormandCardPage.module.scss";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Intro } from "../../components/Intro/Intro";

const LenormandCardPage: FC = () => {
  const { id } = useParams();
  const cardId = Number(id);

  const card = LENORMAND_CARDS.find(({ id: currentId }) => currentId === cardId);

  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>
          {card ? <img src={card.image} alt={card.name} className={styles.introImg} /> : "ЛЕНОРМАН"}
        </h1>
      </Intro>

      <div className={styles.wrapper}>
        {card ? (
          <article className={styles.card}>
            <div>
              <h2 className={styles.cardTitle}>{card.name}</h2>
            </div>
          </article>
        ) : (
          <div className={styles.notFound}>
            <h2>Карта не найдена</h2>
            <Link to="/lenormand" className={styles.backLink}>
              Вернуться к списку Ленорман
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LenormandCardPage;
