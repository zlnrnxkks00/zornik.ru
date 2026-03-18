import { FC } from "react";
import styles from "./CombinationsPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { Card } from "../../components/Card/Card";
import { Intro } from "../../components/Intro/Intro";
import { Combinations } from "../../components/Combinations/Combinations";

const CombinationsPage: FC = () => {
  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>СОЧЕТАНИЯ</h1>
      </Intro>
      <div className={styles.wrapper}>
        <h2 className={styles.sectionTitle}>ТАРО</h2>
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

        <div>
          <Combinations />
        </div>
      </div>
    </div>
  );
};

export default CombinationsPage;
