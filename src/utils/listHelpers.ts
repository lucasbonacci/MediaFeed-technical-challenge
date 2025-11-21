import { NewsArticle } from '@/types/news';

export const keyExtractor = (item: NewsArticle, index: number) => {
  return `${item.url}-${index}`;
};

export const formatDate = {
  short: (dateString: string, locale = 'es-ES') =>
    new Date(dateString).toLocaleDateString(locale),

  full: (dateString: string, locale = 'es-ES') =>
    new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
};

export function normalizeUrl(rawUrl?: string): string | null {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    return url.toString();
  } catch {
    // Si falta protocolo, probamos con https://
    try {
      const fixed = new URL(`https://${rawUrl}`);
      return fixed.toString();
    } catch {
      return null;
    }
  }
}
