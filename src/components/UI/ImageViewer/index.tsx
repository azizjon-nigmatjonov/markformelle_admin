import CancelIcon from "@mui/icons-material/Cancel";
import { Closer } from "../Closer";

interface Props {
  url: string;
  closeViewer: () => void;
}

export const ImageViewer = ({ url, closeViewer = () => {} }: Props) => {
  if (!url) return "";

  return (
    <>
      <div className="fixed top-[-30vh] left-[-50vw] w-[130vw] h-[130vh] z-[99] flex items-center justify-center">
        <div className="relative min-h-[60vh] h-[50vh] w-full">
          <img
            src={url}
            alt="image viewer photo"
            className="object-cover min-w-[80vw] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]"
          />

          <button
            onClick={() => closeViewer()}
            className="absolute right-5 top-20 z-[99]"
          >
            <CancelIcon style={{ color: "var(--gray20)", fontSize: 34 }} />
          </button>
        </div>
      </div>
      <div className="relative z-[100]">
        <Closer handleClose={() => closeViewer()} />
      </div>
    </>
  );
};
