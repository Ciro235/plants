import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Leaf } from 'lucide-react';
import { Plant } from '../utils/plantTypes';
import { getTranslation } from '../utils/translations';

interface CarouselProps {
  plants: Plant[];
  carouselIndex: number;
  setCarouselIndex: (index: number) => void;
  setSelectedPlant: (plant: Plant) => void;
  darkMode: boolean;
  language?: 'en' | 'es';
}

const Carousel: React.FC<CarouselProps> = ({
  plants,
  carouselIndex,
  setCarouselIndex,
  setSelectedPlant,
  language = 'es',
  darkMode
}) => {
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';
  const t = getTranslation(language);

  // Usar una referencia para mantener el índice actual
  const currentIndexRef = React.useRef(carouselIndex);
  
  // Actualizar la referencia cuando cambia carouselIndex
  useEffect(() => {
    currentIndexRef.current = carouselIndex;
  }, [carouselIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % plants.length;
      setCarouselIndex(nextIndex);
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [plants.length, setCarouselIndex]);
  
  return (
    <div className={`${cardBg} border-b ${borderColor} py-8`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-bold ${textColor} mb-6 flex items-center gap-2`}>
          <Leaf className="w-6 h-6 text-emerald-600" />
          {t.featured}
        </h2>
        <div className="relative">
          <button 
            onClick={() => setCarouselIndex((carouselIndex - 1 + plants.length) % plants.length)}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full ${cardBg} ${textColor} border-2 ${borderColor} hover:bg-emerald-100 dark:hover:bg-gray-700 shadow-xl`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setCarouselIndex((carouselIndex + 1) % plants.length)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full ${cardBg} ${textColor} border-2 ${borderColor} hover:bg-emerald-100 dark:hover:bg-gray-700 shadow-xl`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {plants.map(plant => (
                <div key={plant.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 overflow-hidden">
                    <img 
                      src={plant.image_url} 
                      alt={plant.scientific_name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="max-w-4xl mx-auto">
                        <h3 className="text-4xl font-bold italic mb-3">{plant.scientific_name}</h3>
                        <p className="text-2xl mb-4">{plant.common_name || '—'}</p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="px-4 py-2 bg-emerald-600 rounded-full">{plant.family || 'Unknown'}</span>
                          <span className="px-4 py-2 bg-emerald-700 rounded-full">{plant.genus || 'Unknown'}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedPlant(plant)}
                          className="bg-white text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
                        >
                          <Info className="w-5 h-5" />
                          {t.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {plants.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === carouselIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-400 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;