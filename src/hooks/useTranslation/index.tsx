import { useTranslation } from "react-i18next";

export const useTranslationHook = () => {
  const { t } = useTranslation();

  const tr = (key: any) => {
    if (t(key)?.trim()) {
      return t(key);
    }

    return key;
  };

  return { t: tr };
};
