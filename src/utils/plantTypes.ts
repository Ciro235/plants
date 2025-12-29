export interface Plant {
    id: number;
    scientific_name: string;
    common_name: string | null;
    family: string | null;
    genus: string | null;
    year: number | null;
    author: string | null;
    bibliography: string | null;
    status: string;
    rank: string;
    image_url?: string;
  }
  
  export interface AppState {
    favorites: number[];
    compareList: number[];
  }
  
  export type AppAction =
    | { type: 'TOGGLE_FAVORITE'; payload: number }
    | { type: 'TOGGLE_COMPARE'; payload: number }
    | { type: 'CLEAR_COMPARE' }
    | { type: 'LOAD_FAVORITES'; payload: number[] };