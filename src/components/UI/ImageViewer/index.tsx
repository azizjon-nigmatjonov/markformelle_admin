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
      <div className="fixed z-[99] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="relative h-[60vh] w-[80vw] h-[50vh]z-[99]">
          <img
            src={url}
            alt="image viewer photo"
            className="w-full h-full cursor-pointer"
          />

          <button
            onClick={() => closeViewer()}
            className="absolute -right-20 -top-20"
          >
            <CancelIcon style={{ color: "var(--gray20)", fontSize: 34 }} />
          </button>
        </div>
      </div>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] z-[98]"
        onClick={() => closeViewer()}
      ></div>
    </>
  );
};
