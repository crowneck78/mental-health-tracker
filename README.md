# Mental Health Tracker

## English

### Overview
Mental Health Tracker is a web application designed to help users track their mood with a visually engaging kaleidoscope interface. It features user authentication, multilingual support (English and Russian), and data visualization. The project is built with a React frontend and a Node.js/Express backend, using MySQL for data storage.

### Features
#### Frontend (React)
- **Authentication**: User registration and login using JWT.
- **Multilingual Support**: Switch between English and Russian via `LanguageContext`.
- **Mood Logging**: Interactive kaleidoscope on the `/mood-log` page that changes shape and color based on mood value.
- **Profile Page**: Displays user data and mood history in a calendar format on `/profile`.
- **Data Sync**: Mood data is sent to and retrieved from the server.

#### Backend (Node.js/Express)
- **REST API**: Endpoints for authentication (`/login`, `/register`), user data (`/user`), and mood entries (`/mood`).
- **Database**: MySQL database (`mental_health_tracker`) with `users` and `mood_entries` tables.
- **Security**: Protected endpoints using JWT.

#### Database (MySQL)
- **Users Table**: `id`, `username`, `email`, `password`.
- **Mood Entries Table**: `id`, `user_id`, `type`, `value`, `descriptions`, `factors`, `note`, `date`.

### Project Structure
mental-health-tracker/
├── server/              # Backend (Node.js/Express)
│   ├── server.js        # Main server file with API endpoints
│   └── ...              # Other backend files
├── src/                 # Frontend (React)
│   ├── components/      # React components (MoodLog.jsx, Profile.jsx, etc.)
│   ├── context/         # Contexts (AuthContext.js, LanguageContext.js, ThemeContext.js)
│   ├── styles/          # CSS files (App.css, MoodLog.css, etc.)
│   ├── translations/    # Language files (en.json, ru.json)
│   ├── App.jsx          # Main app component with routing
│   └── main.jsx         # React entry point
├── database_schema.sql  # Empty MySQL schema
├── .gitignore           # Git ignore file
└── README.md            # This file


### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/crowneck78/mental-health-tracker.git
   cd mental-health-tracker
Set up the database:
Create a MySQL database named mental_health_tracker.
Import the schema:

mysql -u your-username -p mental_health_tracker < database_schema.sql
Install backend dependencies:

cd server
npm install
Install frontend dependencies:

cd ..
npm install
Configure environment variables:
Create a .env file in the server/ folder with:

PORT=5000
DB_HOST=127.0.0.1
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=mental_health_tracker
JWT_SECRET=your-secret-key
Running the Application
Start the backend:

cd server
npm start
The server will run on http://localhost:5000.
Start the frontend:

cd ..
npm run dev
The frontend will run on http://localhost:5173.
Open your browser and navigate to http://localhost:5173.
Usage
Register or log in to access the mood logging and profile features.
Use the /mood-log page to record your mood with the interactive kaleidoscope.
View your mood history on the /profile page.
Contributing
Feel free to submit issues or pull requests to improve the project!

License
This project is licensed under the MIT License.

Русский
Обзор
Mental Health Tracker — это веб-приложение для отслеживания настроения пользователей с визуально привлекательным интерфейсом в виде калейдоскопа. Оно включает авторизацию, поддержку нескольких языков (английский и русский) и визуализацию данных. Проект состоит из фронтенда на React и бэкенда на Node.js/Express с использованием MySQL для хранения данных.

Особенности
Фронтенд (React)
Авторизация: Регистрация и вход с использованием JWT.
Многоязычность: Переключение между английским и русским через LanguageContext.
Логирование настроения: Интерактивный калейдоскоп на странице /mood-log, меняющий форму и цвет в зависимости от настроения.
Страница профиля: Отображение данных пользователя и истории настроения в виде календаря на /profile.
Синхронизация данных: Данные о настроении отправляются на сервер и извлекаются с него.
Бэкенд (Node.js/Express)
REST API: Эндпоинты для авторизации (/login, /register), данных пользователя (/user) и записей настроения (/mood).
База данных: MySQL (mental_health_tracker) с таблицами users и mood_entries.
Безопасность: Защищённые эндпоинты с помощью JWT.
База данных (MySQL)
Таблица users: id, username, email, password.
Таблица mood_entries: id, user_id, type, value, descriptions, factors, note, date.
Структура проекта

mental-health-tracker/
├── server/              # Бэкенд (Node.js/Express)
│   ├── server.js        # Основной файл сервера с эндпоинтами API
│   └── ...              # Другие файлы бэкенда
├── src/                 # Фронтенд (React)
│   ├── components/      # Компоненты React (MoodLog.jsx, Profile.jsx и др.)
│   ├── context/         # Контексты (AuthContext.js, LanguageContext.js, ThemeContext.js)
│   ├── styles/          # CSS-файлы (App.css, MoodLog.css и др.)
│   ├── translations/    # Файлы переводов (en.json, ru.json)
│   ├── App.jsx          # Главный компонент с маршрутизацией
│   └── main.jsx         # Точка входа React
├── database_schema.sql  # Пустая схема MySQL
├── .gitignore           # Файл исключений Git
└── README.md            # Этот файл
Требования
Node.js (версия 16 или выше)
MySQL (версия 8.0 или выше)
npm
Установка
Клонируйте репозиторий:



git clone https://github.com/crowneck78/mental-health-tracker.git
cd mental-health-tracker
Настройте базу данных:
Создайте базу данных MySQL с именем mental_health_tracker.
Импортируйте схему:


mysql -u your-username -p mental_health_tracker < mentalhealth.sql
Установите зависимости бэкенда:



cd server
npm install
Установите зависимости фронтенда:



cd ..
npm install
Настройте переменные окружения:
Создайте файл .env в папке server/ со следующим содержимым:
text

Collapse

Wrap

Copy
PORT=5000
DB_HOST=127.0.0.1
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=mental_health_tracker
JWT_SECRET=your-secret-key
Запуск приложения
Запустите бэкенд:
bash

cd server
npm start
Сервер будет доступен по адресу http://localhost:5000.
Запустите фронтенд:

cd ..
npm run dev
Фронтенд будет доступен по адресу http://localhost:5173.
Откройте браузер и перейдите на http://localhost:5173.
Использование

Зарегистрируйтесь или войдите, чтобы получить доступ к функциям логирования настроения и профиля.
Используйте страницу /mood-log для записи настроения с интерактивным калейдоскопом.
Просматривайте историю настроения на странице /profile.

Вклад в проект
Приветствуются любые предложения и pull request’ы для улучшения проекта!

Лицензия
Проект распространяется под лицензией MIT.
