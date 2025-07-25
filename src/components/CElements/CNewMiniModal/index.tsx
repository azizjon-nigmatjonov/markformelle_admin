import { Card, IconButton } from "@mui/material";
import cls from "./style.module.scss";
import { FC, ReactNode, useState, useRef, useEffect } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CloseIcon } from "../../UI/IconGenerator/Svg";
import { useTranslation } from "react-i18next";
import { useModalManager } from "../../../hooks/useModalManager";

interface Props {
  title?: string;
  padding?: string;
  children?: ReactNode;
  type?: string;
  handleActions?: (val: string, val2?: any) => void;
  modalId?: string;
}

const CNewMiniModal: FC<Props> = ({
  title = "",
  padding = "14px",
  children,
  type,
  handleActions = () => {},
  modalId,
}) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const uniqueModalId = useRef(
    modalId || `mini-modal-${Date.now()}-${Math.random()}`
  ).current;

  const handleClose = () => {
    handleActions("Close");
  };

  const {} = useModalManager(uniqueModalId, handleClose);

  // Remove this useEffect as it's causing issues with position management

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();

      if (!position) {
        // Use the current visual position of the modal
        setPosition({
          x: rect.left,
          y: rect.top,
        });
      }

      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && position) {
      requestAnimationFrame(() => {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <>
      <div
        ref={modalRef}
        className={`fixed ${
          type === "inner" ? "z-[100]" : "z-[99]"
        } rounded-[12px] bg-white shadow-2xl border border-[var(--gray30)]`}
        style={{
          left: position ? `${position.x}px` : "50%",
          top: position ? `${position.y}px` : "50%",
          transform:
            position?.x || position?.y ? "none" : "translate(-50%, -50%)",
          transition: isDragging ? "none" : "width 0.3s, height 0.3s",
        }}
      >
        <Card className={`${cls.card}`} style={{ padding }}>
          <div>
            {title && (
              <div className="grid grid-cols-3 px-3 items-center top-0 bg-white z-[91] border-b border-[var(--border)]">
                <h2 className="font-medium">{t(title)}</h2>

                <div className="flex justify-center">
                  <IconButton
                    onMouseDown={handleDragStart}
                    className={`transition-colors ${
                      isDragging ? "bg-[var(--main80)]" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full w-[30px] h-[30px] ${
                        isDragging ? "border border-[var(--main)]" : ""
                      }`}
                    >
                      <DragIndicatorIcon style={{ color: "var(--main)" }} />
                    </div>
                  </IconButton>
                </div>

                <div className="flex justify-end">
                  <IconButton onClick={handleClose}>
                    <div className="hover:rotate-[90deg] duration-200">
                      <CloseIcon />
                    </div>
                  </IconButton>
                </div>
              </div>
            )}
            <div className="px-3 py-2 relative z-[94]">{children}</div>{" "}
          </div>
        </Card>
      </div>

      {type !== "inner" && (
        <div
          className={`w-[130vw] h-[130vh] fixed top-[-20vh] left-[-30vw] z-[98] ${
            title ? "bg-[rgba(0,0,0,0.3)]" : ""
          }`}
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default CNewMiniModal;
