import React from 'react';
import { Leaf, Heart, GitCompare, Globe, Moon, Sun } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
  setShowFavoritesModal: (show: boolean) => void;
  setShowCompareModal: (show: boolean) => void;
  favoritesCount: number;
  compareCount: number;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  setShowFavoritesModal,
  setShowCompareModal,
  favoritesCount,
  compareCount
}) => {
  const t = getTranslation(language);
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-white';

  return (
    <header className={`${cardBg} shadow-lg border-b-4 border-emerald-600`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h1 className={`text-3xl font-bold ${textColor}`}>{t.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFavoritesModal(true)}
              className={`relative p-2 rounded-lg ${inputBg} ${textColor} hover:bg-emerald-100 dark:hover:bg-gray-600 transition-colors`}
              title={t.favorites}
            >
              <Heart className="w-5 h-5" fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowCompareModal(true)}
              className={`relative p-2 rounded-lg ${inputBg} ${textColor} hover:bg-emerald-100 dark:hover:bg-gray-600 transition-colors`}
              title={t.compare}
            >
              <GitCompare className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              )}
            </button>
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} className={`p-2 rounded-lg ${inputBg} ${textColor} hover:bg-emerald-100 dark:hover:bg-gray-600 transition-colors`}>
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${inputBg} ${textColor} hover:bg-emerald-100 dark:hover:bg-gray-600 transition-colors`}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;