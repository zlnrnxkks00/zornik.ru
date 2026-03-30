import { FC } from "react";
import styles from "./LenormandPage.module.scss";
import { Card } from "../../components/Card/Card";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Intro } from "../../components/Intro/Intro";
import { motion } from "framer-motion";

const LenormandPage: FC = () => {
  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>ЛЕНОРМАН</h1>
      </Intro>
      <div className={styles.wrapper}>
        <motion.ul
          className={styles.cardsContainer}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {LENORMAND_CARDS.map(({ id, name, image }) => (
            <motion.li
              key={id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{ listStyle: "none" }}
            >
              <Card name={name} image={image} link={`/lenormand/${id}`} borderColor="#502958" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default LenormandPage;
