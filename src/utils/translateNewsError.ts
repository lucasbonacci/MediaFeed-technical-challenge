import type { TFunction } from 'i18next';
import { NewsApiErrorCode } from '@/types/news';
import { NEWS_API_ERROR_CODES } from '@/constants/newsApiErrors';

type NewsErrorLike = Error & {
  code?: string;
  status?: number;
};

const isNewsApiErrorCode = (code: unknown): code is NewsApiErrorCode => {
  return NEWS_API_ERROR_CODES.includes(code as NewsApiErrorCode);
};

const getNewsErrorCode = (error: unknown): NewsApiErrorCode => {
  const e = error as NewsErrorLike | null;
  const code = e?.code;

  if (!code) return 'unknownError';

  return isNewsApiErrorCode(code) ? code : 'unknownError';
};

const getNewsErrorMessage = (error: unknown, t: TFunction): string => {
  const code = getNewsErrorCode(error);
  return t(`errors.newsApi.${code}`);
};

export default getNewsErrorMessage;
