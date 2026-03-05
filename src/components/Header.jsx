import { Link, NavLink } from 'react-router-dom';

function Header() {
    return (
        <header style={{ 
      padding: '20px', 
      borderBottom: '1px solid #ccc',
      backgroundColor: '#fff'
    }}>
      <nav style={{ 
        display: 'flex', 
        gap: '30px', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ 
          fontWeight: 'bold', 
          fontSize: '24px',
          textDecoration: 'none',
          color: '#333'
        }}>
          ZORNIK.RU
        </Link>
        
        <NavLink 
          to="/tarot" 
          style={({ isActive }) => ({ 
            textDecoration: 'none', 
            color: isActive ? '#6b4f9f' : '#333',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Значения Таро
        </NavLink>
        
        <NavLink 
          to="/lenormand" 
          style={({ isActive }) => ({ 
            textDecoration: 'none', 
            color: isActive ? '#2e7d5e' : '#333',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Значения Ленорман
        </NavLink>
        
        <NavLink 
          to="/combinations" 
          style={({ isActive }) => ({ 
            textDecoration: 'none', 
            color: isActive ? '#c44536' : '#333',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Сочетания
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;