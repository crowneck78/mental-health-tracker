import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

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
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Логин!
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send({ message: 'Успешный вход', user: result[0] });
      } else {
        res.status(401).send({ message: 'Неверные данные' });
      }
    }
  );
});

// Регистрация
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (err) => {
      if (err) {
        res.status(400).send({ message: 'Ошибка регистрации' });
      } else {
        res.send({ message: 'Пользователь зарегистрирован' });
      }
    }
  );
});

// Добавление настроения
app.post('/mood', (req, res) => {
  const { mood, note, user_id } = req.body;
  db.query(
    'INSERT INTO mood_entries (user_id, mood, note) VALUES (?, ?, ?)',
    [user_id, mood, note],
    (err) => {
      if (err) throw err;
      res.send({ message: 'Запись добавлена' });
    }
  );
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});