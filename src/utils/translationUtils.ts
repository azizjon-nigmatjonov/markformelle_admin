import i18next from 'i18next';

export const loadCachedTranslations = (lang: string) => {
  const cachedTranslations = localStorage.getItem(`translation_by_lang_${lang}`);
  
  if (cachedTranslations) {
    try {
      const parsed = JSON.parse(cachedTranslations);
      
      // Add to i18next immediately
      Object.keys(parsed).forEach(key => {
        i18next.addResource(lang, 'translation', key, parsed[key]);
      });
      
      return parsed;
    } catch (error) {
      console.warn('Failed to parse cached translations for language:', lang, error);
      return null;
    }
  }
  
  return null;
};

export const saveTranslationsToCache = (lang: string, translations: Record<string, string>) => {
  try {
    localStorage.setItem(`translation_by_lang_${lang}`, JSON.stringify(translations));
    return true;
  } catch (error) {
    console.warn('Failed to save translations to cache for language:', lang, error);
    return false;
  }
};

export const clearTranslationCache = (lang?: string) => {
  if (lang) {
    localStorage.removeItem(`translation_by_lang_${lang}`);
  } else {
    // Clear all translation caches
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('translation_by_lang_')) {
        localStorage.removeItem(key);
      }
    });
  }
};

export const getTranslationCacheSize = () => {
  const keys = Object.keys(localStorage);
  const translationKeys = keys.filter(key => key.startsWith('translation_by_lang_'));
  
  let totalSize = 0;
  translationKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      totalSize += new Blob([value]).size;
    }
  });
  
  return {
    count: translationKeys.length,
    size: totalSize,
    sizeInKB: Math.round(totalSize / 1024 * 100) / 100
  };
}; 