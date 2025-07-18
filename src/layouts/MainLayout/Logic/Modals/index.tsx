import { useDispatch, useSelector } from "react-redux";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalList } from "./List";
import { modalsActions } from "../../../../store/modal/modal.slice";

export const ModalImporter = () => {
  const { modals } = ModalList();
  const modalData = useSelector((state: any) => state.modals.modalData);
  const dispatch = useDispatch();

  const modalActionsFn = (id: string) => {
    dispatch(modalsActions.setModalData({ id, defaultData: {} }));
  };

  return (
    <>
      {modalData.map((modal: any, index: number) => {
        return (
          <CNewModal
            key={index}
            title="Parti Details"
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
