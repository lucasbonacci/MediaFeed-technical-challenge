import getDeviceLanguage from '@/utils/getDeviceLanguage';
import type { SupportedLanguage } from '@/types/languages';

const languageToLocale = (lang: SupportedLanguage): string => {
  switch (lang) {
    case 'es':
      return 'es-ES';
    case 'en':
      return 'en-US';

    default:
      return 'en-US';
  }
};

const getDefaultLocale = (): string => {
  const deviceLang = getDeviceLanguage();
  return languageToLocale(deviceLang);
};

const formatDate = {
  short: (dateString: string, locale = getDefaultLocale()) =>
    new Date(dateString).toLocaleDateString(locale),

  full: (dateString: string, locale = getDefaultLocale()) =>
    new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
};

export default formatDate;
