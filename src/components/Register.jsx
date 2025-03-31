import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/mood-log'); // Заменили /tracker на /mood-log
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      alert(err.message || translations.register.error || 'Registration error');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>{translations.register.title}</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={translations.register.username}
          style={{ marginBottom: '20px' }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={translations.register.email}
          style={{ marginBottom: '20px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={translations.register.password}
          style={{ marginBottom: '20px' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {translations.register.submit}
        </button>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--accent)',
            cursor: 'pointer',
            marginTop: '15px',
            fontSize: '0.9rem',
          }}
          onClick={() => navigate('/login')}
        >
          {translations.register.already}
        </p>
      </form>
    </div>
  );
}

export default Register;