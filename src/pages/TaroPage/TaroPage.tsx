import { FC } from "react";
import styles from "./TaroPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { Card } from "../../components/Card/Card";
import { Intro } from "../../components/Intro/Intro";

const TaroPage: FC = () => {
  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>Таро</h1>
      </Intro>
      <div className={styles.wrapper}>
        {TARO_CARDS.map(({ title, cards }) => (
          <div key={title}>
            <h2 className={styles.cardsTitle}>{title}</h2>

            <ul className={styles.cardsContainer}>
              {cards.map(({ id, name, image }) => (
                <Card key={id} name={name} image={image} link={`/taro/${id}`} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaroPage;
