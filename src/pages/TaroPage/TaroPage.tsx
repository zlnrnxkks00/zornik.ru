import { FC, useState, useEffect } from "react";
import styles from "./TaroPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { motion, AnimatePresence } from "framer-motion";
import moonIcon from "../../assets/moon.svg";
import cloudTop from "../../assets/cloud_top.svg";
import cloudBottom from "../../assets/cloud_bottom.svg";
import lineIcon from "../../assets/line.svg";
import rightArrow from "../../assets/other_elements/right.png";
import { fetchTaroCard } from "../../api/api";
import type { TaroCardData, TCard } from "../../types";
import { Notify, TStatusNotify } from "../../components/Notify/Notify";

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

const TaroPage: FC = () => {
  const defaultCard = TARO_CARDS[0].cards[0];
  const [selectedCard, setSelectedCard] = useState<TCard>(defaultCard);
  // Хранит данные вместе с id карты, чтобы определять состояние загрузки без
  // синхронных вызовов setState внутри эффекта
  const [fetchedData, setFetchedData] = useState<{ id: number; data: TaroCardData | null } | null>(
    null
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [notify, setNotify] = useState<{
    open: boolean;
    status: TStatusNotify;
    text: string;
  }>({ open: false, status: "error", text: "" });

  const isLoading = fetchedData?.id !== selectedCard.id;

  useEffect(() => {
    let active = true;
    fetchTaroCard(selectedCard.id)
      .then((data) => {
        if (active) {
          setFetchedData({ id: selectedCard.id, data });
          setOpenSections({});
        }
      })
      .catch((error) => {
        if (active) {
          setFetchedData({ id: selectedCard.id, data: null });
          setOpenSections({});
          if (error instanceof DOMException && error.name === "TimeoutError") {
            setNotify({
              open: true,
              status: "warning",
              text: "Проблемы с сетью, попробуйте позже",
            });
          } else {
            setNotify({ open: true, status: "error", text: "Не удалось загрузить данные карты" });
          }
        }
      });
    return () => {
      active = false;
    };
  }, [selectedCard.id]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const accordionData = !isLoading && fetchedData?.data ? buildTaroAccordion(fetchedData.data) : [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(8px)" }}
        className={styles.content}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ flex: 1, position: "relative", zIndex: 1 }}
      >
        {/* Left panel */}
        <div className={styles.leftPanel}>
          <div className={styles.title}>
            <img src={moonIcon} alt="Moon" className={styles.title__icon} />
            <h1 className={styles.title__text}>TARO</h1>
          </div>

          <ul className={styles.categoryList}>
            {TARO_CARDS.map(({ title, cards }) => {
              const isOpen = openCategory === title;
              const hasSelected = cards.some((c) => c.id === selectedCard.id);
              return (
                <li key={title} className={styles.categoryList__item}>
                  <div
                    className={`${styles.categoryHeader} ${isOpen || hasSelected ? styles.categoryHeader_active : ""}`}
                    onClick={() => setOpenCategory((prev) => (prev === title ? "" : title))}
                  >
                    <img src={lineIcon} alt="" className={styles.lineDecor} />
                    <span className={styles.categoryList__item__title}>{title}</span>
                    <img src={lineIcon} alt="" className={styles.lineDecor} />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="cards"
                        className={styles.cardGrid}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <ul className={styles.cardGridInner}>
                          {cards.map((card, i) => (
                            <motion.li
                              key={card.id}
                              className={styles.cardItem}
                              onClick={() => setSelectedCard(card)}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.03, duration: 0.2 }}
                            >
                              <img
                                src={card.image}
                                alt={card.name}
                                className={`${styles.cardThumb} ${selectedCard.id === card.id ? styles.cardThumb_active : ""}`}
                              />
                              <h3 className={styles.cardName}>{card.name}</h3>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <img src={cloudTop} alt="" className={styles.cloudImg} />

          <div className={styles.cardContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCard.id}
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.95 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className={styles.cardImage}
                />
                <p className={styles.cardName}>{selectedCard.name}</p>
              </motion.div>
            </AnimatePresence>
            <div className={styles.accordionWrapper}>
              {isLoading ? (
                <div className={styles.loadingWrapper}>
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                </div>
              ) : (
                accordionData.map((item, index) => (
                  <div key={index} className={styles.accordionItem}>
                    <button
                      className={`${styles.accordionHeader} ${openSections[item.title] ? styles.accordionHeaderOpen : ""}`}
                      onClick={() => toggleSection(item.title)}
                    >
                      <span>{item.title}</span>
                      <motion.img
                        src={rightArrow}
                        alt=""
                        className={styles.accordionArrow}
                        animate={{ rotate: openSections[item.title] ? 90 : 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {openSections[item.title] && (
                        <motion.div
                          key={item.title}
                          className={styles.accordionContent}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15, ease: "easeInOut" }}
                        >
                          <p>{item.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </div>

          <img src={cloudBottom} alt="" className={styles.cloudImg} />
        </div>

        <Notify
          status={notify.status}
          open={notify.open}
          setOpen={(open) => setNotify((prev) => ({ ...prev, open }))}
          title="Ошибка"
          text={notify.text}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default TaroPage;
