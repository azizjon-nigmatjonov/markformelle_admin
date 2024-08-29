import { useDispatch, useSelector } from "react-redux";
import { useLangs } from "../../../../hooks/useLangs";
import CSelect from "../../../CElements/CSelect";
import { authActions } from "../../../../store/auth/auth.slice";
import i18next from "i18next";
import { useEffect } from "react";

export const LangDropdown = () => {
  const lang = useSelector((state: any) => state.auth.lang);
  const { langList } = useLangs();
  const dispatch = useDispatch();

  const handleLanguage = (val: string) => {
    dispatch(authActions.setLang(val));
  };

  useEffect(() => {
    if (lang) i18next.changeLanguage(lang);
  }, [lang]);

  return (
    <CSelect
      value={lang}
      handlerValue={(obj: { value: string }) => handleLanguage(obj.value)}
      options={[...langList]}
    />
  );
};
