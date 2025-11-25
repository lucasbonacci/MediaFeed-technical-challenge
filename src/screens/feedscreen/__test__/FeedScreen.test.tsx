import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeedScreen from '../FeedScreen';
import useNewsFeed from '@/hooks/useNewsFeed';
import { FavoritesProvider } from '@/context/FavoritesContext';

jest.mock('@/hooks/useNewsFeed');
jest.mock('@/context/FavoritesContext');

const mockUseNewsFeed = useNewsFeed as jest.MockedFunction<typeof useNewsFeed>;

const renderWithProviders = (ui: React.ReactElement) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </QueryClientProvider>,
  );
};

describe('FeedScreen - branch coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Loading when isLoading && hasNoData', () => {
    mockUseNewsFeed.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      refetch: jest.fn(),
      isRefetching: false,
      flatData: [],
      hasNoData: true,
    } as any);

    const { UNSAFE_queryByType } = renderWithProviders(<FeedScreen />);

    // If loading branch is active, FlatList should NOT be rendered
    expect(UNSAFE_queryByType(FlatList)).toBeNull();
  });

  it('renders ErrorState when isError && hasNoData', () => {
    mockUseNewsFeed.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Error message'),
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      refetch: jest.fn(),
      isRefetching: false,
      flatData: [],
      hasNoData: true,
      errorMessage: 'Error message',
    } as any);

    const { getByText } = renderWithProviders(<FeedScreen />);
    expect(getByText('Error message')).toBeTruthy();
  });

  it('renders FlatList with data when there are articles', () => {
    mockUseNewsFeed.mockReturnValue({
      data: {
        pages: [
          {
            articles: [
              {
                source: { id: '1', name: 'Source' },
                author: 'Author',
                title: 'Article 1',
                description: 'desc',
                url: 'https://example.com',
                urlToImage: null,
                publishedAt: '2024-01-01T00:00:00Z',
                content: 'content',
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      refetch: jest.fn(),
      isRefetching: false,
      flatData: [
        {
          source: { id: '1', name: 'Source' },
          author: 'Author',
          title: 'Article 1',
          description: 'desc',
          url: 'https://example.com',
          urlToImage: null,
          publishedAt: '2024-01-01T00:00:00Z',
          content: 'content',
        },
      ],
      hasNoData: false,
    } as any);

    const { getByText, UNSAFE_getByType } = renderWithProviders(<FeedScreen />);

    // FlatList branch
    expect(UNSAFE_getByType(FlatList)).toBeTruthy();
    // Render of one NewsItem inside the list
    expect(getByText('Article 1')).toBeTruthy();
  });

  it('renders correct EmptyList text when searchValue is empty vs not empty', async () => {
    // Start with no articles and no loading/error
    mockUseNewsFeed.mockReturnValue({
      data: { pages: [{ articles: [] }] },
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      refetch: jest.fn(),
      isRefetching: false,
      flatData: [],
      hasNoData: false,
    } as any);

    const { getByText, getByTestId } = renderWithProviders(<FeedScreen />);

    // Initial branch: searchValue === '' → default empty text
    expect(getByText('feed.noData')).toBeTruthy();

    // Now simulate typing in SearchInput
    const input = getByTestId('search-input');
    // onChangeText triggers setSearchValue inside FeedScreen
    fireEvent.changeText(input, 'bitcoin');

    // After updating searchValue, EmptyList should show the "no results" message
    await waitFor(() => {
      expect(getByText('feed.noResults')).toBeTruthy();
    });
  });

  it('renders footer loading indicator when isFetchingNextPage is true', () => {
    mockUseNewsFeed.mockReturnValue({
      data: { pages: [{ articles: [] }] },
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: true,
      refetch: jest.fn(),
      isRefetching: false,
      flatData: [],
      hasNoData: true,
    } as any);

    const { UNSAFE_getAllByType } = renderWithProviders(<FeedScreen />);

    // ActivityIndicator is used inside Loading component (footer)
    const spinners = UNSAFE_getAllByType(ActivityIndicator);
    expect(spinners.length).toBeGreaterThan(0);
  });
});
