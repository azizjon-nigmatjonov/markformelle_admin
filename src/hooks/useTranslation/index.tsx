import { useTranslation } from "react-i18next";

export const useTranslationHook = () => {
  const { t } = useTranslation();

  const tr = (key: any) => {
    if (!key) return "-";
    if (t(key.toLocaleLowerCase())?.trim()) {
      return t(key.toLocaleLowerCase());
    }

    return key;
  };

  return { t: tr };
};
