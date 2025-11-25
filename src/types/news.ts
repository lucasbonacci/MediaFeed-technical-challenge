import { NEWS_API_ERROR_CODES } from '@/constants/newsApiErrors';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  videoUrl?: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
  code?: string;
  message?: string;
}

export type NewsApiErrorCode = (typeof NEWS_API_ERROR_CODES)[number];

export interface NewsApiError extends Error {
  code?: NewsApiErrorCode | string;
  status?: number;
}
