import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./TaroCardPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { Intro } from "../../components/Intro/Intro";
import rightArrow from "../../assets/other_elements/right.png";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTaroCard } from "../../api/api";
import type { TaroCardData } from "../../types";

interface AccordionItem {
  title: string;
  content: string;
}

function buildTaroAccordion(data: TaroCardData): AccordionItem[] {
  const combinationsText = Object.entries(data.Combinations)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return [
    { title: "Общее значение в раскладе", content: data.General_Meaning },
    { title: "Личностное состояние", content: data.Personal_State },
    { title: "На более глубоком уровне", content: data.On_a_Deeper_Level },
    { title: "Профессиональная ситуация", content: data.Professional_Situation },
    { title: "Финансовое и жилищное положение", content: data.Financial_and_Housing_Status },
    { title: "Личные отношения", content: data.Relationships },
    { title: "Состояние здоровья", content: data.Health_Status },
    { title: "Перевёрнутая карта", content: data.Reversed_Card },
    { title: "Проявления в сочетаниях", content: data.Manifestations_in_Combinations },
    { title: "Архетипические соответствия", content: data.Archetypal_Correspondences },
    { title: "Копилка наблюдений", content: data.Observation_Bank },
    { title: "Сочетания", content: combinationsText },
  ].filter((item) => item.content);
}

const TaroCardPage: FC = () => {
  const { id } = useParams();
  const cardId = Number(id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [cardData, setCardData] = useState<TaroCardData | null>(null);
  const [loading, setLoading] = useState(true);

  const card = TARO_CARDS.flatMap(({ cards }) => cards).find(
    ({ id: currentId }) => currentId === cardId
  );

  useEffect(() => {
    let active = true;
    fetchTaroCard(cardId).then((data) => {
      if (active) {
        setCardData(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [cardId]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const accordionData = cardData ? buildTaroAccordion(cardData) : [];

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
            {/* Название карты */}
            <h2 className={styles.cardTitle}>{card.name}</h2>

            {/* Аккордеоны */}
            {loading ? (
              <p className={styles.loading}>Загрузка...</p>
            ) : (
              <div className={styles.accordionContainer}>
                {accordionData.map((item, index) => (
                  <div key={index} className={styles.accordionItem}>
                    <div
                      className={`${styles.accordionHeader} ${openSections[item.title] ? styles.open : ""}`}
                      onClick={() => toggleSection(item.title)}
                    >
                      <span>{item.title}</span>
                      <motion.img
                        src={rightArrow}
                        alt=""
                        className={styles.arrow}
                        animate={{ rotate: openSections[item.title] ? 90 : 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {openSections[item.title] && (
                        <motion.div
                          key={item.title}
                          className={styles.accordionContent}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.1, ease: "easeInOut" }}
                        >
                          <p>{item.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
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
