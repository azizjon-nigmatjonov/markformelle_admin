import { ReactNode, useEffect, useState } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { CloseIcon } from "../../UI/IconGenerator/Svg";

interface Props {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  anchor: HTMLElement | undefined | null;
}

export const CAnchorPopup = ({
  title = "",
  open = false,
  children,
  onClose = () => {},
  anchor,
}: Props) => {
  const [styles, setStyles]: any = useState({ padding: 0, zIndex: 99 });

  useEffect(() => {
    setTimeout(() => {
      setStyles(...styles, { left: "30px", top: "30px" });
    }, 2000);
  }, []);

  return (
    <>
      <BasePopup
        id={anchor ? "simple-popup" : undefined}
        anchor={anchor}
        open={anchor ? true : false}
        style={styles}
      >
        <div className="bg-[#fff] rounded-[12px] border border-[var(--gray30)] shadow-2xl z-[99] relative ">
          <div className="py-2 border-b border-[var(--border)]">
            <h2 className="text-center text-lg font-medium">{title}</h2>
            <button
              onClick={() => onClose()}
              className="absolute right-2.5 top-2.5"
            >
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </BasePopup>
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-[99]"
          onClick={() => onClose()}
        ></div>
      )}
    </>
  );
};
