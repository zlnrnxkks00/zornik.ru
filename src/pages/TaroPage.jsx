function TaroPage() {
  return (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1>Значения Таро</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Список карт</h2>
        <p>Сетка карточек 3x3 на мобильной версии</p>
        <p>Карточка: Картинка, Номер карты, Название</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Страница карты</h2>
        <p>Наверху: Номер карты, Название, Картинка</p>
        <p>Далее блоки-аккордеоны:</p>
        <ul>
          <li>Общее значение</li>
          <li>Перевернутое значение</li>
          <li>Сочетания (список карт с текстом)</li>
        </ul>
      </div>
    </div>
  );
}

export default TaroPage;