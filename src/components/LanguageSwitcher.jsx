import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function LanguageSwitcher() {
  const { toggleLanguage, language } = useContext(LanguageContext);

  return (
    <button className="switcher" onClick={toggleLanguage}>
      {language === 'en' ? 'RU' : 'EN'}
    </button>
  );
}

export default LanguageSwitcher;