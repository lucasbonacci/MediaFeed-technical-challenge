import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FavoriteArticle } from '@/types/favorites';
import { STORAGE_KEY } from '@/constants/storage';

export const getStoredFavorites = async (): Promise<FavoriteArticle[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
      return parsed as FavoriteArticle[];
    }

    console.warn('Favorites in storage are not an array, resetting.');
    return [];
  } catch (error) {
    console.error('Error reading favorites from storage:', error);
    return [];
  }
};

export const setStoredFavorites = async (
  favorites: FavoriteArticle[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
    throw error;
  }
};
