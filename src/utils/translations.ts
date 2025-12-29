// utils/translations.ts
export const translations = {
  en: {
    title: 'Plant Explorer',
    search: 'Search plants...',
    filter: 'Filter',
    allFamilies: 'All Families',
    nameAsc: 'Name A-Z',
    nameDesc: 'Name Z-A',
    familyAsc: 'Family A-Z',
    genusAsc: "Genus A-Z",
    genusDesc: "Genus Z-A",
    yearAsc: 'Year (Old to New)',
    yearDesc: 'Year (New to Old)',
    family: 'Family',
    genus: 'Genus',
    year: 'Year',
    author: 'Author',
    noResults: 'No plants found',
    loading: 'Loading plants...',
    viewDetails: 'View Details',
    close: 'Close',
    bibliography: 'Bibliography',
    status: 'Status',
    rank: 'Rank',
    featured: 'Featured Plants',
    favorites: 'Favorites',
    compare: 'Compare',
    addToCompare: 'Add to Compare',
    removeFromCompare: 'Remove from Compare',
    comparePlants: 'Compare Plants',
    clearComparison: 'Clear',
    selectToCompare: 'Select 2-4 plants to compare',
    comparing: 'Comparing',
    noFavorites: 'No favorites yet',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    clearCache: 'Clear Cache',
    plantDataProvided: 'Plant data provided by Trefle API',
    commonName: 'Common Name',
    scientificName: 'Scientific Name'
  },
  es: {
    title: 'Explorador de Plantas',
    search: 'Buscar plantas...',
    filter: 'Filtrar',
    allFamilies: 'Todas las Familias',
    nameAsc: 'Nombre A-Z',
    nameDesc: 'Nombre Z-A',
    familyAsc: 'Familia A-Z',
    genusAsc: "Género A-Z",
    genusDesc: "Género Z-A",
    yearAsc: 'Año (Antiguo a Nuevo)',
    yearDesc: 'Año (Nuevo a Antiguo)',
    family: 'Familia',
    genus: 'Género',
    year: 'Año',
    author: 'Autor',
    noResults: 'No se encontraron plantas',
    loading: 'Cargando plantas...',
    viewDetails: 'Ver Detalles',
    close: 'Cerrar',
    bibliography: 'Bibliografía',
    status: 'Estado',
    rank: 'Rango',
    featured: 'Plantas Destacadas',
    favorites: 'Favoritos',
    compare: 'Comparar',
    addToCompare: 'Agregar a Comparar',
    removeFromCompare: 'Quitar de Comparar',
    comparePlants: 'Comparar Plantas',
    clearComparison: 'Limpiar',
    selectToCompare: 'Selecciona 2-4 plantas para comparar',
    comparing: 'Comparando',
    noFavorites: 'No hay favoritos aún',
    addToFavorites: 'Agregar a Favoritos',
    removeFromFavorites: 'Quitar de Favoritos',
    clearCache: 'Limpiar Cache',
    plantDataProvided: 'Datos de plantas proporcionados por Trefle API',
    commonName: 'Nombre Común',
    scientificName: 'Nombre Científico'
  }
} as const;

// Función más robusta con fallback
export const getTranslation = (language: 'en' | 'es' = 'es') => {
  const selectedTranslations = translations[language];
  
  // Si no existen las traducciones para el idioma, usar español
  if (!selectedTranslations) {
    console.warn(`No translations found for language: ${language}, defaulting to Spanish`);
    return translations.es;
  }
  
  return selectedTranslations;
};

// También exporta el tipo para TypeScript
export type TranslationKey = keyof typeof translations.en;