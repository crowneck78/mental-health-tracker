import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

function HomePage() {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h1>{translations.home.title}</h1>
      <p
        style={{
          fontSize: '1.2rem',
          color: 'var(--text)',
          marginBottom: '30px',
          opacity: 0.8,
        }}
      >
        {translations.home.description}
      </p>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button onClick={() => navigate('/login')}>{translations.home.login}</button>
        <button className="secondary" onClick={() => navigate('/register')}>
          {translations.home.register}
        </button>
      </div>
    </div>
  );
}

export default HomePage;