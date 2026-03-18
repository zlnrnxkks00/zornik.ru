import { FC } from "react";
import styles from "./LenormandPage.module.scss";
import { Card } from "../../components/Card/Card";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Intro } from "../../components/Intro/Intro";

const LenormandPage: FC = () => {
  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>ЛЕНОРМАН</h1>
      </Intro>
      <div className={styles.wrapper}>
        <ul className={styles.cardsContainer}>
          {LENORMAND_CARDS.map(({ id, name, image }) => (
            <Card
              key={id}
              name={name}
              image={image}
              link={`/lenormand/${id}`}
              borderColor="#502958"
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LenormandPage;
