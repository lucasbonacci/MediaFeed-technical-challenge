import { NewsApiResponse } from '@/types/news';
import {
  NEWS_API_KEY,
  DEFAULT_PAGE_SIZE,
  NEWS_API_BASE_URL,
} from '@/constants/api';

export const fetchNews = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<NewsApiResponse> => {
  const url = `${NEWS_API_BASE_URL}/everything?q=the&sortBy=popularity&pageSize=${DEFAULT_PAGE_SIZE}&page=${pageParam}`;

  const res = await fetch(url, {
    headers: {
      'X-Api-Key': NEWS_API_KEY,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);

    throw new Error(errorBody?.message || 'Error fetching news');
  }

  const data: NewsApiResponse = await res.json();

  return data;
};
