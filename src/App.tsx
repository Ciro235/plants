import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import PlantCard from './components/PlantCard';
import CompareModal from './components/CompareModal';
import FavoritesModal from './components/FavoritesModal';
import PlantDetailModal from './components/PlantDetailModal';
import Footer from './components/Footer';
import { usePlants } from './hooks/usePlants';
import { useAppContext } from './context/AppContext';
import { Leaf } from 'lucide-react';
import { getTranslation } from './utils/translations';

const PlantExplorerContent = () => {
  const { state } = useAppContext();
  const { 
    loading, 
    filteredAndSortedPlants, 
    currentPlants,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    selectedFamily,
    setSelectedFamily,
    sortBy,
    setSortBy,
    families,
    carouselPlants,
    favoritePlants,
    comparePlants,
    selectedPlant,
    setSelectedPlant
  } = usePlants();

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [showFilters, setShowFilters] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-emerald-50';
  const t = getTranslation(language);

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="text-center">
          <Leaf className="w-16 h-16 text-emerald-600 animate-pulse mx-auto mb-4" />
          <p className={`text-xl ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        setShowFavoritesModal={setShowFavoritesModal}
        setShowCompareModal={setShowCompareModal}
        favoritesCount={state.favorites.length}
        compareCount={state.compareList.length}
      />

      {carouselPlants.length > 0 && (
        <Carousel 
          plants={carouselPlants}
          carouselIndex={carouselIndex}
          setCarouselIndex={setCarouselIndex}
          setSelectedPlant={setSelectedPlant}
          darkMode={darkMode}
          language={language}
        />
      )}

      <div className="container mx-auto px-4 py-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
          sortBy={sortBy}
          setSortBy={setSortBy}
          families={families}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          darkMode={darkMode}
          language={language}
        />

        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          {filteredAndSortedPlants.length} {language === 'en' ? 'results' : 'resultados'}
        </p>

        {currentPlants.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.noResults}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPlants.map(plant => (
                <PlantCard 
                  key={plant.id} 
                  plant={plant}
                  darkMode={darkMode}
                  setSelectedPlant={setSelectedPlant}
                  language={language}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode}
              />
            )}
          </>
        )}
      </div>

      <CompareModal
        show={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        comparePlants={comparePlants}
        darkMode={darkMode}
        language={language}
      />

      <FavoritesModal
        show={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        favoritePlants={favoritePlants}
        darkMode={darkMode}
        language={language}
        setSelectedPlant={setSelectedPlant}
      />

      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          darkMode={darkMode}
          language={language}
        />
      )}

      <Footer darkMode={darkMode} language={language} />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <PlantExplorerContent />
    </AppProvider>
  );
};

export default App;