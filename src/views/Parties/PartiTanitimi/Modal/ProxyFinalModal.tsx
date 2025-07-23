import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { SubmitCancelButtons } from "../../../../components/UI/FormButtons/SubmitCancel";

export const ProxyFinalModal = ({
  setOpen = () => {},
  title = "",
}: {
  setOpen: (val: boolean) => void;
  title: string;
}) => {
  return (
    <CNewMiniModal>
      <div className="w-[340px]">
        <p className="pb-3">Do you want to delete card ({title}) ?</p>
        <SubmitCancelButtons
          type="enter"
          uniqueID="proxy_final_modal"
          handleActions={(status: string, uniqueID: string) => {
            if (status === "close") {
              setOpen(false);
            }
            if (uniqueID === "proxy_final_modal") {
              setOpen(false);
            }
          }}
        />
      </div>
    </CNewMiniModal>
  );
};
