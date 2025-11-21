import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import { NewsArticle } from '@/types/news';
import { NavigationService } from '@/navigation/NavigationService';
import { Routes } from '@/navigation/paths';
import { useFavorites } from '@/context/FavoritesContext';
import { StarIcon } from '@/assets/svg';
import { colors } from '@/theme/colors';

interface NewsItemProps {
  article: NewsArticle;
}

const NewsItem: React.FC<NewsItemProps> = memo(({ article }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(article.url);

  const handlePress = () => {
    NavigationService.navigate(Routes.NewDetailScreen, { article });
  };

  const handleFavoritePress = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    e.stopPropagation();
    toggleFavorite(article);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={handlePress}>
      {article.urlToImage ? (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]} />
      )}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <StarIcon
              width={20}
              height={20}
              isFilled={favorite}
              filledColor={colors.favorite}
              outlineColor={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {article.description || 'No description available'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.article.url === nextProps.article.url &&
    prevProps.article.title === nextProps.article.title
  );
});

NewsItem.displayName = 'NewsItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  placeholderImage: {
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
    marginTop: -2,
  },
  description: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 8,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: colors.textTertiary,
  },
});

export default NewsItem;

