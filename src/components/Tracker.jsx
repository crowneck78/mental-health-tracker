import { useState } from 'react';
import axios from 'axios';

function Tracker() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/mood', { mood, note, user_id: 1 });
      alert('Запись добавлена');
      setMood('');
      setNote('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Новое настроение</h2>
      <form onSubmit={handleSubmit}>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">Выберите настроение</option>
          <option value="Счастлив">Счастлив</option>
          <option value="Грустно">Грустно</option>
          <option value="Тревожно">Тревожно</option>
          <option value="Спокойно">Спокойно</option>
        </select>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Добавьте заметку..."
        />
        <button type="submit" disabled={!mood}>Сохранить</button>
      </form>
    </div>
  );
}

export default Tracker;