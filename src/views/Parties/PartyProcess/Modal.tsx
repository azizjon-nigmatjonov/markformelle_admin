import { Form } from "./Form";
import { PartyTransfers } from "./PartyTransfers";

export const ModalUIProcess = ({
  handleModalActions,
  defaultData,
}: {
  handleModalActions: (status: string) => void;
  defaultData: any;
}) => {
  return (
    <div className="space-y-5">
      <Form
        handleModalActions={handleModalActions}
        defaultData={defaultData}
        uniqueID="main_order_form"
      />
      <div>
        <PartyTransfers defaultData={defaultData} />
      </div>
    </div>
  );
};
