import * as RNLocalize from 'react-native-localize';
import { SUPPORTED_LANGUAGES } from '@/constants/languages';
import { SupportedLanguage } from '@/types/languages';

const getDeviceLanguage = (): SupportedLanguage => {
  const lang = RNLocalize.getLocales()[0]?.languageCode || 'en';
  const match = SUPPORTED_LANGUAGES.find(l => l === lang);

  return match ?? 'en';
};

export default getDeviceLanguage;
