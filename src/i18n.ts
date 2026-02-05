import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json';
import ar from './locales/ar/translation.json';

const applyDirection = (lng: string) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  document.body.dir = dir; // Apply to body as well for extra safety
};

// Load custom translations from localStorage if available
const loadCustomTranslations = () => {
  const languages = ['en', 'fr', 'de', 'ar'];
  languages.forEach((lang) => {
    const saved = localStorage.getItem(`translations_${lang}`);
    if (saved) {
      try {
        const customTranslations = JSON.parse(saved);
        i18n.addResourceBundle(lang, 'translation', customTranslations, true, true);
      } catch (error) {
        console.error(`Error loading custom translations for ${lang}:`, error);
      }
    }
  });
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  }, (err) => {
    if (!err) {
      loadCustomTranslations();
      applyDirection(i18n.language);
    }
  });

// Handle RTL
i18n.on('languageChanged', applyDirection);

export default i18n;
