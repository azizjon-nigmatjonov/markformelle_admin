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
    whitelist: ["en", "ru", "uz"],
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    // backend: {
    //   loadPath: `${
    //     import.meta.env.VITE_BASE_URL_NEW_BACKEND
    //   }/translations?type=key_value`,
    //   request: async (options, url, payload, callback) => {
    //     axios
    //       .get(url)
    //       .then((res) => {
    //         const currentLang = localStorage.getItem("i18nextLng") || "ru";

    //         callback(null, {
    //           data: res.data[currentLang],
    //           status: 200,
    //         });
    //       })
    //       .catch((err) => console.log("err", err));
    //   },
    // },
  });

export default i18next;
