import React from 'react';
import { X } from 'lucide-react';
import { Plant } from '../utils/plantTypes';
import { getTranslation } from '../utils/translations';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  darkMode: boolean;
  language?: 'en' | 'es';
}

const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  darkMode,
  language = 'es'
}) => {
  const t = getTranslation(language);
  
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  if (!plant) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      <div 
        className={`${cardBg} rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={plant.image_url}
            alt={plant.scientific_name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white dark:bg-red-400 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-red-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <h2 className={`text-2xl font-bold ${textColor} mb-2 italic`}>
            {plant.scientific_name}
          </h2>
          <p className={`text-xl ${textSecondary} mb-4`}>
            {plant.common_name || '—'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-1`}>
                {t.family}
              </p>
              <p className={textSecondary}>{plant.family || '—'}</p>
            </div>
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-1`}>
                {t.genus}
              </p>
              <p className={textSecondary}>{plant.genus || '—'}</p>
            </div>
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-1`}>
                {t.year}
              </p>
              <p className={textSecondary}>{plant.year || '—'}</p>
            </div>
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-1`}>
                {t.author}
              </p>
              <p className={textSecondary}>{plant.author || '—'}</p>
            </div>
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-1`}>
                {t.status}
              </p>
              <p className={textSecondary}>{plant.status}</p>
            </div>
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-1`}>
                {t.rank}
              </p>
              <p className={textSecondary}>{plant.rank}</p>
            </div>
          </div>
          <div>
            <p className={`text-sm font-semibold ${textColor} mb-1`}>
              {t.bibliography}
            </p>
            <p className={textSecondary}>{plant.bibliography || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailModal;