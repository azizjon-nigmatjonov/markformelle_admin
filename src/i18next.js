import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import axios from "axios";

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
      loadPath: `${
        import.meta.env.VITE_TEST_URL
      }/translation/language/${localStorage.getItem("i18nextLng")}`, // Dynamic path using {{lng}}
      request: async (options, url, payload, callback) => {
        try {
          const res = await axios.get(url);
          const currentLang = i18next.language;

          callback(null, {
            data: res.data[currentLang],
            status: 200,
          });
        } catch (err) {
          callback(err, { status: 500 });
        }
      },
    },
  });

export default i18next;
