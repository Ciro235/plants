// components/PlantCard.tsx
import React, { useState } from 'react';
import { Heart, GitCompare, Eye, Image as ImageIcon } from 'lucide-react';
import { Plant } from '../utils/plantTypes';
import { useAppContext } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

interface PlantCardProps {
  plant: Plant;
  darkMode: boolean;
  setSelectedPlant: (plant: Plant) => void;
  language?: 'en' | 'es';
}

const PlantCard: React.FC<PlantCardProps> = ({ 
  plant, 
  darkMode, 
  setSelectedPlant,
  language = 'es',
}) => {
  const { state, dispatch } = useAppContext();
  const [imageError, setImageError] = useState(false);
  const t = getTranslation(language);
  
  const isFavorite = state.favorites.includes(plant.id);
  const isInCompare = state.compareList.includes(plant.id);
  
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-600';
  
  const handleImageError = () => {
    setImageError(true);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ 
      type: 'TOGGLE_FAVORITE', 
      payload: plant.id 
    });
  };

  const toggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ 
      type: 'TOGGLE_COMPARE', 
      payload: plant.id 
    });
  };

  const imageUrl = imageError 
    ? `https://via.placeholder.com/600x400/4ade80/ffffff?text=${encodeURIComponent(plant.scientific_name.substring(0, 20))}`
    : plant.image_url;

  return (
    <div 
      className={`rounded-xl shadow-lg ${cardBg} border-2 ${borderColor} overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
      onClick={() => setSelectedPlant(plant)}
    >
      <div className="relative h-48 overflow-hidden">
        {!plant.image_url && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 dark:bg-gray-700">
            <ImageIcon className="w-12 h-12 text-emerald-300 dark:text-gray-500" />
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={plant.scientific_name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full backdrop-blur-sm ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-800 hover:bg-white'}`}
            title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={toggleCompare}
            className={`p-2 rounded-full backdrop-blur-sm ${isInCompare ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-800 hover:bg-white'}`}
            title={isInCompare ? t.removeFromCompare : t.addToCompare}
          >
            <GitCompare className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-xs text-white bg-emerald-600 px-2 py-1 rounded">
            {plant.family}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className={`text-xl font-bold ${textColor} mb-2 line-clamp-1 italic`}>
          {plant.scientific_name}
        </h3>
        <p className={`${secondaryText} mb-3 line-clamp-1`}>
          {plant.common_name || t.noResults}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm ${secondaryText}`}>
            <strong>{t.genus}:</strong> {plant.genus || '—'}
          </span>
          <span className={`text-sm ${secondaryText}`}>
            {plant.year || '—'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setSelectedPlant(plant)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-emerald-100 hover:bg-emerald-200'} transition-colors`}
          >
            <Eye className="w-4 h-4" />
            {t.viewDetails}
          </button>
          <span className={`text-xs ${secondaryText}`}>
            {plant.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;