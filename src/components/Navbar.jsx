import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Главная</NavLink>
      <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Логин</NavLink>
      <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>Регистрация</NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Профиль</NavLink>
      <NavLink to="/tracker" className={({ isActive }) => (isActive ? 'active' : '')}>Трекер</NavLink>
    </nav>
  );
}

export default Navbar;