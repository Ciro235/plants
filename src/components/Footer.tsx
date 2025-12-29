import React from 'react';
import { Leaf } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { clearPlantCache } from '../services/plantService';

interface FooterProps {
  darkMode: boolean;
  language?: 'en' | 'es';
}

const Footer: React.FC<FooterProps> = ({ darkMode, language = 'es' }) => {
  const t = getTranslation(language);
  
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';

  const handleClearCache = () => {
    clearPlantCache();
    window.location.reload();
  };

  return (
    <footer className={`${cardBg} border-t ${borderColor} py-6 mt-8`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <p className={`${textSecondary} text-sm`}>
              {t.plantDataProvided}
            </p>
          </div>
          <div className="flex items-center gap-4">
            
            <button
              onClick={handleClearCache}
              className={`text-sm px-3 py-1 rounded ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-emerald-100 hover:bg-emerald-200'
              } ${textColor} transition-colors`}
            >
              {t.clearCache}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;