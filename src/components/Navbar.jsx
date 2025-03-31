import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

function Navbar() {
  const { logout } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        background: 'var(--card-bg)',
        borderRadius: '20px',
        marginBottom: '20px',
        boxShadow: 'var(--card-shadow)',
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link
arsenals
          to="/"
          style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
            transition: 'color 0.3s ease',
          }}
        >
          {translations.home?.title || 'Home'}
        </Link>
        <Link
          to="/mood-log"
          style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
            transition: 'color 0.3s ease',
          }}
        >
          {translations.mood.title || 'Mood Log'}
        </Link>
        <Link
          to="/profile"
          style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
            transition: 'color 0.3s ease',
          }}
        >
          {translations.profile.title}
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          background: '#FF3B30',
          padding: '8px 16px',
          borderRadius: '10px',
          fontSize: '1rem',
          transition: 'background 0.3s ease',
        }}
      >
        {translations.profile.logout}
      </button>
    </nav>
  );
}

export default Navbar;