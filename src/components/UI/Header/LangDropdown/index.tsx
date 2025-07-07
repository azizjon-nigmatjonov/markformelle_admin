import { useDispatch, useSelector } from "react-redux";
import { useLangs } from "../../../../hooks/useLangs";
import CSelect from "../../../CElements/CSelect";
import { authActions } from "../../../../store/auth/auth.slice";
import i18next from "i18next";

export const LangDropdown = () => {
  const lang = useSelector((state: any) => state.auth.lang);
  const { langList } = useLangs();
  const dispatch = useDispatch();

  const handleLanguage = async (val: string) => {
    dispatch(authActions.setLang(val));

    // Change language and wait for it to complete
    await i18next.changeLanguage(val);

    // Only reload if necessary (e.g., for major layout changes)
    // setTimeout(() => {
    //   window.location.reload();
    // }, 0);
  };

  return (
    <CSelect
      value={lang}
      handlerValue={(obj: { value: string }) => handleLanguage(obj.value)}
      options={[...langList]}
    />
  );
};
