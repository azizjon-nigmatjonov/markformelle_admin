import { memo } from "react";
import { EnterCancelButtons } from "../../UI/FormButtons/EnterCancel";
import CNewMiniModal from "../CNewMiniModal";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = memo(
  ({
    open,
    onClose,
    title,
    message,
    onConfirm,
    onCancel,
  }: ConfirmationModalProps) => {
    if (!open) return null;

    return (
      <CNewMiniModal
        title=""
        handleActions={() => {
          onClose();
        }}
        type="q"
      >
        <p className="text-[var(--black)] text-2xl font-medium">{title}</p>
        {message && (
          <p className="text-[var(--error)] text-lg mb-5">{message}</p>
        )}
        <EnterCancelButtons
          handleActions={(type: string, _: any) => {
            if (type === "Close") {
              onCancel();
            } else {
              onConfirm();
            }
          }}
          uniqueID="confirmation-modal"
        />
      </CNewMiniModal>
    );
  }
);

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
