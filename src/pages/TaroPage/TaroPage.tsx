import { FC } from "react";
import styles from "./TaroPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { Card } from "../../components/Card/Card";
import { Intro } from "../../components/Intro/Intro";
import { motion } from "framer-motion";

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

            <motion.ul
              className={styles.cardsContainer}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {cards.map(({ id, name, image }) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{ listStyle: "none" }}
                >
                  <Card name={name} image={image} link={`/taro/${id}`} />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaroPage;
