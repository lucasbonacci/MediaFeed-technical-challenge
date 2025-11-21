import { NewsArticle } from '@/types/news';

export type FavoriteArticle = NewsArticle;

export interface FavoritesContextType {
  favorites: FavoriteArticle[];
  addFavorite: (article: FavoriteArticle) => Promise<void>;
  removeFavorite: (articleUrl: string) => Promise<void>;
  isFavorite: (articleUrl: string) => boolean;
  toggleFavorite: (article: FavoriteArticle) => Promise<void>;
}
