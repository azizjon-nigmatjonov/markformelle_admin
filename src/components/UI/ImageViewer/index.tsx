import CancelIcon from "@mui/icons-material/Cancel";
import { useModalManager } from "../../../hooks/useModalManager";
import { useRef } from "react";

interface Props {
  url: string;
  closeViewer: () => void;
  modalId?: string; // Optional prop for custom modal ID
}

export const ImageViewer = ({
  url,
  closeViewer = () => {},
  modalId,
}: Props) => {
  if (!url) return "";

  const uniqueModalId = useRef(
    modalId || `image-viewer-${Date.now()}-${Math.random()}`
  ).current;

  const {} = useModalManager(uniqueModalId, closeViewer);

  return (
    <>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]">
        <div className="relative">
          <img
            src={url}
            alt="image viewer photo"
            className="w-[100vw] h-auto cursor-pointer rounded-[12px]"
          />

          <button
            onClick={() => closeViewer()}
            className="absolute -right-10 -top-10"
          >
            <CancelIcon style={{ color: "white", fontSize: 34 }} />
          </button>
        </div>
      </div>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] z-[98] bg-black/50 "
        onClick={() => closeViewer()}
      ></div>
    </>
  );
};
