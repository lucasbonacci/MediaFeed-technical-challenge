import { NewsApiErrorCode, NewsApiError } from '@/types/news';

const parseNewsApiError = (res: Response, body: any): NewsApiError => {
  const apiCode = typeof body?.code === 'string' ? body.code : undefined;
  const apiMessage =
    typeof body?.message === 'string' && body.message.trim().length > 0
      ? body.message
      : 'Error fetching news';

  const error = new Error(apiMessage) as NewsApiError;
  error.status = res.status;

  if (apiCode) {
    error.code = apiCode as NewsApiErrorCode;
  } else {
    error.code = 'unknownError';
  }

  return error;
};

export default parseNewsApiError;
