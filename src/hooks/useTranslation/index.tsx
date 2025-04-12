import { useTranslation } from "react-i18next";

export const useTranslationHook = () => {
  const { t } = useTranslation();
  let no_translations: any = localStorage.getItem("no_translations");
  no_translations = no_translations ? JSON.parse(no_translations) : [];
  const handleTranslateFn: any = (translation?: string) => {
    if (!translation) return;

    if (no_translations.includes(translation)) {
      no_translations = no_translations.filter(
        (el: string) => el !== translation
      );
    } else {
      no_translations.push(translation);
    }

    localStorage.setItem("no_translations", JSON.stringify(no_translations));
  };

  const tr = (key: any) => {
    if (t(key) !== key) {
      return t(key);
    }
    handleTranslateFn(key);
    return key;
  };

  return { t: tr };
};
