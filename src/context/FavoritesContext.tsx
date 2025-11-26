import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';

import type { FavoriteArticle, FavoritesContextType } from '@/types/favorites';
import {
  getStoredFavorites,
  setStoredFavorites,
} from '@/services/favoritesStorage';

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteArticle[]>([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const storedFavorites = await getStoredFavorites();
      if (isMounted) {
        setFavorites(storedFavorites);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const isFavorite = useCallback(
    (articleUrl: string): boolean => {
      return favorites.some(fav => fav.url === articleUrl);
    },
    [favorites],
  );

  const saveFavorites = useCallback(async (newFavorites: FavoriteArticle[]) => {
    await setStoredFavorites(newFavorites);
    setFavorites(newFavorites);
  }, []);

  const addFavorite = useCallback(
    async (article: FavoriteArticle) => {
      if (!isFavorite(article.url)) {
        const newFavorites = [...favorites, article];
        await saveFavorites(newFavorites);
      }
    },
    [favorites, isFavorite, saveFavorites],
  );

  const removeFavorite = useCallback(
    async (articleUrl: string) => {
      const newFavorites = favorites.filter(fav => fav.url !== articleUrl);
      await saveFavorites(newFavorites);
    },
    [favorites, saveFavorites],
  );

  const toggleFavorite = useCallback(
    async (article: FavoriteArticle) => {
      if (isFavorite(article.url)) {
        await removeFavorite(article.url);
      } else {
        await addFavorite(article);
      }
    },
    [isFavorite, addFavorite, removeFavorite],
  );

  const value = useMemo<FavoritesContextType>(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
