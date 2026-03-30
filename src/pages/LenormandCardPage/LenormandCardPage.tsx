import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./LenormandCardPage.module.scss";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Intro } from "../../components/Intro/Intro";
import rightArrow from "../../assets/other elements/right.png";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  title: string;
  content: string;
}

const LenormandCardPage: FC = () => {
  const { id } = useParams();
  const cardId = Number(id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const card = LENORMAND_CARDS.find(({ id: currentId }) => currentId === cardId);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Временные данные для аккордеонов Ленорман
  const accordionData: AccordionItem[] = [
    {
      title: "Описание",
      content: "Текст описания карты. Основные символы и образы, связанные с этой картой.",
    },
    {
      title: "Ключевые слова",
      content: "Список ключевых слов: быстрота, информация, прибытие, новости.",
    },
    {
      title: "Основное значение",
      content: "Текст основного значения карты в прямом положении. Что она означает в раскладе.",
    },
    {
      title: "Негативное значение",
      content: "Текст негативного значения карты. Предостережения и возможные проблемы.",
    },
    {
      title: "Отношения",
      content: "Текст о значении карты в сфере отношений. Любовь, дружба, семья.",
    },
    {
      title: "Работа и финансы",
      content: "Текст о значении карты в профессиональной сфере и финансах.",
    },
    {
      title: "Здоровье",
      content: "Текст о значении карты для здоровья. Физическое и эмоциональное состояние.",
    },
    {
      title: "Личность",
      content: "Текст о том, как карта описывает человека. Характер, поведение, особенности.",
    },
    { title: "Сочетания", content: "Список сочетаний с другими картами и их значения." },
  ];

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
