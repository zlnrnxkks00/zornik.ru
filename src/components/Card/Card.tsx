import { FC } from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  image: string;
  link: string;
  borderColor?: string;
  hasBack?: boolean;
  backColor?: string;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export const Card: FC<CardProps> = ({ 
  name, 
  image, 
  link, 
  borderColor,
  hasBack = false,
  backColor = "#AB760D",
  onRemove,
  showRemoveButton = false
}) => {
  const content = (
    <div className={`${styles.card} ${hasBack ? styles.cardWithBack : ''}`}>
      {/* Блок с картинкой */}
      <div className={styles.imageBlock}>
        {/* Подложка */}
        {hasBack && (
          <div 
            className={styles.cardBack} 
            style={{ backgroundColor: backColor }}
          />
        )}
        
        {/* Рамка */}
        {borderColor && (
          <div 
            className={styles.cardBorder} 
            style={{ borderColor: borderColor }}
          />
        )}
        
        {/* Картинка */}
        <img src={image} alt={name} className={styles.cardImage} />
        
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
      </div>
      
      {/* Название */}
      <div className={styles.cardName}>{name}</div>
    </div>
  );

  if (link) {
    return <Link to={link} className={styles.link}>{content}</Link>;
  }

  return content;
};
