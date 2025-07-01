import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import axios from "axios";
import { allTranslations } from "./constants/allTranslations";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    whitelist: ["en", "ru", "uz", "tu"],
    interpolation: {
      escapeValue: false,
    },
    useSuspense: true,
    backend: {
      loadPath: `${import.meta.env.VITE_TEST_URL}/translation/language/${localStorage.getItem("i18nextLng")?.includes("US")
        ? "ru"
        : localStorage.getItem("i18nextLng")
        }?limit=1000`,
      request: async (options, url, payload, callback) => {
        let currentLang = i18next.language;
        if (currentLang?.includes("US")) currentLang = "ru";

        try {
          const res = await axios.get(url);
          const translatedObj = res.data[currentLang] || {};

          localStorage.setItem(
            "translation_by_lang",
            JSON.stringify(translatedObj)
          );
          callback(null, {
            data: translatedObj,
            status: 200,
          });
        } catch (err) {
          // Use static translations when backend is not available
          const currentLang = i18next.language;
          const fallbackLang = currentLang?.includes("US") ? "ru" : currentLang || "ru";
          const staticTranslations = allTranslations[fallbackLang] || allTranslations.ru;

          callback(null, {
            data: staticTranslations,
            status: 200,
          });
        }
      },
    },
  });

export default i18next;
