import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredFavorites, setStoredFavorites } from '../favoritesStorage';
import { STORAGE_KEY } from '@/constants/storage';
import type { FavoriteArticle } from '@/types/favorites';

jest.mock('@react-native-async-storage/async-storage');

describe('favoritesStorage service', () => {
  const mockFavorites: FavoriteArticle[] = [
    {
      url: 'https://example.com/1',
      title: 'Article 1',
      source: { id: '1', name: 'Source 1' },
      author: 'John Doe',
      description: 'Some description',
      urlToImage: 'https://example.com/image.jpg',
      publishedAt: '2024-01-01T00:00:00Z',
      content: 'Lorem ipsum',
    },
  ];

  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeAll(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  // getStoredFavorites

  it('returns an empty array when storage is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const result = await getStoredFavorites();

    expect(result).toEqual([]);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('returns parsed favorites when data is valid', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockFavorites),
    );

    const result = await getStoredFavorites();

    expect(result).toEqual(mockFavorites);
  });

  it('returns empty array when parsed data is not an array', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ invalid: true }),
    );

    const result = await getStoredFavorites();

    expect(result).toEqual([]);
  });

  it('returns empty array on JSON parse error', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('INVALID_JSON');

    const result = await getStoredFavorites();

    expect(result).toEqual([]);
  });

  it('returns empty array when AsyncStorage throws', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error('Storage error'),
    );

    const result = await getStoredFavorites();

    expect(result).toEqual([]);
  });

  // setStoredFavorites

  it('saves favorites successfully', async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);

    await setStoredFavorites(mockFavorites);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify(mockFavorites),
    );
  });

  it('throws error when saving fails', async () => {
    const error = new Error('Failed to save');
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);

    await expect(setStoredFavorites(mockFavorites)).rejects.toThrow(error);
  });
});
