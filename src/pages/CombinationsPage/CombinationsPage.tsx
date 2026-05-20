import { FC, useState, useEffect } from "react";
import styles from "./CombinationsPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { motion, AnimatePresence } from "framer-motion";
import combinationIconLeft from "../../assets/comination_icon_left.svg";
import combinationIconRight from "../../assets/comination_icon_right.svg";
import emptyCardSvg from "../../assets/empry_card.svg";
import { fetchCombination } from "../../api/api";
import { Notify, TStatusNotify } from "../../components/Notify/Notify";
import lineIcon from "../../assets/line.svg";
type TabType = "taro" | "lenormand";

interface SelectedCardData {
  type: TabType;
  id: number;
  name: string;
  image: string;
}

interface CombinationResult {
  key: string;
  text: string[] | null;
}

const CombinationsPage: FC = () => {
  const [selectedCards, setSelectedCards] = useState<(SelectedCardData | null)[]>([
    null,
    null,
    null,
  ]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("taro");
  const [openTarotGroups, setOpenTarotGroups] = useState<Record<string, boolean>>({
    "Старшие арканы": true,
  });

  const [pairResult01, setPairResult01] = useState<CombinationResult | null>(null);
  const [pairResult12, setPairResult12] = useState<CombinationResult | null>(null);

  const [notify, setNotify] = useState<{
    open: boolean;
    status: TStatusNotify;
    title: string;
    text: string;
  }>({ open: false, status: "error", title: "", text: "" });

  const card0 = selectedCards[0];
  const card1 = selectedCards[1];
  const card2 = selectedCards[2];

  // ── Modal actions ─────────────────────────────────────────────────────────

  const openModal = (slotIndex: number) => {
    setActiveSlot(slotIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSlot(null);
  };

  const removeCard = (index: number) => {
    setSelectedCards((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const selectCard = (type: TabType, id: number, name: string, image: string) => {
    if (activeSlot === null) return;

    // Запрещаем смешивать карты Таро и Ленорман
    const hasConflict = selectedCards.some(
      (c, i) => c !== null && i !== activeSlot && c.type !== type
    );
    if (hasConflict) {
      const existing = selectedCards.find((c) => c !== null);
      setNotify({
        open: true,
        status: "warning",
        title: "Нельзя смешивать колоды",
        text:
          existing?.type === "taro"
            ? "Уже выбрана карта Таро — добавьте карту из той же колоды"
            : "Уже выбрана карта Ленорман — добавьте карту из той же колоды",
      });
      return;
    }

    setSelectedCards((prev) => {
      const next = [...prev];
      const alreadyInOtherSlot = next.some(
        (c, i) => c?.type === type && c.id === id && i !== activeSlot
      );
      if (alreadyInOtherSlot) return prev;
      next[activeSlot] = { type, id, name, image };
      return next;
    });
    closeModal();
  };

  const toggleTarotGroup = (title: string) => {
    setOpenTarotGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // ── Combination loading ───────────────────────────────────────────────────

  useEffect(() => {
    if (!card0 || !card1 || card0.type !== card1.type) return;
    const key = `${card0.type}:${card0.id}:${card1.id}`;
    let cancelled = false;
    fetchCombination(card0.type, [card0.id, card1.id])
      .then((result) => {
        if (!cancelled) setPairResult01({ key, text: result });
      })
      .catch((error) => {
        if (!cancelled) {
          setPairResult01({ key, text: null });
          const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
          setNotify({
            open: true,
            status: isTimeout ? "warning" : "error",
            title: "Сочетания",
            text: isTimeout
              ? "Сервер не отвечает, попробуйте позже"
              : "Не удалось загрузить сочетание",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [card0, card1]);

  useEffect(() => {
    if (!card1 || !card2 || card1.type !== card2.type) return;
    const key = `${card1.type}:${card1.id}:${card2.id}`;
    let cancelled = false;
    fetchCombination(card1.type, [card1.id, card2.id])
      .then((result) => {
        if (!cancelled) setPairResult12({ key, text: result });
      })
      .catch((error) => {
        if (!cancelled) {
          setPairResult12({ key, text: null });
          const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
          setNotify({
            open: true,
            status: isTimeout ? "warning" : "error",
            title: "Сочетания",
            text: isTimeout
              ? "Сервер не отвечает, попробуйте позже"
              : "Не удалось загрузить сочетание",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [card1, card2]);

  // ── Close modal on Escape ─────────────────────────────────────────────────

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const selectedCount = selectedCards.filter(Boolean).length;

  // Derive loading / text from key comparison (avoids synchronous setState in effects)
  const pair01Key =
    card0 && card1 && card0.type === card1.type ? `${card0.type}:${card0.id}:${card1.id}` : null;
  const pair01Loading = pair01Key !== null && pairResult01?.key !== pair01Key;
  const pair01Text = pairResult01?.key === pair01Key ? pairResult01.text : null;

  const pair12Key =
    card1 && card2 && card1.type === card2.type ? `${card1.type}:${card1.id}:${card2.id}` : null;
  const pair12Loading = pair12Key !== null && pairResult12?.key !== pair12Key;
  const pair12Text = pairResult12?.key === pair12Key ? pairResult12.text : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
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
          {/* Title */}
          <div className={styles.titleRow}>
            <h1 className={styles.titleText}>Сочетания</h1>
          </div>

          {/* Panel */}
          <div className={styles.panel}>
            {/* Card slots */}
            <div className={styles.cardSlotsContainer}>
              <img
                src={combinationIconLeft}
                alt=""
                className={styles.titleIcon}
                aria-hidden="true"
              />

              <div className={styles.cardSlots}>
                {selectedCards.map((card, index) => (
                  <div
                    key={index}
                    className={styles.cardSlot}
                    onClick={() => openModal(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openModal(index);
                      }
                    }}
                    aria-label={
                      card
                        ? `Слот ${index + 1}: ${card.name}. Нажмите для замены`
                        : `Слот ${index + 1}: пустой. Нажмите для выбора карты`
                    }
                  >
                    {card ? (
                      <>
                        <img
                          src={card.image}
                          alt={card.name}
                          className={`${styles.cardImg} ${card.type === "lenormand" ? styles.lenormand : ""}`}
                        />
                        <span className={styles.cardLabel}>{card.name}</span>
                        <button
                          className={styles.removeBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCard(index);
                          }}
                          aria-label={`Убрать карту ${card.name}`}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M9 1L1 9M1 1L9 9"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <img
                        src={emptyCardSvg}
                        alt=""
                        className={styles.emptyCardImg}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
              <img
                src={combinationIconRight}
                alt=""
                className={styles.titleIcon}
                aria-hidden="true"
              />
            </div>
            {selectedCount === 0 && (
              <p className={styles.hint}>Нажмите на карту, чтобы выбрать сочетание</p>
            )}
            {selectedCount === 1 && <p className={styles.hint}>Выберите ещё одну карту</p>}

            {/* Combination results */}
            <AnimatePresence>
              {selectedCount >= 2 && ((card0 && card1) || (card1 && card2)) && (
                <motion.div
                  className={`${styles.combinations} ${selectedCount === 3 ? styles.combinationsThree : ""}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Pair 0–1 */}
                  {card0 && card1 && (
                    <div className={styles.combinationPair}>
                      <div className={styles.pairCards}>
                        <img
                          src={card0.image}
                          alt={card0.name}
                          className={`${styles.pairCardImg} ${card0.type === "lenormand" ? styles.lenormand : ""}`}
                        />
                        <span className={styles.plus}>+</span>
                        <img
                          src={card1.image}
                          alt={card1.name}
                          className={`${styles.pairCardImg} ${card1.type === "lenormand" ? styles.lenormand : ""}`}
                        />
                      </div>
                      <div className={styles.pairResult}>
                        <strong>
                          {card0.name} + {card1.name}
                        </strong>
                        {card0.type !== card1.type ? (
                          <p>Сочетания карт разных колод не поддерживаются</p>
                        ) : pair01Loading ? (
                          <div className={styles.loadingWrapper}>
                            <span className={styles.loadingDot} />
                            <span className={styles.loadingDot} />
                            <span className={styles.loadingDot} />
                          </div>
                        ) : pair01Text ? (
                          pair01Text.map((t, i) => <p key={i}>{t}</p>)
                        ) : (
                          <p>Не удалось загрузить сочетание</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pair 1–2 */}
                  {card1 && card2 && (
                    <>
                      {/* <div className={styles.orDivider}>ИЛИ</div> */}
                      <div className={styles.combinationPair}>
                        <div className={styles.pairCards}>
                          <img
                            src={card1.image}
                            alt={card1.name}
                            className={`${styles.pairCardImg} ${card1.type === "lenormand" ? styles.lenormand : ""}`}
                          />
                          <span className={styles.plus}>+</span>
                          <img
                            src={card2.image}
                            alt={card2.name}
                            className={`${styles.pairCardImg} ${card2.type === "lenormand" ? styles.lenormand : ""}`}
                          />
                        </div>
                        <div className={styles.pairResult}>
                          <strong>
                            {card1.name} + {card2.name}
                          </strong>
                          {card1.type !== card2.type ? (
                            <p>Сочетания карт разных колод не поддерживаются</p>
                          ) : pair12Loading ? (
                            <div className={styles.loadingWrapper}>
                              <span className={styles.loadingDot} />
                              <span className={styles.loadingDot} />
                              <span className={styles.loadingDot} />
                            </div>
                          ) : pair12Text ? (
                            pair12Text.map((t, i) => <p key={i}>{t}</p>)
                          ) : (
                            <p>Не удалось загрузить сочетание</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* ── Modal ─────────────────────────────────────────────────────────── */}

      <Notify
        status={notify.status}
        open={notify.open}
        setOpen={(open) => setNotify((prev) => ({ ...prev, open }))}
        title={notify.title}
        text={notify.text}
      />

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className={styles.modalHeader}>
                <h2 id="modal-title" className={styles.modalTitle}>
                  Выберите карту
                </h2>
                <button
                  className={styles.modalClose}
                  onClick={closeModal}
                  aria-label="Закрыть окно"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M16 2L2 16M2 2L16 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className={styles.tabs} role="tablist" aria-label="Тип колоды">
                {(["taro", "lenormand"] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    id={`tab-${tab}`}
                    aria-selected={activeTab === tab}
                    aria-controls={`tabpanel-${tab}`}
                    className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "taro" ? "Таро" : "Ленорман"}
                  </button>
                ))}
              </div>

              {/* Body */}
              <div
                className={styles.modalBody}
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                {activeTab === "taro" ? (
                  <div className={styles.taroList}>
                    {TARO_CARDS.map(({ title, cards }) => (
                      <div key={title} className={styles.groupBlock}>
                        <div
                          className={styles.groupHeader}
                          onClick={() => toggleTarotGroup(title)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleTarotGroup(title);
                            }
                          }}
                          aria-expanded={!!openTarotGroups[title]}
                        >
                          <img src={lineIcon} alt="" className={styles.lineDecor} />
                          <span className={styles.categoryTitle}>{title}</span>
                          <img src={lineIcon} alt="" className={styles.lineDecor} />
                        </div>
                        <AnimatePresence initial={false}>
                          {openTarotGroups[title] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <ul className={styles.cardGrid}>
                                {cards.map(({ id, name, image }) => {
                                  const disabled = selectedCards.some(
                                    (c, i) => c?.type === "taro" && c.id === id && i !== activeSlot
                                  );
                                  return (
                                    <li
                                      key={id}
                                      className={`${styles.cardGridItem} ${disabled ? styles.cardGridItemDisabled : ""}`}
                                      onClick={() =>
                                        !disabled && selectCard("taro", id, name, image)
                                      }
                                      role="button"
                                      tabIndex={disabled ? -1 : 0}
                                      onKeyDown={(e) => {
                                        if ((e.key === "Enter" || e.key === " ") && !disabled) {
                                          e.preventDefault();
                                          selectCard("taro", id, name, image);
                                        }
                                      }}
                                      aria-disabled={disabled}
                                    >
                                      <img
                                        src={image}
                                        alt={name}
                                        className={styles.cardGridThumb}
                                      />
                                      <span className={styles.cardGridName}>{name}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className={styles.cardGrid}>
                    {LENORMAND_CARDS.map(({ id, name, image }) => {
                      const disabled = selectedCards.some(
                        (c, i) => c?.type === "lenormand" && c.id === id && i !== activeSlot
                      );
                      return (
                        <li
                          key={id}
                          className={`${styles.cardGridItem} ${disabled ? styles.cardGridItemDisabled : ""} ${styles.cardGridItemLenormand}`}
                          onClick={() => !disabled && selectCard("lenormand", id, name, image)}
                          role="button"
                          tabIndex={disabled ? -1 : 0}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && !disabled) {
                              e.preventDefault();
                              selectCard("lenormand", id, name, image);
                            }
                          }}
                          aria-disabled={disabled}
                        >
                          <img
                            src={image}
                            alt={name}
                            className={`${styles.cardGridThumb} ${styles.cardGridThumbLenormand}`}
                          />
                          <span className={styles.cardGridName}>{name}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CombinationsPage;
