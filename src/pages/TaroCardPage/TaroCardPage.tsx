import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./TaroCardPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { Intro } from "../../components/Intro/Intro";
import rightArrow from "../../assets/other elements/right.png";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  title: string;
  content: string;
}

const TaroCardPage: FC = () => {
  const { id } = useParams();
  const cardId = Number(id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const card = TARO_CARDS.flatMap(({ cards }) => cards).find(
    ({ id: currentId }) => currentId === cardId
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Данные для аккордеонов временные
  const accordionData: AccordionItem[] = [
    {
      title: "Общее значение в раскладе",
      content:
        "Текст общего значения карты в раскладе. Здесь будет подробное описание того, что означает эта карта в прямом положении, её основные символы и значения.",
    },
    {
      title: "Личностное состояние",
      content:
        "Текст о личностном состоянии. Как карта влияет на внутреннее состояние человека, его эмоции и мысли.",
    },
    {
      title: "На более глубоком уровне",
      content: "Текст о глубинном значении карты. Скрытые смыслы и подсознательные аспекты.",
    },
    {
      title: "Профессиональная ситуация",
      content: "Текст о профессиональной сфере. Карьера, работа, профессиональное развитие.",
    },
    {
      title: "Финансовое и жилищное положение",
      content: "Текст о финансах и доме. Деньги, недвижимость, материальное благополучие.",
    },
    { title: "Личные отношения", content: "Текст об отношениях. Любовь, дружба, семейные связи." },
    {
      title: "Состояние здоровья",
      content: "Текст о здоровье. Физическое и эмоциональное состояние.",
    },
    {
      title: "Перевёрнутая карта",
      content: "Текст о перевернутом значении карты. Что означает карта в перевернутом положении.",
    },
    {
      title: "Проявления в сочетаниях",
      content: "Текст о проявлениях карты в сочетаниях с другими картами.",
    },
    {
      title: "Архетипические соответствия",
      content: "Текст об архетипах и мифологических соответствиях карты.",
    },
    {
      title: "Копилка наблюдений",
      content: "Текст с личными наблюдениями и дополнительными заметками.",
    },
    { title: "Сочетания", content: "Список сочетаний с другими картами." },
  ];

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
