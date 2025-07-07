import { Form } from "./Form";
import { PartyTransfers } from "./PartyTransfers";

export const ModalUI = ({ handleModalActions, defaultData }: { handleModalActions: (status: string) => void, defaultData: any }) => {
  return <div>
    <Form handleModalActions={handleModalActions} defaultData={defaultData} uniqueID="" />
    <PartyTransfers />
  </div>
};