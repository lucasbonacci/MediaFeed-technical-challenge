import { Linking } from 'react-native';
import { normalizeUrl } from '@/utils';

const openUrl = async (rawUrl: string): Promise<void> => {
  const url = normalizeUrl(rawUrl);
  if (!url) return;

  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};

export default openUrl;
