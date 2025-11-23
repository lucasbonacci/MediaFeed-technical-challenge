import type { NewsArticle, NewsApiResponse } from '@/types/news';

const sanitizeRequiredString = (value: unknown, fallback = ''): string => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed === '' ? fallback : trimmed;
};

const sanitizeNullableString = (value: unknown): string | null => {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
};

const parseNewsApiResponse = (body: unknown): NewsApiResponse => {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid news response');
  }

  const data = body as any;

  if (!Array.isArray(data.articles)) {
    throw new Error('Invalid news response: articles must be an array');
  }

  const status = sanitizeRequiredString(data.status, 'error');

  const totalResults =
    typeof data.totalResults === 'number' && data.totalResults >= 0
      ? data.totalResults
      : 0;

  const articles: NewsArticle[] = data.articles.map(
    (article: any): NewsArticle => ({
      source: {
        id: sanitizeNullableString(article?.source?.id),
        name: sanitizeRequiredString(article?.source?.name, 'Unknown source'),
      },
      author: sanitizeNullableString(article?.author),
      title: sanitizeRequiredString(article?.title, 'Untitled'),
      description: sanitizeNullableString(article?.description),
      url: sanitizeRequiredString(article?.url, ''),
      urlToImage: sanitizeNullableString(article?.urlToImage),
      publishedAt: sanitizeRequiredString(article?.publishedAt, ''),
      content: sanitizeNullableString(article?.content),
      videoUrl:
        article?.videoUrl !== undefined
          ? sanitizeNullableString(article.videoUrl)
          : undefined,
    }),
  );

  const codeSanitized = sanitizeNullableString(data.code);
  const messageSanitized = sanitizeNullableString(data.message);

  return {
    status,
    totalResults,
    articles,
    code: codeSanitized ?? undefined,
    message: messageSanitized ?? undefined,
  };
};

export default parseNewsApiResponse;
