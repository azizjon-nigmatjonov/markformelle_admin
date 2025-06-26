import { useEffect, useState } from "react";
import { HamModalUI } from "../../../views/Lists/Materials/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import CNewMiniModal from "../../CElements/CNewMiniModal";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { websiteActions } from "../../../store/website";
import { ReceteAsamaModalUI } from "../../../views/Lists/Chemicals/Modal";

export const ModalImporter = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state: RootState) => state.website.modalType);
  const [open, setOpen] = useState(false);
  const { t } = useTranslationHook();
  useEffect(() => {
    if (modalType) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modalType]);

  if (!open) return <></>;
  switch (modalType) {
    case "ham":
      return (
        <CNewMiniModal
          title={t("form_ham")}
          type="inner"
          handleActions={() => {
            dispatch(websiteActions.setModalType(""));
          }}
        >
          <HamModalUI
            setOpen={setOpen}
            refetchTable={() => {}}
            defaultData={{}}
          />
        </CNewMiniModal>
      );
    case "receteasama":
      return (
        <CNewMiniModal
          title={t("recete_asama")}
          type="inner"
          handleActions={() => {
            dispatch(websiteActions.setModalType(""));
          }}
        >
          <ReceteAsamaModalUI
            setOpen={setOpen}
            refetchTable={() => {}}
            defaultData={{}}
          />
        </CNewMiniModal>
      );
    default:
      return <></>;
  }
};
