import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

function Profile() {
  const { user, logout, token } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoodEntries = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/mood?date=${date}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке записей');
      }

      const data = await response.json();
      setMoodEntries(data);
    } catch (error) {
      console.error('Ошибка:', error);
      setMoodEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && selectedDate) {
      fetchMoodEntries(selectedDate);
    }
  }, [selectedDate, token]);

  if (!user) return <div style={{ textAlign: 'center', color: 'var(--text)' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>{translations.profile.title}</h1>
      <div className="card">
        <h2>{translations.profile.profile}</h2>
        <input
          type="text"
          value={user.username}
          readOnly
          placeholder={translations.profile.username}
          style={{ marginBottom: '20px', cursor: 'not-allowed', opacity: 0.7 }}
        />
        <input
          type="email"
          value={user.email}
          readOnly
          placeholder={translations.profile.email}
          style={{ marginBottom: '20px', cursor: 'not-allowed', opacity: 0.7 }}
        />
      </div>

      <div className="card">
        <h2>{translations.profile.notifications}</h2>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--text)',
          }}
        >
          <input type="checkbox" style={{ width: 'auto' }} />
          {translations.profile.remind}
        </label>
      </div>

      <div className="card">
        <h2>{translations.profile.history || 'History'}</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }}
        />
        {loading ? (
          <p>{translations.profile.loading || 'Loading...'}</p>
        ) : moodEntries.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {moodEntries.map((entry) => (
              <li
                key={entry.id}
                style={{
                  border: '1px solid var(--input-border)',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '10px',
                  background: 'var(--secondary-bg)',
                }}
              >
                <p><strong>{translations.mood.title || 'Mood'}:</strong> {entry.type}</p>
                <p><strong>{translations.mood.value || 'Value'}:</strong> {entry.value}</p>
                <p><strong>{translations.mood.describe || 'Descriptions'}:</strong> {entry.descriptions.join(', ')}</p>
                <p><strong>{translations.mood.factors || 'Factors'}:</strong> {entry.factors.join(', ')}</p>
                {entry.note && <p><strong>{translations.mood.note || 'Note'}:</strong> {entry.note}</p>}
                <p><strong>{translations.profile.date || 'Date'}:</strong> {new Date(entry.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{translations.profile.noEntries || 'No entries for this date'}</p>
        )}
      </div>

      <button
        style={{
          width: '100%',
          background: '#FF3B30',
          marginTop: '20px',
          padding: '12px',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={logout}
      >
        {translations.profile.logout}
      </button>
    </div>
  );
}

export default Profile;