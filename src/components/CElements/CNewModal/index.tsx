import { Card, IconButton } from "@mui/material";
import cls from "./style.module.scss";
import { FC, ReactNode, useState, useRef, useEffect } from "react";
import { t } from "i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DeleteIcon, EditIcon } from "../../UI/IconGenerator/Svg";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  element?: any;
  list?: any;
  title?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string;
  padding?: string;
  children?: ReactNode;
  classes?: string;
  closable?: boolean;
  action?: any;
  handleActions?: (val: string, val2?: any) => void;
}

const CNewModal: FC<Props> = ({
  element,
  list = [],
  title = "",
  padding = "14px",
  children,
  action = "add",
  handleActions = () => {},
}) => {
  const [screen, setScreen] = useState(true);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!position && modalRef.current) {
      setPosition(null);
    }
  }, [position]);

  const handleScreen = () => {
    setScreen(!screen);
    if (screen) {
      setPosition(null);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();

      if (!position) {
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
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
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
        className={`fixed rounded-[4px] z-[99] bg-white shadow-lg ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          left: position
            ? `${position.x}px`
            : element?.order && element.order < list?.length
            ? `calc(${50 - (list.length - element.order)}%)`
            : "50%",
          top: position
            ? `${position.y}px`
            : element?.order && element.order < list?.length
            ? `calc(${50 + (list.length - element.order)}%)`
            : "50%",
          transform: position ? "none" : "translate(-50%, -50%)",
          transition: isDragging ? "none" : "width 0.3s, height 0.3s",
        }}
      >
        <Card className={`${cls.card}`} style={{ padding }}>
          <div
            className={`duration-300 relative overflow-y-scroll designed-scroll ${
              title
                ? screen
                  ? "w-[1200px] h-[700px]"
                  : "w-[90vw] h-[80vh]"
                : "w-auto h-[800px]"
            }`}
          >
            {title && (
              <div className="flex items-center justify-between p-3 sticky top-0 bg-white z-[94] border-b border-[var(--border)]">
                <div className="flex items-center space-x-3">
                  <IconButton onClick={() => handleActions("close", element)}>
                    <div className="w-[30px] h-[30px] items-center justify-center flex bg-[var(--main80)] rounded-full">
                      <ArrowBackIcon
                        style={{ color: "var(--main)", width: 18 }}
                      />
                    </div>
                  </IconButton>

                  <h2>{t(title)}</h2>
                </div>

                <div className="flex items-center space-x-3">
                  <IconButton
                    onClick={() => handleActions("edit_modal", element)}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full w-[30px] h-[30px] ${
                        action === "edit" ? "border border-[var(--main)]" : ""
                      }`}
                    >
                      <EditIcon fill="var(--main)" />
                    </div>
                  </IconButton>

                  <IconButton onClick={() => {}}>
                    <div
                      className={`flex items-center justify-center rounded-full w-[30px] h-[30px] ${
                        action === "delete" ? "border border-[var(--main)]" : ""
                      }`}
                    >
                      <DeleteIcon fill="var(--main)" />
                    </div>
                  </IconButton>
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

                <div className="flex items-center space-x-4">
                  {action === "edit" && (
                    <button className="text-[14px] border border-[var(--border)] px-2 py-1 rounded-[4px]">
                      Сохранить
                    </button>
                  )}
                  <div>
                    <IconButton onClick={() => handleActions("close", element)}>
                      <div className="w-[30px] h-[30px] items-center justify-center flex hover:bg-[var(--primary50)]">
                        <RemoveIcon className="text-[var(--main)]" />
                      </div>
                    </IconButton>
                    <IconButton onClick={() => handleScreen()}>
                      <div className="w-[30px] h-[30px] items-center justify-center flex group hover:bg-[var(--primary50)]">
                        {!screen ? (
                          <div className="relative w-[18px] h-[18px]">
                            <div className="w-[12px] h-[12px] border border-[var(--main)] absolute top-[2px] right-[1px]"></div>
                            <div className="w-[12px] h-[12px] border border-[var(--main)] absolute left-[2px] bottom-[1px] bg-white group-hover:bg-[var(--primary50)]"></div>
                          </div>
                        ) : (
                          <div className="w-[15px] h-[15px] border border-[var(--main)]"></div>
                        )}
                      </div>
                    </IconButton>
                    <IconButton onClick={() => handleActions("close", element)}>
                      <div className="w-[30px] h-[30px] items-center justify-center flex group hover:bg-[var(--primary50)]">
                        <CloseIcon className="text-[var(--main)]" />
                      </div>
                    </IconButton>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 relative z-[94]">{children}</div>

            {/* {element?.order && !element.last ? (
              <div
                onClick={() => handleActions("reorder", element)}
                className="absolute left-0 top-0 z-[97] w-full h-full"
              ></div>
            ) : (
              <></>
            )} */}
          </div>
        </Card>
      </div>

      {element?.order && element.order < 2 ? (
        <div
          className="bg-[rgba(0,0,0,0.5)] w-full h-full fixed top-0 left-0 z-[97]"
          onClick={() => handleActions("close", list[list.length - 1])}
        ></div>
      ) : (
        <></>
      )}
      {!element && (
        <div
          className={`w-full h-full fixed top-0 left-0 z-[97] ${
            title ? "bg-[rgba(0,0,0,0.5)]" : ""
          }`}
          onClick={() => handleActions("close", element)}
        ></div>
      )}
    </>
  );
};

export default CNewModal;
