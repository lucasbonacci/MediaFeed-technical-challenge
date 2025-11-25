import { NewsApiResponse } from '@/types/news';
import { parseNewsApiResponse, getDeviceLanguage } from '@/utils';
import {
  NEWS_API_KEY,
  DEFAULT_PAGE_SIZE,
  NEWS_API_BASE_URL,
} from '@/constants/api';

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

  const res = await fetch(url, {
    headers: {
      'X-Api-Key': NEWS_API_KEY,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (body as any)?.message || 'Error fetching news';
    throw new Error(message);
  }

  return parseNewsApiResponse(body);
};
