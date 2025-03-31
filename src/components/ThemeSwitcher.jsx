import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="switcher" onClick={toggleTheme}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

export default ThemeSwitcher;