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
    lng: "ru", // Default language
    whitelist: ["en", "ru", "uz", "tu"], // Supported languages
    interpolation: {
      escapeValue: false,
    },
    ns: ["translations"], // Namespace for translations
    defaultNS: "translations",
    useSuspense: true,
    backend: {
      loadPath: `${import.meta.env.VITE_TEST_URL}/translation/language/{{lng}}`, // Dynamic path using {{lng}}
      request: async (options, url, payload, callback) => {
        try {
          // Use the current language dynamically in the request
          const res = await axios.get(url);
          console.log("resresres", res.data.ru);
          console.log("options", options);
          const currentLang = i18next.language;
          // Transform the response to match i18next's format
          const transformedData = {
            translations: res.data[currentLang], // Use options.lng to get the correct language
          };
          console.log("transformedData", transformedData);

          // console.log("transformedData", JSON.stringify(transformedData));

          // Pass the transformed data back to i18next
          callback(null, {
            data: transformedData,
            status: 200,
          });
        } catch (err) {
          console.log("err", err);
          callback(err, { status: 500 });
        }
      },
    },
  });

export default i18next;
