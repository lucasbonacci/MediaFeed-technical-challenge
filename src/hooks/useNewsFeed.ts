import { useMemo, useCallback } from 'react';
import { NewsApiResponse } from '@/types/news';
import useDebounce from '@/hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNews } from '@/services/newsApi';

const useNewsFeed = (search: string) => {
  const debouncedSearchValue = useDebounce(search, 500);

  const query = useInfiniteQuery<NewsApiResponse, Error>({
    queryKey: ['news', debouncedSearchValue],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchNews({
        pageParam: (pageParam as number) ?? 1,
        searchQuery: debouncedSearchValue,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedArticles = allPages.reduce(
        (acc, page) => acc + page.articles.length,
        0,
      );
      return loadedArticles >= lastPage.totalResults
        ? undefined
        : allPages.length + 1;
    },
  });

  const flatData = useMemo(
    () => query.data?.pages.flatMap(p => p.articles) ?? [],
    [query.data],
  );

  const hasNoData = !query.data || flatData.length === 0;

  const handleLoadMore = useCallback(() => {
    if (!query.isFetchingNextPage && query.hasNextPage && !query.isError) {
      query.fetchNextPage();
    }
  }, [
    query
  ]);

  return {
    ...query,
    flatData,
    hasNoData,
    handleLoadMore,
    errorMessage: query.error?.message ?? 'Ocurrió un error inesperado.',
  };
};

export default useNewsFeed