import { useFavorites } from '@/context/FavoritesContext';
import { NavigationService } from '@/navigation/NavigationService';
import { Routes } from '@/navigation/paths';
import { NewsArticle } from '@/types/news';

export const useArticleFavorite = (article: NewsArticle) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(article.url);

  const handleOpenArticle = () => {
    NavigationService.navigate(Routes.NewDetailScreen, { article });
  };

  const handleFavoritePress = () => {
    toggleFavorite(article);
  };

  return {
    favorite,
    handleOpenArticle,
    handleFavoritePress,
  };
};
