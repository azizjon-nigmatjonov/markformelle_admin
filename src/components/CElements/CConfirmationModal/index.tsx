import { memo } from "react";
import { useTranslation } from "react-i18next";
import CModal from "../CModal";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
}

export const ConfirmationModal = memo(
  ({
    open,
    onClose,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "yes",
    cancelText = "no",
    confirmButtonClass = "custom-btn",
    cancelButtonClass = "cancel-btn",
  }: ConfirmationModalProps) => {
    const { t } = useTranslation();

    if (!open) return null;

    return (
      <CModal open={open} handleClose={onClose} footerActive={false}>
        <p className="text-[var(--black)] text-2xl font-medium">{title}</p>
        {message && (
          <p className="text-[var(--error)] text-lg mt-3">{message}</p>
        )}
        <div className="grid gap-2 grid-cols-2 mt-8">
          <button className={cancelButtonClass} onClick={onCancel}>
            {t(cancelText)}
          </button>
          <button className={confirmButtonClass} onClick={onConfirm}>
            {t(confirmText)}
          </button>
        </div>
      </CModal>
    );
  }
);

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
