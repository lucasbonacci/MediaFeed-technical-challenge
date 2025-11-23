import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import type { NewsArticle } from '@/types/news';

type FavoritesContextValue = {
  favorites: NewsArticle[];
  addFavorite: (article: NewsArticle) => void;
  removeFavorite: (url: string) => void;
  isFavorite: (url: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<NewsArticle[]>([]);

  const addFavorite = (article: NewsArticle) => {
    setFavorites(prev =>
      prev.some(a => a.url === article.url) ? prev : [...prev, article],
    );
  };

  const removeFavorite = (url: string) => {
    setFavorites(prev => prev.filter(a => a.url !== url));
  };

  const isFavorite = (url: string) =>
    favorites.some(article => article.url === url);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
