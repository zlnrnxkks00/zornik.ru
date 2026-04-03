import { FC } from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  image: string;
  link: string;
  borderColor?: string;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  hover?: boolean;
}

export const Card: FC<CardProps> = ({
  name,
  image,
  link,
  borderColor,
  onRemove,
  hover = true,
  showRemoveButton = false,
}) => {
  const content = (
    <div className={`${styles.card} ${hover ? styles.hover : ""}`}>
      {/* Крестик */}
      {showRemoveButton && onRemove && (
        <button
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          ✕
        </button>
      )}
      {/* Блок с картинкой */}
      <div
        className={`${styles.cardImage} ${borderColor ? styles.border : ""}`}
        style={{ borderColor }}
      >
        {/* Картинка */}
        <img src={image} alt={name} className={styles.cardImage} />
      </div>

      <div className={styles.cardName}>{name}</div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className={styles.link}>
        {content}
      </Link>
    );
  }

  return content;
};
