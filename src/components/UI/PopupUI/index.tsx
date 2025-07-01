import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

type Placement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end";

interface Props {
  open: boolean;
  anchor: any;
  placement?: Placement;
  children: React.ReactNode;
  onClose?: () => void;
}

export const PopupUI = ({
  open = false,
  anchor = null,
  placement = "right",
  children,
  onClose = () => {},
}: Props) => {
  return (
    <>
      <BasePopup
        id={open ? "simple-popup" : undefined}
        open={open}
        anchor={anchor}
        placement={placement}
        style={{
          padding: 0,
          zIndex: 99,
        }}
      >
        <div className="bg-white border border-[var(--border)] rounded-[8px] shadow-2xl">
          {children}
        </div>
      </BasePopup>
      {open && (
        <div
          className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[98]"
          onClick={() => onClose()}
        ></div>
      )}
    </>
  );
};
