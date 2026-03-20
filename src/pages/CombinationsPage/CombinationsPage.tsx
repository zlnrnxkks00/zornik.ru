import { FC, useState } from "react";
import styles from "./CombinationsPage.module.scss";
import { TARO_CARDS } from "../../constants/taro-cards";
import { LENORMAND_CARDS } from "../../constants/lenormand-cards";
import { Card } from "../../components/Card/Card";
import { Intro } from "../../components/Intro/Intro";

const YellowCard = ({name, image }: { name: string; image: string }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  }}>
    <div style={{
      position: 'relative',
      width: '161px',
      height: '250px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        position: 'absolute',
        width: '161px',
        height: '250px',
        backgroundColor: '#AB760D',
        borderRadius: '10px',
        boxShadow: '0 4px 6px #00000040',
        top: 0,
        left: 0
      }} />
      <img 
        src={image} 
        alt={name} 
        style={{
          position: 'absolute',
          width: '144px',
          height: '230px',
          opacity: 0.9,
          borderRadius: '10px',
          objectFit: 'cover',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} 
      />
    </div>
    <div style={{
        fontFamily: 'Montserrat',
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '100%',
        textAlign: 'center',
        color: 'var(--cl-text)',
        maxWidth: '161px',
       wordBreak: 'break-word'
     }}>
     {name}
    </div>
  </div>
);

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

