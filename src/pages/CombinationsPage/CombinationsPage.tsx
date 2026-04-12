import { FC, useState, useEffect, useCallback } from "react";
import styles from "./CombinationsPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Card } from "../../components/Card/Card";
import { Intro } from "../../components/Intro/Intro";
import rightArrow from "../../assets/other_elements/right.png";
import { fetchCombination } from "../../api/api";
import { Notify, TStatusNotify } from "../../components/Notify/Notify";

interface DragData {
  type: "tarot" | "lenormand";
  id: number;
  name: string;
  image: string;
}

const CombinationsPage: FC = () => {
  const [selectedTarotCards, setSelectedTarotCards] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);
  const [selectedLenormandCards, setSelectedLenormandCards] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);

  // Состояние для открытых групп Таро
  const [openTarotGroups, setOpenTarotGroups] = useState<Record<string, boolean>>({
    "Старшие арканы": true,
  });

  // Состояние для открытых групп Ленорман
  const [openLenormandGroups, setOpenLenormandGroups] = useState<Record<string, boolean>>({
    "Колода Ленорман": true,
  });

  // Результаты API для сочетаний
  const [tarotCombResult, setTarotCombResult] = useState<{
    pair1: string[] | null;
    pair2: string[] | null;
  }>({ pair1: null, pair2: null });
  const [lenormandCombResult, setLenormandCombResult] = useState<{
    pair1: string[] | null;
    pair2: string[] | null;
  }>({ pair1: null, pair2: null });
  const [tarotLoading, setTarotLoading] = useState(false);
  const [lenormandLoading, setLenormandLoading] = useState(false);

  // Уведомления
  const [notify, setNotify] = useState<{
    open: boolean;
    status: TStatusNotify;
    title: string;
    text: string;
  }>({ open: false, status: "error", title: "", text: "" });

  const showNotify = (status: TStatusNotify, title: string, text: string) => {
    setNotify({ open: true, status, title, text });
  };

  // Удаление карты Таро по индексу
  const removeTarotCard = (index: number) => {
    setSelectedTarotCards((prev) => {
      const newCards = [...prev];
      newCards[index] = null;
      return newCards;
    });
  };

  // Удаление карты Ленорман по индексу
  const removeLenormandCard = (index: number) => {
    setSelectedLenormandCards((prev) => {
      const newCards = [...prev];
      newCards[index] = null;
      return newCards;
    });
  };

  // Добавление карты Таро
  const addTarotCard = (id: number) => {
    setSelectedTarotCards((prev) => {
      const newCards = [...prev];
      const emptyIndex = newCards.findIndex((card) => card === null);
      if (emptyIndex !== -1 && !newCards.includes(id)) {
        newCards[emptyIndex] = id;
      }
      return newCards;
    });
  };

  // Добавление карты Ленорман
  const addLenormandCard = (id: number) => {
    setSelectedLenormandCards((prev) => {
      const newCards = [...prev];
      const emptyIndex = newCards.findIndex((card) => card === null);
      if (emptyIndex !== -1 && !newCards.includes(id)) {
        newCards[emptyIndex] = id;
      }
      return newCards;
    });
  };

  const handleTarotSelect = (id: number) => {
    addTarotCard(id);
  };

  const handleLenormandSelect = (id: number) => {
    addLenormandCard(id);
  };

  // Drag start handler
  const onDragStart =
    (type: "tarot" | "lenormand", id: number, name: string, image: string) =>
    (e: React.DragEvent) => {
      const dragData: DragData = { type, id, name, image };
      e.dataTransfer.setData("text/plain", JSON.stringify(dragData));
      e.dataTransfer.effectAllowed = "copy";

      const dragImg = new Image();
      dragImg.src = image;
      dragImg.style.width = "100px";
      dragImg.style.height = "150px";
      e.dataTransfer.setDragImage(dragImg, 50, 75);
    };

  // Drop handler для Таро
  const onTarotDrop = (position: number) => (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain")) as DragData;
      if (data.type === "tarot") {
        setSelectedTarotCards((prev) => {
          const newCards = [...prev];
          if (newCards[position] === null && !newCards.includes(data.id)) {
            newCards[position] = data.id;
          }
          return newCards;
        });
      }
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  // Drop handler для Ленорман
  const onLenormandDrop = (position: number) => (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain")) as DragData;
      if (data.type === "lenormand") {
        setSelectedLenormandCards((prev) => {
          const newCards = [...prev];
          if (newCards[position] === null && !newCards.includes(data.id)) {
            newCards[position] = data.id;
          }
          return newCards;
        });
      }
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // Функции для переключения групп
  const toggleTarotGroup = (title: string) => {
    setOpenTarotGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleLenormandGroup = () => {
    setOpenLenormandGroups((prev) => ({
      ...prev,
      "Колода Ленорман": !prev["Колода Ленорман"],
    }));
  };

  // Получаем все карты Таро одним массивом
  const allTarotCards = TARO_CARDS.flatMap((group) => group.cards);
  const selectedTarotCardsData = selectedTarotCards
    .map((id) => (id !== null ? allTarotCards.find((card) => card.id === id) : null))
    .filter((card) => card !== null);

  // Получаем все карты Ленорман
  const selectedLenormandCardsData = selectedLenormandCards
    .map((id) => (id !== null ? LENORMAND_CARDS.find((card) => card.id === id) : null))
    .filter((card) => card !== null);

  // Загрузка сочетаний Таро
  const loadTarotCombinations = useCallback(async () => {
    const ids = selectedTarotCards.filter((id): id is number => id !== null);
    if (ids.length < 2) {
      setTarotCombResult({ pair1: null, pair2: null });
      return;
    }
    setTarotLoading(true);
    try {
      const pair1 = await fetchCombination("taro", [ids[0], ids[1]]);
      let pair2: string[] | null = null;
      if (ids.length === 3) {
        pair2 = await fetchCombination("taro", [ids[1], ids[2]]);
      }
      setTarotCombResult({ pair1, pair2 });
    } catch (error) {
      console.error("[CombinationsPage] Ошибка загрузки сочетаний Таро:", error);
      setTarotCombResult({ pair1: null, pair2: null });
      if (error instanceof DOMException && error.name === "TimeoutError") {
        showNotify("warning", "Таро", "Сервер не отвечает, попробуйте позже");
      } else {
        showNotify("error", "Таро", "Не удалось загрузить сочетание карт");
      }
    } finally {
      setTarotLoading(false);
    }
  }, [selectedTarotCards]);

  useEffect(() => {
    loadTarotCombinations();
  }, [loadTarotCombinations]);

  // Загрузка сочетаний Ленорман
  const loadLenormandCombinations = useCallback(async () => {
    const ids = selectedLenormandCards.filter((id): id is number => id !== null);
    if (ids.length < 2) {
      setLenormandCombResult({ pair1: null, pair2: null });
      return;
    }
    setLenormandLoading(true);
    try {
      const pair1 = await fetchCombination("lenormand", [ids[0], ids[1]]);
      let pair2: string[] | null = null;
      if (ids.length === 3) {
        pair2 = await fetchCombination("lenormand", [ids[1], ids[2]]);
      }
      setLenormandCombResult({ pair1, pair2 });
    } catch (error) {
      console.error("[CombinationsPage] Ошибка загрузки сочетаний Ленорман:", error);
      setLenormandCombResult({ pair1: null, pair2: null });
      if (error instanceof DOMException && error.name === "TimeoutError") {
        showNotify("warning", "Ленорман", "Сервер не отвечает, попробуйте позже");
      } else {
        showNotify("error", "Ленорман", "Не удалось загрузить сочетание карт");
      }
    } finally {
      setLenormandLoading(false);
    }
  }, [selectedLenormandCards]);

  useEffect(() => {
    loadLenormandCombinations();
  }, [loadLenormandCombinations]);

  // Получаем количество выбранных карт
  const selectedTarotCount = selectedTarotCards.filter((id) => id !== null).length;
  const selectedLenormandCount = selectedLenormandCards.filter((id) => id !== null).length;

  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>СОЧЕТАНИЯ</h1>
      </Intro>

      <div className={styles.wrapper}>
        {/* ========== БЛОК СОЧЕТАНИЙ ТАРО ========== */}
        <div className={styles.selectionBlock}>
          <div className={styles.selectionTitle}>СОЧЕТАНИЯ ТАРО</div>

          {/* Три фиксированных слота для карт */}
          <div className={styles.selectedCards}>
            {[0, 1, 2].map((index) => {
              const cardId = selectedTarotCards[index];
              const card = cardId !== null ? allTarotCards.find((c) => c.id === cardId) : null;
              return (
                <div
                  key={index}
                  className={styles.selectedCardPlaceholder}
                  onDrop={onTarotDrop(index)}
                  onDragOver={onDragOver}
                >
                  {card ? (
                    <Card
                      name={card.name}
                      image={card.image}
                      hover={false}
                      link=""
                      onRemove={() => removeTarotCard(index)}
                      showRemoveButton={true}
                    />
                  ) : (
                    <div className={styles.cardBackTaro}></div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedTarotCount === 0 && (
            <div className={styles.hintText}>
              Нажмите или перетащите карты, чтобы увидеть сочетание
            </div>
          )}

          {selectedTarotCount >= 2 && (
            <div className={styles.combinationWrapper}>
              <div className={styles.combinationPair}>
                <div className={styles.combinationPairCards}>
                  <Card
                    name={selectedTarotCardsData[0]?.name || ""}
                    image={selectedTarotCardsData[0]?.image || ""}
                    hover={false}
                    link=""
                  />
                  <span className={styles.plus}>+</span>
                  <Card
                    name={selectedTarotCardsData[1]?.name || ""}
                    hover={false}
                    image={selectedTarotCardsData[1]?.image || ""}
                    link=""
                  />
                </div>
                <div className={styles.combinationText}>
                  <strong>
                    {selectedTarotCardsData[0]?.name} + {selectedTarotCardsData[1]?.name}
                  </strong>
                  {tarotLoading ? (
                    <p>Загрузка...</p>
                  ) : tarotCombResult.pair1 ? (
                    tarotCombResult.pair1.map((text, i) => <p key={i}>{text}</p>)
                  ) : (
                    <p>Не удалось загрузить сочетание</p>
                  )}
                </div>
              </div>

              {selectedTarotCount === 3 && (
                <>
                  <div className={styles.orDivider}>ИЛИ</div>

                  <div className={styles.combinationPair}>
                    <div className={styles.combinationPairCards}>
                      <Card
                        name={selectedTarotCardsData[1]?.name || ""}
                        image={selectedTarotCardsData[1]?.image || ""}
                        hover={false}
                        link=""
                      />
                      <span className={styles.plus}>+</span>
                      <Card
                        name={selectedTarotCardsData[2]?.name || ""}
                        hover={false}
                        image={selectedTarotCardsData[2]?.image || ""}
                        link=""
                      />
                    </div>
                    <div className={styles.combinationText}>
                      <strong>
                        {selectedTarotCardsData[1]?.name} + {selectedTarotCardsData[2]?.name}
                      </strong>
                      {tarotLoading ? (
                        <p>Загрузка...</p>
                      ) : tarotCombResult.pair2 ? (
                        tarotCombResult.pair2.map((text, i) => <p key={i}>{text}</p>)
                      ) : (
                        <p>Не удалось загрузить сочетание</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {selectedTarotCount === 1 && (
            <div className={styles.hintText}>Выберите вторую карту (нажмите или перетащите)</div>
          )}
        </div>

        {/* ========== КОЛОДА ТАРО С АККОРДЕОНОМ ========== */}
        <h2 className={styles.sectionTitle}>ТАРО</h2>

        {TARO_CARDS.map(({ title, cards }) => (
          <div key={title} className={styles.groupContainer}>
            <div className={styles.groupHeader} onClick={() => toggleTarotGroup(title)}>
              <span>{title}</span>
              <img
                src={rightArrow}
                alt=""
                className={`${styles.groupArrow} ${openTarotGroups[title] ? styles.groupArrowRotated : ""}`}
              />
            </div>
            {openTarotGroups[title] && (
              <ul className={styles.cardsContainer}>
                {cards.map(({ id, name, image }) => (
                  <div
                    key={id}
                    onClick={() => handleTarotSelect(id)}
                    draggable
                    onDragStart={onDragStart("tarot", id, name, image)}
                    className={`${styles.cardWrapper} ${selectedTarotCards.includes(id) ? styles.selected : ""}`}
                  >
                    <Card name={name} image={image} link="" />
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* ========== БЛОК СОЧЕТАНИЙ ЛЕНОРМАН ========== */}
        <div className={styles.selectionBlock}>
          <div className={styles.selectionTitle}>СОЧЕТАНИЯ ЛЕНОРМАН</div>

          {/* Три фиксированных слота для карт */}
          <div className={styles.selectedCards}>
            {[0, 1, 2].map((index) => {
              const cardId = selectedLenormandCards[index];
              const card = cardId !== null ? LENORMAND_CARDS.find((c) => c.id === cardId) : null;
              return (
                <div
                  key={index}
                  className={styles.selectedCardPlaceholder}
                  onDrop={onLenormandDrop(index)}
                  onDragOver={onDragOver}
                >
                  {card ? (
                    <Card
                      name={card.name}
                      image={card.image}
                      hover={false}
                      link=""
                      borderColor="#ab760d"
                      onRemove={() => removeLenormandCard(index)}
                      showRemoveButton={true}
                    />
                  ) : (
                    <div className={styles.cardBackLenormand}></div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedLenormandCount === 0 && (
            <div className={styles.hintText}>
              Нажмите или перетащите карты, чтобы увидеть сочетание
            </div>
          )}

          {selectedLenormandCount >= 2 && (
            <div className={styles.combinationWrapper}>
              <div className={styles.combinationPair}>
                <div className={styles.combinationPairCards}>
                  <Card
                    name={selectedLenormandCardsData[0]?.name || ""}
                    image={selectedLenormandCardsData[0]?.image || ""}
                    link=""
                    borderColor="#ab760d"
                    hover={false}
                  />
                  <span className={styles.plus}>+</span>
                  <Card
                    name={selectedLenormandCardsData[1]?.name || ""}
                    image={selectedLenormandCardsData[1]?.image || ""}
                    link=""
                    borderColor="#ab760d"
                    hover={false}
                  />
                </div>
                <div className={styles.combinationText}>
                  <strong>
                    {selectedLenormandCardsData[0]?.name} + {selectedLenormandCardsData[1]?.name}
                  </strong>
                  {lenormandLoading ? (
                    <p>Загрузка...</p>
                  ) : lenormandCombResult.pair1 ? (
                    lenormandCombResult.pair1.map((text, i) => <p key={i}>{text}</p>)
                  ) : (
                    <p>Не удалось загрузить сочетание</p>
                  )}
                </div>
              </div>

              {selectedLenormandCount === 3 && (
                <>
                  <div className={styles.orDivider}>ИЛИ</div>

                  <div className={styles.combinationPair}>
                    <div className={styles.combinationPairCards}>
                      <Card
                        name={selectedLenormandCardsData[1]?.name || ""}
                        image={selectedLenormandCardsData[1]?.image || ""}
                        link=""
                        borderColor="#ab760d"
                        hover={false}
                      />
                      <span className={styles.plus}>+</span>
                      <Card
                        name={selectedLenormandCardsData[2]?.name || ""}
                        image={selectedLenormandCardsData[2]?.image || ""}
                        link=""
                        borderColor="#ab760d"
                        hover={false}
                      />
                    </div>
                    <div className={styles.combinationText}>
                      <strong>
                        {selectedLenormandCardsData[1]?.name} +{" "}
                        {selectedLenormandCardsData[2]?.name}
                      </strong>
                      {lenormandLoading ? (
                        <p>Загрузка...</p>
                      ) : lenormandCombResult.pair2 ? (
                        lenormandCombResult.pair2.map((text, i) => <p key={i}>{text}</p>)
                      ) : (
                        <p>Не удалось загрузить сочетание</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {selectedLenormandCount === 1 && (
            <div className={styles.hintText}>Выберите вторую карту (нажмите или перетащите)</div>
          )}
        </div>

        {/* ========== КОЛОДА ЛЕНОРМАН С АККОРДЕОНОМ ========== */}
        <h2 className={styles.sectionTitle}>ЛЕНОРМАН</h2>

        <div className={styles.groupContainer}>
          <div className={styles.groupHeader} onClick={toggleLenormandGroup}>
            <span>Выбор карт</span>
            <img
              src={rightArrow}
              alt=""
              className={`${styles.groupArrow} ${openLenormandGroups["Колода Ленорман"] ? styles.groupArrowRotated : ""}`}
            />
          </div>
          {openLenormandGroups["Колода Ленорман"] && (
            <>
              <p className={styles.orderNote}>Порядок карт влияет на значение</p>
              <ul className={styles.cardsContainer}>
                {LENORMAND_CARDS.map(({ id, name, image }) => (
                  <div
                    key={id}
                    onClick={() => handleLenormandSelect(id)}
                    draggable
                    onDragStart={onDragStart("lenormand", id, name, image)}
                    className={`${styles.cardWrapper} ${selectedLenormandCards.includes(id) ? styles.selected : ""}`}
                  >
                    <Card name={name} image={image} link="" borderColor="#ab760d" />
                  </div>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <Notify
        status={notify.status}
        open={notify.open}
        setOpen={(open) => setNotify((prev) => ({ ...prev, open }))}
        title={notify.title}
        text={notify.text}
      />
    </div>
  );
};

export default CombinationsPage;
