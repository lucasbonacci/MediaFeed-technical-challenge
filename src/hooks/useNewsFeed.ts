import { NewsApiResponse } from '@/types/news';
import useDebounce from '@/hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNews } from '@/services/newsApi';

const useNewsFeed = (search: string) => {
  const debouncedSearchValue = useDebounce(search, 500);

  return useInfiniteQuery<NewsApiResponse, Error>({
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
};

export default useNewsFeed;
