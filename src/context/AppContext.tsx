import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '../utils/plantTypes';
import { useLocalStorage } from '../hooks/useLocalStorage';

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    case 'TOGGLE_COMPARE':
      if (state.compareList.includes(action.payload)) {
        return {
          ...state,
          compareList: state.compareList.filter(id => id !== action.payload)
        };
      }
      if (state.compareList.length >= 4) return state;
      return {
        ...state,
        compareList: [...state.compareList, action.payload]
      };
    case 'CLEAR_COMPARE':
      return { ...state, compareList: [] };
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage<number[]>('plantFavorites', []);
  
  const [state, dispatch] = useReducer(appReducer, {
    favorites: storedFavorites,
    compareList: []
  });

  React.useEffect(() => {
    setStoredFavorites(state.favorites);
  }, [state.favorites, setStoredFavorites]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};