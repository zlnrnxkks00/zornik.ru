function CombinationsPage() {
  return (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1>Сочетания карт</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Таро</h2>
        <p>Три поля выбора карт</p>
        <p>После выбора:</p>
        <ul>
          <li>(1 + 2) Текст сочетания</li>
          <li>(2 + 3) Текст сочетания</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Ленорман</h2>
        <p><em>Порядок карт влияет на значение</em></p>
        <p>Три поля выбора карт</p>
        <p>После выбора:</p>
        <ul>
          <li>(1 + 2) Текст сочетания</li>
          <li>(2 + 3) Текст сочетания</li>
        </ul>
      </div>
    </div>
  );
}

export default CombinationsPage;