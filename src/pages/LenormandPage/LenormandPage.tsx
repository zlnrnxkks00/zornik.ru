import { FC, useState, useEffect, useRef } from "react";
import styles from "./LenormandPage.module.scss";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { motion, AnimatePresence } from "framer-motion";
import lenormandIcon from "../../assets/lenormand_icon_title.svg";
import starsTop from "../../assets/stars_top.svg";
import starsBottom from "../../assets/stars_bottom.svg";
import rightArrow from "../../assets/other_elements/right.png";
import { fetchLenormandCard } from "../../api/api";
import type { LenormandCardData, TCard } from "../../types";
import { Notify, TStatusNotify } from "../../components/Notify/Notify";

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

const LenormandPage: FC = () => {
  const defaultCard = LENORMAND_CARDS[0];
  const [selectedCard, setSelectedCard] = useState<TCard>(defaultCard);
  const [fetchedData, setFetchedData] = useState<{
    id: number;
    data: LenormandCardData | null;
  } | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [notify, setNotify] = useState<{
    open: boolean;
    status: TStatusNotify;
    text: string;
  }>({ open: false, status: "error", text: "" });

  const isLoading = fetchedData?.id !== selectedCard.id;

  useEffect(() => {
    let active = true;
    fetchLenormandCard(selectedCard.id)
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

  const rightPanelRef = useRef<HTMLDivElement>(null);

  const handleSelectCard = (card: TCard) => {
    setSelectedCard(card);
    if (window.matchMedia("(max-width: 1200px)").matches) {
      setTimeout(() => {
        rightPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const accordionData =
    !isLoading && fetchedData?.data ? buildLenormandAccordion(fetchedData.data) : [];

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
            <img src={lenormandIcon} alt="" className={styles.title__icon} />
            <h1 className={styles.title__text}>LENORMAND</h1>
          </div>

          <ul className={styles.cardGridInner}>
            {LENORMAND_CARDS.map((card, i) => (
              <motion.li
                key={card.id}
                className={`${styles.cardItem} ${selectedCard.id === card.id ? styles.cardItem_active : ""}`}
                onClick={() => handleSelectCard(card)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.25 }}
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
        </div>

        {/* Right panel */}
        <div ref={rightPanelRef} className={styles.rightPanel}>
          <img src={starsTop} alt="" className={`${styles.starsImg} ${styles.starsImg_top}`} />

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
                      className={`${styles.accordionHeader} ${
                        openSections[item.title] ? styles.accordionHeaderOpen : ""
                      }`}
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

          <img
            src={starsBottom}
            alt=""
            className={`${styles.starsImg} ${styles.starsImg_bottom}`}
          />
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

export default LenormandPage;
