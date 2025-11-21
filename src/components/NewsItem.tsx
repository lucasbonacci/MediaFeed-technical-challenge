import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NewsArticle } from '@/types/news';
import { NavigationService } from '@/navigation/NavigationService';
import { Routes } from '@/navigation/paths';
import { useFavorites } from '@/context/FavoritesContext';
import { StarIcon } from '@/assets/svg';

interface NewsItemProps {
  article: NewsArticle;
}

const NewsItem: React.FC<NewsItemProps> = memo(({ article }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(article.url);

  const handlePress = () => {
    NavigationService.navigate(Routes.NewDetailScreen, { article });
  };

  const handleFavoritePress = (e: any) => {
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
              filledColor="#FFD700"
              outlineColor="#999"
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
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    backgroundColor: '#e0e0e0',
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
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
    marginTop: -2,
  },
  description: {
    fontSize: 14,
    color: '#666',
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
    color: '#999',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default NewsItem;

