import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NewsItem from '../NewsItem';
import { NewsArticle } from '@/types/news';
import { NavigationService } from '@/navigation/NavigationService';
import { Routes } from '@/navigation/paths';
import { FavoritesProvider, useFavorites } from '@/context/FavoritesContext';

// Mock NavigationService
jest.mock('@/navigation/NavigationService', () => ({
  NavigationService: {
    navigate: jest.fn(),
  },
}));

// Mock StarIcon
jest.mock('@/assets/svg', () => ({
  StarIcon: ({ isFilled }: any) => {
    const ReactModule = require('react');
    return ReactModule.createElement('View', {
      testID: 'star-icon',
      'data-filled': isFilled,
    });
  },
}));

const mockNavigate = NavigationService
  .navigate as jest.MockedFunction<typeof NavigationService.navigate>;

const createMockArticle = (overrides?: Partial<NewsArticle>): NewsArticle => ({
  source: { id: '1', name: 'Test Source' },
  author: 'Test Author',
  title: 'Test Article Title',
  description: 'Test article description',
  url: 'https://example.com/article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2024-01-15T10:00:00Z',
  content: 'Test content',
  ...overrides,
});

const renderWithProvider = (article: NewsArticle) => {
  return render(
    <FavoritesProvider>
      <NewsItem article={article} />
    </FavoritesProvider>,
  );
};

describe('NewsItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders title, description and source', () => {
      const article = createMockArticle();
      const { getByText } = renderWithProvider(article);

      expect(getByText('Test Article Title')).toBeTruthy();
      expect(getByText('Test article description')).toBeTruthy();
      expect(getByText('Test Source')).toBeTruthy();
    });

    it('renders "No description available" when description is null', () => {
      const article = createMockArticle({ description: null });
      const { getByText } = renderWithProvider(article);

      expect(getByText('No description available')).toBeTruthy();
    });

    it('renders "No description available" when description is empty', () => {
      const article = createMockArticle({ description: '' });
      const { getByText } = renderWithProvider(article);

      expect(getByText('No description available')).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('navigates to NewsDetailScreen when the item is pressed', () => {
      const article = createMockArticle();
      const { getByText } = renderWithProvider(article);

      fireEvent.press(getByText('Test Article Title'));

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(Routes.NewDetailScreen, {
        article,
      });
    });
  });

  describe('Favorites', () => {
    it('shows an empty favorite icon when the article is not a favorite', () => {
      const article = createMockArticle();
      const { getByTestId } = renderWithProvider(article);

      const starIcon = getByTestId('star-icon');
      expect(starIcon.props['data-filled']).toBe(false);
    });

    it('shows a filled favorite icon when the article is in favorites', async () => {
      const article = createMockArticle();

      const TestComponent = () => {
        const { addFavorite, isFavorite } = useFavorites();
        const favorite = isFavorite(article.url);

        React.useEffect(() => {
          if (!favorite) {
            addFavorite(article);
          }
        }, [favorite, addFavorite]);

        return <NewsItem article={article} />;
      };

      const { getByTestId } = render(
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>,
      );

      await waitFor(() => {
        const starIcon = getByTestId('star-icon');
        expect(starIcon.props['data-filled']).toBe(true);
      });
    });
  });
});
