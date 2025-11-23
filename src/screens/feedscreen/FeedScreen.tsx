import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import NewsItem from '@/components/NewsItem';
import { NewsArticle } from '@/types/news';
import useNewsFeed from '@/hooks/useNewsFeed';
import { Loading, ErrorState, SearchInput, LoadMoreError } from './components';
import { EmptyList } from '@/components';
import { colors } from '@/theme';
import { keyExtractor } from '@/utils';

export const FeedScreen: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useNewsFeed(searchValue);

  const flatData = data?.pages.flatMap(page => page.articles) ?? [];

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage && !isError) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isError]);

  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => <NewsItem article={item} />,
    [],
  );

  const renderFooter = useCallback(() => {
    if (isError) return <LoadMoreError message={error?.message} />;
    if (!isFetchingNextPage) return null;
    return <Loading />;
  }, [isFetchingNextPage, isError]);

  const hasNoData = !data || flatData.length === 0;

  return (
    <View style={styles.container}>
      <SearchInput value={searchValue} onChangeText={setSearchValue} />

      {isError && hasNoData ? (
        <ErrorState message={error?.message} onRetry={refetch} />
      ) : isLoading && hasNoData ? (
        <Loading />
      ) : (
        <FlatList
          data={flatData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            isLoading && hasNoData ? (
              <Loading />
            ) : (
              <EmptyList
                text={
                  searchValue.trim() !== ''
                    ? 'No se encontraron resultados para tu búsqueda.'
                    : 'No hay datos disponibles.'
                }
              />
            )
          }
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default FeedScreen;
