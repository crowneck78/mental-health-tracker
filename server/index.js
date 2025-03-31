import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mental_health_tracker',
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

const SECRET_KEY = 'your-secret-key';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, result) => {
      if (err) {
        console.error('Ошибка запроса:', err);
        return res.status(500).send({ message: 'Ошибка сервера' });
      }
      if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.send({ message: 'Успешный вход', token, user: { id: user.id, username: user.username, email: user.email } });
      } else {
        res.status(401).send({ message: 'Неверные данные' });
      }
    }
  );
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (err, result) => {
      if (err) {
        console.error('Ошибка регистрации:', err);
        return res.status(400).send({ message: 'Ошибка регистрации', error: err.message });
      }
      const user = { id: result.insertId, username, email };
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.send({ message: 'Пользователь зарегистрирован', token, user });
    }
  );
});

app.get('/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Токен отсутствует' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    db.query(
      'SELECT id, username, email FROM users WHERE id = ?',
      [decoded.id],
      (err, result) => {
        if (err) {
          console.error('Ошибка запроса:', err);
          return res.status(500).send({ message: 'Ошибка сервера' });
        }
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.status(404).send({ message: 'Пользователь не найден' });
        }
      }
    );
  } catch (err) {
    res.status(401).send({ message: 'Неверный токен', error: err.message });
  }
});

app.post('/mood', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Токен отсутствует' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { type, value, descriptions, factors, note } = req.body;
    db.query(
      'INSERT INTO mood_entries (user_id, type, value, descriptions, factors, note, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [decoded.id, type, value, JSON.stringify(descriptions), JSON.stringify(factors), note],
      (err, result) => {
        if (err) {
          console.error('Ошибка сохранения записи:', err);
          return res.status(500).send({ message: 'Ошибка сохранения записи', error: err.message });
        }
        res.send({ message: 'Запись добавлена', id: result.insertId });
      }
    );
  } catch (err) {
    res.status(401).send({ message: 'Неверный токен', error: err.message });
  }
});

app.get('/mood', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Токен отсутствует' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { date } = req.query;
    const startOfDay = `${date} 00:00:00`;
    const endOfDay = `${date} 23:59:59`;

    db.query(
      'SELECT * FROM mood_entries WHERE user_id = ? AND date BETWEEN ? AND ?',
      [decoded.id, startOfDay, endOfDay],
      (err, result) => {
        if (err) {
          console.error('Ошибка запроса:', err);
          return res.status(500).send({ message: 'Ошибка сервера', error: err.message });
        }
        res.send(result.map(entry => ({
          id: entry.id,
          type: entry.type,
          value: entry.value,
          descriptions: JSON.parse(entry.descriptions),
          factors: JSON.parse(entry.factors),
          note: entry.note,
          date: entry.date // Изменено с created_at на date
        })));
      }
    );
  } catch (err) {
    res.status(401).send({ message: 'Неверный токен', error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});