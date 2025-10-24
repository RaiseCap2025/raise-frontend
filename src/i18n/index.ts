import intl from 'react-intl-universal';

import enUS from './locales/en-US.json';
import frFR from './locales/fr-FR.json';

const locales: Record<string, any> = {
  'en-US': enUS,
  'fr-FR': frFR
};

/**
 * Initialize i18n for the given locale
 */
export const initI18n = async (locale: string = 'en-US') => {
  const currentLocale = locales[locale] ? locale : 'en-US';

  await intl.init({
    currentLocale,
    locales,
    fallbackLocale: 'en-US'
  });

  return intl;
};
