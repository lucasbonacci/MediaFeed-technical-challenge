import React from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';
import type { FavoriteArticle } from '@/types/favorites';
import {
  getStoredFavorites,
  setStoredFavorites,
} from '@/services/favoritesStorage';

jest.mock('@/services/favoritesStorage');

const mockGetStoredFavorites =
  getStoredFavorites as jest.MockedFunction<typeof getStoredFavorites>;
const mockSetStoredFavorites =
  setStoredFavorites as jest.MockedFunction<typeof setStoredFavorites>;

const sampleArticle: FavoriteArticle = {
  url: 'https://example.com/article-1',
  title: 'Sample article',
  source: { id: '1', name: 'Source 1' },
  author: 'John Doe',
  description: 'Some description',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2024-01-01T00:00:00Z',
  content: 'Lorem ipsum dolor sit amet',
};

const Consumer = () => {
  const { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite } =
    useFavorites();

  return (
    <>
      <Text testID="count">{favorites.length}</Text>
      <Text testID="isFavorite">
        {isFavorite(sampleArticle.url) ? 'yes' : 'no'}
      </Text>
      <Button
        testID="add"
        title="add"
        onPress={() => addFavorite(sampleArticle)}
      />
      <Button
        testID="remove"
        title="remove"
        onPress={() => removeFavorite(sampleArticle.url)}
      />
      <Button
        testID="toggle"
        title="toggle"
        onPress={() => toggleFavorite(sampleArticle)}
      />
    </>
  );
};

const renderWithProvider = () =>
  render(
    <FavoritesProvider>
      <Consumer />
    </FavoritesProvider>,
  );

const getCount = (getByTestId: any) => getByTestId('count').props.children;
const getStatus = (getByTestId: any) => getByTestId('isFavorite').props.children;

describe('FavoritesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetStoredFavorites.mockResolvedValue([]);
    mockSetStoredFavorites.mockResolvedValue();
  });

  it('loads favorites from storage on initialization', async () => {
    mockGetStoredFavorites.mockResolvedValueOnce([sampleArticle]);

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getCount(getByTestId)).toBe(1);
      expect(getStatus(getByTestId)).toBe('yes');
    });

    expect(mockGetStoredFavorites).toHaveBeenCalledTimes(1);
  });

  it('addFavorite adds and persists a new favorite', async () => {
    mockGetStoredFavorites.mockResolvedValueOnce([]);

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getCount(getByTestId)).toBe(0);
      expect(getStatus(getByTestId)).toBe('no');
    });

    fireEvent.press(getByTestId('add'));

    await waitFor(() => {
      expect(mockSetStoredFavorites).toHaveBeenCalledWith([sampleArticle]);
      expect(getCount(getByTestId)).toBe(1);
      expect(getStatus(getByTestId)).toBe('yes');
    });
  });

  it('addFavorite does not duplicate an existing favorite', async () => {
    mockGetStoredFavorites.mockResolvedValueOnce([sampleArticle]);

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getCount(getByTestId)).toBe(1);
      expect(getStatus(getByTestId)).toBe('yes');
    });

    fireEvent.press(getByTestId('add'));

    await waitFor(() => {
      expect(mockSetStoredFavorites).not.toHaveBeenCalled();
      expect(getCount(getByTestId)).toBe(1);
    });
  });

  it('removeFavorite removes a favorite and persists the change', async () => {
    mockGetStoredFavorites.mockResolvedValueOnce([sampleArticle]);

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getCount(getByTestId)).toBe(1);
      expect(getStatus(getByTestId)).toBe('yes');
    });

    fireEvent.press(getByTestId('remove'));

    await waitFor(() => {
      expect(mockSetStoredFavorites).toHaveBeenCalledWith([]);
      expect(getCount(getByTestId)).toBe(0);
      expect(getStatus(getByTestId)).toBe('no');
    });
  });

  it('toggleFavorite adds if not favorite, then removes if already favorite', async () => {
    mockGetStoredFavorites.mockResolvedValueOnce([]);

    const { getByTestId } = renderWithProvider();

    fireEvent.press(getByTestId('toggle'));

    await waitFor(() => {
      expect(mockSetStoredFavorites).toHaveBeenCalledWith([sampleArticle]);
      expect(getCount(getByTestId)).toBe(1);
      expect(getStatus(getByTestId)).toBe('yes');
    });

    mockSetStoredFavorites.mockClear();

    fireEvent.press(getByTestId('toggle'));

    await waitFor(() => {
      expect(mockSetStoredFavorites).toHaveBeenCalledWith([]);
      expect(getCount(getByTestId)).toBe(0);
      expect(getStatus(getByTestId)).toBe('no');
    });
  });

  it('useFavorites throws if used outside FavoritesProvider', () => {
    const BadConsumer = () => {
      useFavorites();
      return null;
    };

    expect(() => render(<BadConsumer />)).toThrow(
      'useFavorites must be used within a FavoritesProvider',
    );
  });
});
