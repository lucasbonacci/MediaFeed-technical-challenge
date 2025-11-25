import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import getDeviceLanguage from '@/utils/getDeviceLanguage';
import es from './locales/es.json';
import en from './locales/en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: false,
  detect: getDeviceLanguage,
  init: () => {},
  cacheUserLanguage: () => {},
};

const config: InitOptions = {
  resources,
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init(config);

export default i18n;
