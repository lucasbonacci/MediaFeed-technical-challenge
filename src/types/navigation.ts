import { NewsArticle } from '@/types/news';
import { Routes } from '@/navigation/paths';

export type RootStackParamList = {
  [Routes.FeedScreen]: undefined;
  [Routes.FavoritesScreen]: undefined;
  [Routes.Main]: undefined;
  [Routes.NewDetailScreen]: { article: NewsArticle };
};
