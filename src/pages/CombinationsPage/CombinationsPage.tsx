import { FC, useState } from "react";
import styles from "./CombinationsPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Card } from "../../components/Card/Card";
import { Intro } from "../../components/Intro/Intro";
import rightArrow from "../../assets/other elements/right.png";

// Временные данные для сочетаний
const tarotCombinations: Record<string, string> = {
  "0_1": "Дурак + Маг: Начало нового пути с четким планом и уверенностью",
  "1_2": "Маг + Верховная Жрица: Интуитивное действие, магия, тайные знания",
  "0_2": "Дурак + Верховная Жрица: Доверие интуиции в новой ситуации",
  "0_1_2": "Дурак + Маг + Верховная Жрица: Новое начало с верой, действием и интуицией",
};

const lenormandCombinations: Record<string, string> = {
  "0_1": "Всадник + Клевер: Приятные новости, удачное стечение обстоятельств",
  "1_2": "Клевер + Корабль: Удача в путешествии, хорошая поездка",
  "0_2": "Всадник + Корабль: Новости издалека, приезд гостей",
  "0_1_2": "Всадник + Клевер + Корабль: Счастливое путешествие, хорошие новости издалека",
};

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

  // Получаем описание для комбинации Таро
  const getTarotCombinationText = (card1Id: number, card2Id: number) => {
    const key = `${card1Id}_${card2Id}`;
    return tarotCombinations[key] || `Сочетание карт будет добавлено позже`;
  };

  // Получаем описание для комбинации Ленорман
  const getLenormandCombinationText = (card1Id: number, card2Id: number) => {
    const key = `${card1Id}_${card2Id}`;
    return lenormandCombinations[key] || `Сочетание карт будет добавлено позже`;
  };

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
                    link=""
                  />
                  <span className={styles.plus}>+</span>
                  <Card
                    name={selectedTarotCardsData[1]?.name || ""}
                    image={selectedTarotCardsData[1]?.image || ""}
                    link=""
                  />
                </div>
                <div className={styles.combinationText}>
                  <strong>
                    {selectedTarotCardsData[0]?.name} + {selectedTarotCardsData[1]?.name}
                  </strong>
                  <p>
                    {getTarotCombinationText(
                      selectedTarotCardsData[0]?.id || 0,
                      selectedTarotCardsData[1]?.id || 0
                    )}
                  </p>
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
                        link=""
                      />
                      <span className={styles.plus}>+</span>
                      <Card
                        name={selectedTarotCardsData[2]?.name || ""}
                        image={selectedTarotCardsData[2]?.image || ""}
                        link=""
                      />
                    </div>
                    <div className={styles.combinationText}>
                      <strong>
                        {selectedTarotCardsData[1]?.name} + {selectedTarotCardsData[2]?.name}
                      </strong>
                      <p>
                        {getTarotCombinationText(
                          selectedTarotCardsData[1]?.id || 0,
                          selectedTarotCardsData[2]?.id || 0
                        )}
                      </p>
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
                  />
                  <span className={styles.plus}>+</span>
                  <Card
                    name={selectedLenormandCardsData[1]?.name || ""}
                    image={selectedLenormandCardsData[1]?.image || ""}
                    link=""
                    borderColor="#ab760d"
                  />
                </div>
                <div className={styles.combinationText}>
                  <strong>
                    {selectedLenormandCardsData[0]?.name} + {selectedLenormandCardsData[1]?.name}
                  </strong>
                  <p>
                    {getLenormandCombinationText(
                      selectedLenormandCardsData[0]?.id || 0,
                      selectedLenormandCardsData[1]?.id || 0
                    )}
                  </p>
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
                      />
                      <span className={styles.plus}>+</span>
                      <Card
                        name={selectedLenormandCardsData[2]?.name || ""}
                        image={selectedLenormandCardsData[2]?.image || ""}
                        link=""
                        borderColor="#ab760d"
                      />
                    </div>
                    <div className={styles.combinationText}>
                      <strong>
                        {selectedLenormandCardsData[1]?.name} +{" "}
                        {selectedLenormandCardsData[2]?.name}
                      </strong>
                      <p>
                        {getLenormandCombinationText(
                          selectedLenormandCardsData[1]?.id || 0,
                          selectedLenormandCardsData[2]?.id || 0
                        )}
                      </p>
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
    </div>
  );
};

export default CombinationsPage;
