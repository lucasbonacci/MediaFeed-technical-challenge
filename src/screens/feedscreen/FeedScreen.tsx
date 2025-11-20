import React, { useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import NewsItem from '@/components/NewsItem';
import { fetchNews } from '@/services/newsApi';
import { NewsApiResponse, NewsArticle } from '@/types/news';
import { Loading, ErrorState } from './components';

export const FeedScreen: React.FC = () => {
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
  } = useInfiniteQuery<NewsApiResponse, Error>({
    queryKey: ['news'],
    queryFn: fetchNews,
    getNextPageParam: (lastPage, allPages) => {
      const loadedArticles = allPages.reduce(
        (acc, page) => acc + page.articles.length,
        0,
      );

      if (loadedArticles >= lastPage.totalResults) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });

  const flatData = data?.pages.flatMap(page => page.articles) ?? [];

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => <NewsItem article={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: NewsArticle, index: number) => `${item.url}-${index}`,
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return <Loading />;
  }, [isFetchingNextPage]);

  if (isLoading && !data) {
    return <Loading />;
  }

  if (isError && !data) {
    return <ErrorState message={error?.message} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={flatData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
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
  },
});

export default FeedScreen;
