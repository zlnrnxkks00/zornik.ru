import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./LenormandCardPage.module.scss";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Intro } from "../../components/Intro/Intro";
import rightArrow from "../../assets/other_elements/right.png";
import { AnimatePresence, motion } from "framer-motion";
import { fetchLenormandCard } from "../../api/api";
import type { LenormandCardData } from "../../types";

interface AccordionItem {
  title: string;
  content: string;
}

function buildLenormandAccordion(data: LenormandCardData): AccordionItem[] {
  const combinationsText = Object.entries(data.Combinations)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return [
    { title: "Ключевые слова", content: data.Key_value },
    { title: "Основное значение", content: data.Main_Meaning },
    { title: "Негативное значение", content: data.Negative_Meaning },
    { title: "Отношения", content: data.Relationships },
    { title: "Работа и финансы", content: data.Business_and_Finance },
    { title: "Здоровье", content: data.Health },
    { title: "Личность", content: data.Personality },
    { title: "Сочетания", content: combinationsText },
  ].filter((item) => item.content);
}

const LenormandCardPage: FC = () => {
  const { id } = useParams();
  const cardId = Number(id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [cardData, setCardData] = useState<LenormandCardData | null>(null);
  const [loading, setLoading] = useState(true);

  const card = LENORMAND_CARDS.find(({ id: currentId }) => currentId === cardId);

  useEffect(() => {
    let active = true;
    fetchLenormandCard(cardId).then((data) => {
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

  const accordionData = cardData ? buildLenormandAccordion(cardData) : [];

  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>
          {card ? <img src={card.image} alt={card.name} className={styles.introImg} /> : "Ленорман"}
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
