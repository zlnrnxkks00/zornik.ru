import { FC } from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

type TCard = {
  name: string;
  image: string;
  link: string;
  borderColor?: string;
};

export const Card: FC<TCard> = ({ name, image, link, borderColor }) => {
  return (
    <li className={styles.cardContainer}>
      <Link to={link} className={styles.card}>
        <img
          src={image}
          alt={name}
          className={`${styles.cardImage} ${borderColor ? styles.border : ""}`}
          style={{ borderColor }}
        />
        <h3 className={styles.cardTitle}>{name}</h3>
      </Link>
    </li>
  );
};
