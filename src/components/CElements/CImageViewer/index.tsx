import { useState } from "react";
import { ImageViewer } from "../../UI/ImageViewer";
import { EyeIcon } from "../../UI/IconGenerator/Svg";

interface Props {
  url: string;
  alt?: string;
  className?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
}

const CImageViewer = ({
  url,
  alt = "image",
  className = "",
  iconSize = 18,
  iconColor = "var(--gray20)",
  disabled = false,
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
        <ImageViewer url={url} closeViewer={handleCloseViewer} />
      )}
    </>
  );
};

export default CImageViewer;
