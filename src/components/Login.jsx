import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Добавляем Link
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/mood-log');
    } catch (err) {
      console.error('Ошибка входа:', err);
      alert(err.message || translations.login.error || 'Login error');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>{translations.login.title}</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={translations.login.username}
          style={{ marginBottom: '20px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={translations.login.password}
          style={{ marginBottom: '20px' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {translations.login.submit}
        </button>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--accent)',
            cursor: 'pointer',
            marginTop: '15px',
            fontSize: '0.9rem',
          }}
        >
          {translations.login.forgot}
        </p>
        {/* Добавляем ссылку на регистрацию */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '15px',
            fontSize: '0.9rem',
          }}
        >
          {translations.login.noAccount || "Don't have an account? "}{' '}
          <Link
            to="/register"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            {translations.login.register || 'Register'}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;