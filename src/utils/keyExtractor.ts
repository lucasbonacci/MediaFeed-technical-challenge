import { NewsArticle } from '@/types/news';

const keyExtractor = (item: NewsArticle, index: number) => {
  return `${item.url}-${index}`;
};

export default keyExtractor;
