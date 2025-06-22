import { useState } from "react";
import { ImageViewer } from "../../UI/ImageViewer";

interface Props {
  url: string;
  alt?: string;
  className?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
  modalId?: string;
}

const CImageViewer = ({
  url,
  alt = "image",
  className = "",
  disabled = false,
  modalId,
}: Props) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleOpenViewer = () => {
    if (!disabled && url) {
      setIsViewerOpen(true);
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  if (!url) return null;

  return (
    <>
      <img
        src={url}
        alt={alt}
        className={className}
        onClick={handleOpenViewer}
      />

      {isViewerOpen && (
        <ImageViewer
          url={url}
          closeViewer={handleCloseViewer}
          modalId={modalId || `c-image-viewer-${Date.now()}`}
        />
      )}
    </>
  );
};

export default CImageViewer;
