import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { translateActions } from "../store/translation/translate.slice";
import i18next from "i18next";
import { loadCachedTranslations } from "../utils/translationUtils";

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cached translations from localStorage on app startup
    const currentLang = i18next.language || "ru";
    const cachedTranslations = loadCachedTranslations(currentLang);

    if (cachedTranslations) {
      // Add to Redux store
      dispatch(
        translateActions.setTranslationsByLang({
          lang: currentLang,
          translations: cachedTranslations,
        })
      );

      console.log("Loaded cached translations for language:", currentLang);
    }
  }, [dispatch]);

  return <>{children}</>;
};
