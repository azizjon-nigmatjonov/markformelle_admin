import { ReactNode } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

interface Props {
  children: ReactNode;
  anchor: null | HTMLElement;
  setAnchor: (val: HTMLElement | null) => void;
}

export const CAnchorPopup = ({
  children,
  anchor,
  setAnchor = () => {},
}: Props) => {
  return (
    <>
      <BasePopup
        id={anchor ? "simple-popup" : undefined}
        open={anchor ? true : false}
        anchor={anchor}
        style={{
          left: "0px",
          top: "0px",
          padding: 0,
          zIndex: 99,
        }}
      >
        {children}
      </BasePopup>
      {anchor && (
        <div
          className="fixed top-0 left-0 w-full h-full"
          onClick={() => setAnchor(null)}
        ></div>
      )}
    </>
  );
};
