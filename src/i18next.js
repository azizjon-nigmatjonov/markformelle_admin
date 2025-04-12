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
          JSON.parse(localStorage.getItem("translations")) || [];
        const obj = {};

        if (storedTranslation?.length) {
          storedTranslation.forEach((element) => {
            if (element.KEYWORD) {
              obj[element.KEYWORD] = element[currentLang.toLocaleUpperCase()];
            }
          });
        } else {
          obj = TranslationsObject;
        }

        callback(null, {
          data: TranslationsObject,
          status: 200,
        });
        try {
          const res = await axios.get(url);

          callback(null, {
            data: res.data[currentLang] || {},
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
