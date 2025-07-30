import { useDispatch, useSelector } from "react-redux";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalList } from "./List";
import { modalsActions } from "../../../../store/modal/modal.slice";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../../store/types";
import { websiteActions } from "../../../../store/website";

export const ModalImporter = () => {
  const { t } = useTranslation();
  const { modals } = ModalList();
  const modalData = useSelector((state: any) => state.modals.modalData);
  const dispatch = useDispatch();
  const dirtyPlaces = useSelector(
    (state: RootState) => state.website.dirty_places.list
  );

  const modalActionsFn = (id: string) => {
    if (dirtyPlaces.length) {
      dispatch(websiteActions.setDirtyPlaces({ list: "", isDirty: true }));
    } else {
      dispatch(modalsActions.setModalData({ id, defaultData: {} }));
    }
  };

  return (
    <>
      {modalData.map((modal: any, index: number) => {
        return (
          <CNewModal
            key={index}
            title={t(modal.id)}
            disabled="big"
            handleActions={() => modalActionsFn(modal.id)}
            innerModal={index !== 0}
          >
            {modals.find((item: any) => item.id === modal.id)?.component}
          </CNewModal>
        );
      })}
    </>
  );
};
