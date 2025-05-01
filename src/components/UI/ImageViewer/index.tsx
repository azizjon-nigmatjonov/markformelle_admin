import CancelIcon from "@mui/icons-material/Cancel";
import { Closer } from "../Closer";

interface Props {
  url: string;
  closeViewer: () => void;
}

export const ImageViewer = ({ url, closeViewer = () => {} }: Props) => {
  if (!url) return "";

  return (
    <div className="fixed top-[-30vh] left-[-30vw] w-[130vw] h-[130vh] bg-[var(--black100)] z-[999] flex items-center justify-center">
      <img
        src={url}
        alt="image viewer photo"
        className="min-h-[50vh] object-cover max-h-[90vh] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]"
      />

      <button
        onClick={() => closeViewer()}
        className="fixed right-10 top-10 z-[99]"
      >
        <CancelIcon style={{ color: "var(--gray20)", fontSize: 34 }} />
      </button>

      <Closer handleClose={() => closeViewer()} />
    </div>
  );
};
