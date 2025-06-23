import { useTranslation } from "react-i18next";

export const useTranslationHook = () => {
  const { t } = useTranslation();

  const tr = (key: any) => {
    if (!key) return " ";

    const translation = t(key);
    if (translation && translation !== key) return translation;

    return key;
  };

  return { t: tr };
};
