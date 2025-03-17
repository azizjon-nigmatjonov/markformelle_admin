import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalUI } from "../Modal";
import { ModalListLogic } from "./Logic";

interface Props {
  handleActionsModal: (val: string, element?: any) => void;
  item: any;
  modalList: any;
}

export const ModalList = ({ handleActionsModal, item, modalList }: Props) => {
  const { data, setData } = ModalListLogic({ id: item?.id });

  return (
    <CNewModal
      title="Urin tanitimi"
      action={item?.type}
      handleActions={handleActionsModal}
      element={{
        ...item,
        last: item.order === modalList?.length ? true : false,
      }}
      list={modalList}
    >
      <ModalUI defaultData={data} setData={setData} action={item?.type} />
    </CNewModal>
  );
};
