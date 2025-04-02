# Mental Health Tracker

## Overview
Mental Health Tracker is a web application designed to help users track their mood using a visually engaging kaleidoscope interface. It features user authentication, multilingual support (English and Russian), and data visualization. The project consists of a React frontend and a Node.js/Express backend, using MySQL for data storage.

## Features
### Frontend (React)
- **Authentication**: User registration and login using JWT.
- **Multilingual Support**: Switch between English and Russian via `LanguageContext`.
- **Mood Logging**: Interactive kaleidoscope on the `/mood-log` page that changes shape and color based on mood value.
- **Profile Page**: Displays user data and mood history in a calendar format on `/profile`.
- **Data Sync**: Mood data is sent to and retrieved from the server.

### Backend (Node.js/Express)
- **REST API**: Endpoints for authentication (`/login`, `/register`), user data (`/user`), and mood entries (`/mood`).
- **Database**: MySQL database (`mental_health_tracker`) with `users` and `mood_entries` tables.
- **Security**: Protected endpoints using JWT.

### Database (MySQL)
- **Users Table**: `id`, `username`, `email`, `password`.
- **Mood Entries Table**: `id`, `user_id`, `type`, `value`, `description`, `factors`, `note`, `date`.

## Project Structure
```
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
├── database_schema.sql  # MySQL database schema
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm

## Installation
### 1. Clone the repository
```bash
git clone https://github.com/crowneck78/mental-health-tracker.git
cd mental-health-tracker
```

### 2. Set up the database
1. Create a MySQL database named `mental_health_tracker`.
2. Import the schema:
   ```bash
   mysql -u your-username -p mental_health_tracker < database_schema.sql
   ```

### 3. Install dependencies
#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ..
npm install
```

### 4. Configure environment variables
Create a `.env` file in the `server/` folder with the following content:
```
PORT=5000
DB_HOST=127.0.0.1
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=mental_health_tracker
JWT_SECRET=your-secret-key
```

## Running the Application
### Start the backend
```bash
cd server
npm start
```
The server will be available at `http://localhost:5000`.

### Start the frontend
```bash
cd ..
npm run dev
```
The frontend will be available at `http://localhost:5173`.

Open your browser and navigate to `http://localhost:5173`.

## Usage
- Register or log in to access mood logging and profile features.
- Use the `/mood-log` page to record your mood with the interactive kaleidoscope.
- View your mood history on the `/profile` page.

## Contributing
Feel free to submit issues or pull requests to improve the project!

## License
This project is licensed under the MIT License.

---

# Mental Health Tracker (Русский)

## Обзор
Mental Health Tracker — это веб-приложение для отслеживания настроения пользователей с визуально привлекательным интерфейсом в виде калейдоскопа. Оно включает авторизацию, поддержку нескольких языков (английский и русский) и визуализацию данных. Проект состоит из фронтенда на React и бэкенда на Node.js/Express с использованием MySQL для хранения данных.

## Особенности
### Фронтенд (React)
- **Авторизация**: Регистрация и вход с использованием JWT.
- **Многоязычность**: Переключение между английским и русским через `LanguageContext`.
- **Логирование настроения**: Интерактивный калейдоскоп на странице `/mood-log`, меняющий форму и цвет в зависимости от настроения.
- **Страница профиля**: Отображение данных пользователя и истории настроения в виде календаря на `/profile`.
- **Синхронизация данных**: Данные о настроении отправляются на сервер и извлекаются с него.

### Бэкенд (Node.js/Express)
- **REST API**: Эндпоинты для авторизации (`/login`, `/register`), данных пользователя (`/user`) и записей настроения (`/mood`).
- **База данных**: MySQL (`mental_health_tracker`) с таблицами `users` и `mood_entries`.
- **Безопасность**: Защищённые эндпоинты с помощью JWT.

### База данных (MySQL)
- **Таблица users**: `id`, `username`, `email`, `password`.
- **Таблица mood_entries**: `id`, `user_id`, `type`, `value`, `description`, `factors`, `note`, `date`.

## Установка
### 1. Клонируйте репозиторий
```bash
git clone https://github.com/crowneck78/mental-health-tracker.git
cd mental-health-tracker
```

### 2. Настройка базы данных
1. Создайте базу данных MySQL с именем `mental_health_tracker`.
2. Импортируйте схему:
   ```bash
   mysql -u your-username -p mental_health_tracker < database_schema.sql
   ```

### 3. Установите зависимости
#### Бэкенд
```bash
cd server
npm install
```

#### Фронтенд
```bash
cd ..
npm install
```

### 4. Настройте переменные окружения
Создайте файл `.env` в папке `server/` со следующим содержимым:
```
PORT=5000
DB_HOST=127.0.0.1
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=mental_health_tracker
JWT_SECRET=your-secret-key
```

## Запуск приложения
### Запуск бэкенда
```bash
cd server
npm start
```
Сервер будет доступен по адресу `http://localhost:5000`.

### Запуск фронтенда
```bash
cd ..
npm run dev
```
Фронтенд будет доступен по адресу `http://localhost:5173`.

## Вклад в проект
Приветствуются любые предложения и pull request’ы для улучшения проекта!

## Лицензия
Проект распространяется под лицензией MIT.
