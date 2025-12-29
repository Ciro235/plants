// components/FavoritesModal.tsx
import React from 'react';
import { X, Heart } from 'lucide-react';
import { Plant } from '../utils/plantTypes';
import PlantCard from './PlantCard';
import { getTranslation } from '../utils/translations';

interface FavoritesModalProps {
  show: boolean;
  onClose: () => void;
  favoritePlants: Plant[];
  darkMode: boolean;
  language?: 'en' | 'es';
  setSelectedPlant: (plant: Plant) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({
  show,
  onClose,
  favoritePlants = [],
  darkMode,
  language = 'es',
  setSelectedPlant
}) => {
  const t = getTranslation(language);
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      <div 
        className={`${cardBg} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-inherit p-6 border-b flex items-center justify-between">
          <h2 className={`text-2xl font-bold ${textColor} flex items-center gap-2`}>
            <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
            {t.favorites} ({favoritePlants.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {favoritePlants.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className={`text-xl ${textSecondary}`}>{t.noFavorites}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoritePlants.map(plant => (
                <PlantCard 
                  key={plant.id} 
                  plant={plant} 
                  darkMode={darkMode}
                  setSelectedPlant={setSelectedPlant}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;