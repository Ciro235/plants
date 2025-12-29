// hooks/usePlants.ts
import { useState, useEffect, useMemo } from 'react';
import { Plant } from '../utils/plantTypes';
import { getAllPlants } from '../services/plantService';
import { useAppContext } from '../context/AppContext';

// Definir el tipo para sortBy
type SortOption = 'nameAsc' | 'nameDesc' | 'familyAsc' | 'yearAsc' | 'yearDesc' | 'genusAsc' | 'genusDesc';

export const usePlants = () => {
  const { state } = useAppContext();
  
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para paginación local
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('nameAsc');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  
  const PLANTS_PER_PAGE = 12;

  // Función para cargar plantas
  const loadPlants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allPlants = await getAllPlants();
      console.log(`Loaded ${allPlants.length} plants with images`);
      setPlants(allPlants);
    } catch (error) {
      console.error('Error loading plants:', error);
      setError(error instanceof Error ? error.message : 'Failed to load plants');
      
      
    } finally {
      setLoading(false);
    }
  };

  // Cargar plantas al iniciar
  useEffect(() => {
    loadPlants();
  }, []);

  
  const carouselPlants = useMemo(() => {
    return plants
      .filter(plant => plant.image_url) // Asegurar que tengan imagen
      .slice(0, 10);
  }, [plants]);

  // Filtrar y ordenar plantas
  const filteredAndSortedPlants = useMemo(() => {
    let filtered = plants.filter(plant => {
      const matchesSearch = searchTerm === '' || 
        plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plant.common_name && plant.common_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (plant.family && plant.family.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFamily = selectedFamily === 'all' || plant.family === selectedFamily;
      
      return matchesSearch && matchesFamily;
    });

    // Ordenar según la opción seleccionada
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'nameAsc':
          return a.scientific_name.localeCompare(b.scientific_name);
        case 'nameDesc':
          return b.scientific_name.localeCompare(a.scientific_name);
        case 'familyAsc':
          return (a.family || '').localeCompare(b.family || '');
        case 'yearAsc':
          return (a.year || 0) - (b.year || 0);
        case 'yearDesc':
          return (b.year || 0) - (a.year || 0);
        case 'genusAsc':
          return (a.genus || '').localeCompare(b.genus || '');
        case 'genusDesc':
          return (b.genus || '').localeCompare(a.genus || '');
        default:
          return a.scientific_name.localeCompare(b.scientific_name);
      }
    });
  }, [plants, searchTerm, selectedFamily, sortBy]);

  // Obtener familias únicas (solo de plantas con imágenes)
  const families = useMemo(() => {
    const uniqueFamilies = Array.from(
      new Set(plants.map(p => p.family).filter(f => f && f !== 'Unknown'))
    ).sort();
    console.log(`Found ${uniqueFamilies.length} unique families`);
    return uniqueFamilies;
  }, [plants]);

  // Plantas para la página actual
  const currentPlants = useMemo(() => {
    const startIndex = currentPage * PLANTS_PER_PAGE;
    const endIndex = startIndex + PLANTS_PER_PAGE;
    return filteredAndSortedPlants.slice(startIndex, endIndex);
  }, [filteredAndSortedPlants, currentPage]);

  // Total de páginas
  const totalPages = useMemo(() => {
    const pages = Math.ceil(filteredAndSortedPlants.length / PLANTS_PER_PAGE);
    console.log(`Total pages: ${pages} (${filteredAndSortedPlants.length} plants)`);
    return pages;
  }, [filteredAndSortedPlants]);

  // Plantas favoritas y para comparar del contexto
  const favoritePlants = useMemo(() => {
    return plants.filter(p => state.favorites.includes(p.id));
  }, [plants, state.favorites]);

  const comparePlants = useMemo(() => {
    return plants.filter(p => state.compareList.includes(p.id));
  }, [plants, state.compareList]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, selectedFamily, sortBy]);

  return {
    plants,
    loading,
    error,
    currentPlants,
    filteredAndSortedPlants,
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
    setSelectedPlant,
    refreshPlants: loadPlants
  };
};