const CombinationsPage: FC = () => {
  const [selectedTarotCards, setSelectedTarotCards] = useState<number[]>([]);
  const [selectedLenormandCards, setSelectedLenormandCards] = useState<number[]>([]);

  const handleTarotSelect = (id: number) => {
    if (selectedTarotCards.includes(id)) {
      setSelectedTarotCards(selectedTarotCards.filter(cardId => cardId !== id));
    } else if (selectedTarotCards.length < 3) {
      setSelectedTarotCards([...selectedTarotCards, id]);
    }
  };

  const handleLenormandSelect = (id: number) => {
    if (selectedLenormandCards.includes(id)) {
      setSelectedLenormandCards(selectedLenormandCards.filter(cardId => cardId !== id));
    } else if (selectedLenormandCards.length < 3) {
      setSelectedLenormandCards([...selectedLenormandCards, id]);
    }
  };

  // Получаем все карты Таро одним массивом
  const allTarotCards = TARO_CARDS.flatMap(group => group.cards);
  const selectedTarotCardsData = allTarotCards.filter(card => selectedTarotCards.includes(card.id));

  // Получаем описание для комбинации Таро
  const getTarotCombinationText = () => {
    if (selectedTarotCards.length === 2) {
      const key = `${selectedTarotCards[0]}_${selectedTarotCards[1]}`;
      return tarotCombinations[key] || `Сочетание ${selectedTarotCardsData[0]?.name} и ${selectedTarotCardsData[1]?.name} будет добавлено позже`;
    } else if (selectedTarotCards.length === 3) {
      const key = `${selectedTarotCards[0]}_${selectedTarotCards[1]}_${selectedTarotCards[2]}`;
      return tarotCombinations[key] || `Сочетание ${selectedTarotCardsData.map(c => c.name).join(' + ')} будет добавлено позже`;
    }
    return "";
  };

  // Получаем описание для комбинации Ленорман
  const getLenormandCombinationText = () => {
    if (selectedLenormandCards.length === 2) {
      const key = `${selectedLenormandCards[0]}_${selectedLenormandCards[1]}`;
      const card1 = LENORMAND_CARDS.find(c => c.id === selectedLenormandCards[0]);
      const card2 = LENORMAND_CARDS.find(c => c.id === selectedLenormandCards[1]);
      return lenormandCombinations[key] || `Сочетание ${card1?.name} и ${card2?.name} будет добавлено позже`;
    } else if (selectedLenormandCards.length === 3) {
      const key = `${selectedLenormandCards[0]}_${selectedLenormandCards[1]}_${selectedLenormandCards[2]}`;
      const cards = selectedLenormandCards.map(id => LENORMAND_CARDS.find(c => c.id === id)?.name).join(' + ');
      return lenormandCombinations[key] || `Сочетание ${cards} будет добавлено позже`;
    }
    return "";
  };

  return (
    <div className={styles.page}>
      <Intro>
        <h1 className={styles.title}>СОЧЕТАНИЯ</h1>
      </Intro>
      
      <div className={styles.wrapper}>
        {/* ========== СЕКЦИЯ ТАРО ========== */}
        <h2 className={styles.sectionTitle}>ТАРО</h2>
        
        {TARO_CARDS.map(({ title, cards }) => (
          <div key={title}>
            <h2 className={styles.cardsTitle}>{title}</h2>
            <ul className={styles.cardsContainer}>
              {cards.map(({ id, name, image }) => (
                <div 
                  key={id} 
                  onClick={() => handleTarotSelect(id)}
                  className={`${styles.cardWrapper} ${selectedTarotCards.includes(id) ? styles.selected : ''}`}
                >
                  <Card name={name} image={image} link="" />
                </div>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.selectionBlock}>
          <div className={styles.selectionTitle}>ВЫБОР КАРТ</div>
          
          <div className={styles.selectedCards}>
            {[0, 1, 2].map((index) => (
              <div key={index} className={styles.selectedCardPlaceholder}>
                {selectedTarotCardsData[index] ? (
                  <div style={{ width: '140px', height: '240px' }}>
                  <Card 
                    name={selectedTarotCardsData[index].name} 
                    image={selectedTarotCardsData[index].image} 
                    link="" 
                  />
                  </div>
                ) : (
                  <div className={styles.cardBackTaro}></div>
                )}
              </div>
            ))}
          </div>

          {/* Подсказка если карты не выбраны */}
          {selectedTarotCards.length === 0 && (
            <div className={styles.hintText}>
              Нажмите на интересующие вас карты, чтобы увидеть сочетание
            </div>
          )}

          {selectedTarotCards.length >= 2 && (
            <div className={styles.combinationTitle}>
              {selectedTarotCardsData.map((card, index) => (
                <span key={card.id}>
                  {card.name} ({card.id})
                  {index < selectedTarotCardsData.length - 1 ? ' + ' : ''}
                </span>
              ))}
            </div>
          )}

          {/* Описание комбинации */}
          {selectedTarotCards.length >= 2 && (
            <div className={styles.combinationDescription}>
              <p>{getTarotCombinationText()}</p>
            </div>
          )}

          {/* Подсказка если выбрана 1 карта */}
          {selectedTarotCards.length === 1 && (
            <div className={styles.hintText}>
              Выберите вторую или третью карту
            </div>
          )}
        </div>

        {/* ========== СЕКЦИЯ ЛЕНОРМАН ========== */}
        <h2 className={styles.sectionTitle}>ЛЕНОРМАН</h2>
        
        <p className={styles.orderNote}>Порядок карт влияет на значение</p>
        
        <div>
          <ul className={styles.cardsContainer}>
            {LENORMAND_CARDS.map(({ id, name, image }) => (
              <div 
                key={id} 
                onClick={() => handleLenormandSelect(id)}
                className={`${styles.cardWrapper} ${selectedLenormandCards.includes(id) ? styles.selected : ''}`}
              >
                <YellowCard name={name} image={image}  />
              </div>
            ))}
          </ul>
        </div>

        {/* Блок выбора карт Ленорман */}
        <div className={styles.selectionBlock}>
          <div className={styles.selectionTitle}>ВЫБОР КАРТ</div>
          
          {/* Три желтые карты (всегда) */}
          <div className={styles.selectedCards}>
            {[0, 1, 2].map((index) => {
              const card = LENORMAND_CARDS.find(c => c.id === selectedLenormandCards[index]);
              return (
                <div key={index} className={styles.selectedCardPlaceholder}>
                  {card ? (
                    <YellowCard name={card.name} image={card.image} />
                  ) : (
                    <div className={styles.cardBackLenormand}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Подсказка если карты не выбраны */}
          {selectedLenormandCards.length === 0 && (
            <div className={styles.hintText}>
              Нажмите на интересующие вас карты, чтобы увидеть сочетание
            </div>
          )}

          {/* Названия выбранных карт с номерами */}
          {selectedLenormandCards.length >= 2 && (
            <div className={styles.combinationTitle}>
              {selectedLenormandCards.map((id, index) => {
                const card = LENORMAND_CARDS.find(c => c.id === id);
                return card ? (
                  <span key={id}>
                    {card.name} ({card.id})
                    {index < selectedLenormandCards.length - 1 ? ' + ' : ''}
                  </span>
                ) : null;
              })}
            </div>
          )}

          {/* Описание комбинации */}
          {selectedLenormandCards.length >= 2 && (
            <div className={styles.combinationDescription}>
              <p>{getLenormandCombinationText()}</p>
            </div>
          )}

          {/* Подсказка если выбрана 1 карта */}
          {selectedLenormandCards.length === 1 && (
            <div className={styles.hintText}>
              Выберите вторую или третью карту
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinationsPage;
