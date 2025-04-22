import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import axios from "axios";
import { TranslationsObject } from "./constants/translations";

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
      loadPath: `${import.meta.env.VITE_TEST_URL}/translation/language/${
        localStorage.getItem("i18nextLng")?.includes("US")
          ? "ru"
          : localStorage.getItem("i18nextLng")
      }`,
      request: async (options, url, payload, callback) => {
        let currentLang = i18next.language;
        if (currentLang?.includes("US")) currentLang = "ru";

        const storedTranslation =
          JSON.parse(localStorage.getItem("translation_by_lang")) || {};

        let newObj = { ...TranslationsObject };
        if (Object.values(storedTranslation)?.length) {
          for (let KEYWORD in storedTranslation) {
            newObj[KEYWORD] = KEYWORD;
          }
        }

        callback(null, {
          data: newObj,
          status: 200,
        });

        try {
          const res = await axios.get(url);
          const translatedObj = res.data[currentLang] || {};
          for (let key in translatedObj) {
            const newKey = key.toLocaleLowerCase();
            const oldVal = translatedObj[key];
            delete translatedObj[key];
            translatedObj[newKey] = oldVal;
          }
          localStorage.setItem(
            "translation_by_lang",
            JSON.stringify(translatedObj)
          );
          callback(null, {
            data: translatedObj,
            status: 200,
          });
        } catch (err) {
          callback(null, {
            data: obj || {},
            status: 200,
          });
        }
      },
    },
  });

export default i18next;
