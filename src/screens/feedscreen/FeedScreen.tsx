import React, { useCallback, useMemo, useState } from 'react';
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
    isLoading,
    isError,
    isFetchingNextPage,
    refetch,
    isRefetching,
    flatData,
    hasNoData,
    handleLoadMore,
    errorMessage
  } = useNewsFeed(searchValue);

  const isSearching = useMemo(
    () => searchValue.trim().length > 0,
    [searchValue],
  );

  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => <NewsItem article={item} />,
    [],
  );

  const renderFooter = useCallback(() => {
    if (isError) return <LoadMoreError message={errorMessage} />;
    if (!isFetchingNextPage) return null;
    return <Loading />;
  }, [isFetchingNextPage, isError, errorMessage]);

  const emptyListText = isSearching
    ? 'No se encontraron resultados para tu búsqueda.'
    : 'No hay datos disponibles.';

  const showList = !isError || !hasNoData;

  return (
    <View style={styles.container}>
      <SearchInput value={searchValue} onChangeText={setSearchValue} />

      {!showList && isError ? (
        <ErrorState message={errorMessage} onRetry={refetch} />
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
              <EmptyList text={emptyListText} />
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
