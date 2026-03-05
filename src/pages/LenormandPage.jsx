function LenormandPage() {
  return (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1>Значения Ленорман</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Список карт</h2>
        <p>Сетка карточек 3x3</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Страница карты</h2>
        <p>Наверху: Номер карты, Название, Картинка</p>
        <p>Далее блоки-аккордеоны:</p>
        <ul>
          <li>Описание</li>
          <li>Ключевые слова</li>
          <li>Основное значение</li>
          <li>Негативное значение</li>
          <li>Отношения</li>
          <li>Работа и финансы</li>
          <li>Здоровье</li>
          <li>Личность</li>
          <li>Сочетания</li>
        </ul>
      </div>
    </div>
  );
}

export default LenormandPage;