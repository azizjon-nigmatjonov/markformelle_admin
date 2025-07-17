import { useDispatch, useSelector } from "react-redux";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalList } from "./List";
import { modalsActions } from "../../../../store/modal/modal.slice";

export const ModalImporter = () => {
  const { modals } = ModalList();
  const modalData = useSelector((state: any) => state.modals.modalData);
  const dispatch = useDispatch();

  const modalActionsFn = (status: string) => {
    if (status === "close") {
      dispatch(
        modalsActions.setModalData({ id: "partitanitimi", defaultData: {} })
      );
    }
  };

  return (
    <>
      {modalData.map((modal: any) => {
        return (
          <CNewModal
            key={modal.id}
            title="Parti Details"
            disabled="big"
            handleActions={modalActionsFn}
          >
            {
              modals.find((modal: any) => modal.id === "partitanitimi")
                ?.component
            }
          </CNewModal>
        );
      })}
    </>
  );
};
