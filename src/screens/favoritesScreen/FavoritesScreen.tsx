import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/context/FavoritesContext';
import { NewsItem, EmptyList } from '@/components';
import { NewsArticle } from '@/types/news';
import { colors } from '@/theme';
import { keyExtractor } from '@/utils';

const FavoritesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => <NewsItem article={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyList
            text={t('favorites.empty')}
          />
        }
        contentContainerStyle={
          favorites.length === 0 ? styles.emptyContainer : undefined
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default FavoritesScreen;
