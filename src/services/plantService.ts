// services/plantService.ts
import { Plant } from '../utils/plantTypes';

const CACHE_DURATION = 7; // días

// Cache global
let ALL_PLANTS_CACHE: Plant[] | null = null;

// Función principal para obtener plantas
export const fetchPlantsFromAPI = async (): Promise<Plant[]> => {
  if (ALL_PLANTS_CACHE?.length) return ALL_PLANTS_CACHE;

  const cached = getCachedPlants();
  if (cached?.plants.length) {
    ALL_PLANTS_CACHE = cached.plants;
    return cached.plants;
  }

  // Intentar API (con token + proxy)
  try {
    const token = import.meta.env.VITE_TREFLE_API_TOKEN?.trim();
    if (!token) throw new Error('Token missing');

    const allPlants: Plant[] = [];
    for (let page = 1; page <= 10; page++) {
      const apiUrl = `https://trefle.io/api/v1/plants?token=${encodeURIComponent(token)}&page=${page}`;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
      
      const res = await fetch(proxyUrl);
      if (!res.ok) continue;
      
      const data = await res.json();
      if (!data.data?.length) continue;

      const plants = data.data
        .filter((p: any) => p.image_url)
        .map((p: any) => ({
          id: p.id,
          scientific_name: p.scientific_name || '—',
          common_name: p.common_name ?? '—',
          family: p.family ?? 'Unknown',
          genus: p.genus ?? 'Unknown',
          year: p.year ?? 0,
          author: p.author ?? 'Unknown',
          bibliography: p.bibliography ?? '—',
          status: p.status ?? 'unknown',
          rank: p.rank ?? 'species',
          image_url: p.image_url,
          slug: p.slug || '',
          synonyms: p.synonyms || [],
        }));
      allPlants.push(...plants);
      await new Promise(r => setTimeout(r, 300));
    }

    if (allPlants.length > 0) {
      ALL_PLANTS_CACHE = allPlants;
      savePlantsToCache(allPlants);
      return allPlants;
    }
  } catch (e) {
    console.warn('API failed, falling back to static JSON', e);
  }

  // Fallback: cargar plants.json
  try {
  console.log('Attempting to load from /plants.json...'); 
  const res = await fetch('/plants/plants.json');
  
  if (!res.ok) {
    console.error(`Failed to load /plants.json: ${res.status} ${res.statusText}`);
    throw new Error(`HTTP ${res.status} loading /plants.json`);
  }
  
  const plants: Plant[] = await res.json();
  console.log(`Loaded ${plants.length} plants from plants.json`); 
  
  if (!Array.isArray(plants)) {
    console.error('plants.json content:', plants); 
    throw new Error('plants.json is not an array');
  }

  ALL_PLANTS_CACHE = plants;
  savePlantsToCache(plants);
  return plants;
} catch (e) {
  console.error('Static fallback failed:', e);
  throw new Error('No plant data available (API + fallback failed)');
}
};

// Función auxiliar para obtener todas las plantas (con caché)
export const getAllPlants = async (forceRefresh = false): Promise<Plant[]> => {
  if (forceRefresh) {
    ALL_PLANTS_CACHE = null;
    clearPlantCache();
  }
  
  return fetchPlantsFromAPI();
};

// Obtener plantas del caché
export const getCachedPlants = (): { plants: Plant[]; timestamp: number } | null => {
  try {
    const cachedPlants = localStorage.getItem('plantData');
    const cachedTimestamp = localStorage.getItem('plantDataTimestamp');
    
    if (cachedPlants && cachedTimestamp) {
      const cacheExpiryTime = Date.now() - (CACHE_DURATION * 24 * 60 * 60 * 1000);
      const timestamp = parseInt(cachedTimestamp, 10);
      
      if (timestamp > cacheExpiryTime) {
        const plants = JSON.parse(cachedPlants);
        console.log(`Using cached plants (${plants.length})`);
        return { plants, timestamp };
      } else {
        console.log('Cache expired');
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  
  return null;
};

// Guardar plantas en caché
export const savePlantsToCache = (plants: Plant[]): void => {
  try {
    localStorage.setItem('plantData', JSON.stringify(plants));
    localStorage.setItem('plantDataTimestamp', Date.now().toString());
    console.log(`Saved ${plants.length} plants to cache`);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Limpiar caché
export const clearPlantCache = (): void => {
  try {
    localStorage.removeItem('plantData');
    localStorage.removeItem('plantDataTimestamp');
    ALL_PLANTS_CACHE = null;
    console.log('Cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};


