// src/services/newsApi.ts
import { NewsApiResponse, NewsApiError } from '@/types/news';
import {
  parseNewsApiResponse,
  getDeviceLanguage,
  parseNewsApiError,
} from '@/utils';
import {
  NEWS_API_KEY,
  DEFAULT_PAGE_SIZE,
  NEWS_API_BASE_URL,
} from '@/config/api';

export const fetchNews = async ({
  pageParam = 1,
  searchQuery = 'the',
}: {
  pageParam?: number;
  searchQuery?: string;
}): Promise<NewsApiResponse> => {
  const query = searchQuery.trim() || 'the';
  const lang = getDeviceLanguage();

  const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(
    query,
  )}&sortBy=popularity&pageSize=${DEFAULT_PAGE_SIZE}&page=${pageParam}&language=${lang}`;

  let res: Response;

  try {
    res = await fetch(url, {
      headers: {
        'X-Api-Key': NEWS_API_KEY,
      },
    });
  } catch {
    const networkError = new Error(
      'Network error while fetching news',
    ) as NewsApiError;
    networkError.code = 'networkError';
    throw networkError;
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw parseNewsApiError(res, body);
  }

  return parseNewsApiResponse(body);
};
