import { Card, IconButton, Tooltip } from "@mui/material";
import cls from "./style.module.scss";
import { FC, ReactNode, useState, useRef, useEffect } from "react";
import { t } from "i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DeleteIcon, EditIcon } from "../../UI/IconGenerator/Svg";
import CloseIcon from "@mui/icons-material/Close";
import { PopoverDelete } from "../CNewTable/Details/Actions/EditDelete/PopOver";
import { useModalManager } from "../../../hooks/useModalManager";

interface Props {
  title?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string;
  padding?: string;
  children?: ReactNode;
  classes?: string;
  closable?: boolean;
  action?: any;
  actions?: string[];
  disabled?: string;
  defaultData?: { id: string | number | undefined };
  handleActions?: (val: string, val2?: any) => void;
  modalId?: string; // Optional prop for custom modal ID
  innerModal?: boolean;
  autoWidth?: boolean;
}

const CNewModal: FC<Props> = ({
  title = "",
  padding = "14px",
  children,
  action = "add",
  defaultData = { id: "" },
  handleActions = () => {},
  actions = [],
  disabled = "",
  modalId,
  innerModal = false,
  autoWidth = false,
}) => {
  const [screen, setScreen] = useState(!disabled);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Generate unique modal ID if not provided
  const uniqueModalId = useRef(
    modalId || `modal-${Date.now()}-${Math.random()}`
  ).current;

  // Handle modal close
  const handleClose = () => {
    handleActions("close");
  };

  const {} = useModalManager(uniqueModalId, handleClose);

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
      // Cache the rect to avoid multiple getBoundingClientRect calls
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
      // Use requestAnimationFrame to batch position updates and avoid forced reflow
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

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div
        ref={modalRef}
        className={`fixed rounded-[12px] bg-white shadow-lg z-[99] ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          left: position ? `${position.x}px` : "50%",
          top: position ? `${position.y}px` : "50%",
          transform: position ? "none" : "translate(-50%, -50%)",
          transition: isDragging ? "none" : "width 0.3s, height 0.3s",
        }}
      >
        <Card className={`${cls.card}`} style={{ padding }}>
          <div
            className={`duration-300 relative ${
              !autoWidth
                ? screen
                  ? "w-[1200px] max-h-[95vh]"
                  : "w-[90vw] max-h-[95vh]"
                : "w-auto h-[800px]"
            }`}
          >
            {title && (
              <div
                className="grid grid-cols-3 px-2 py-1 top-0 bg-white z-[91] border-b border-[var(--border)] cursor-move"
                onMouseDown={handleDragStart}
              >
                <div className="flex items-center space-x-3">
                  <IconButton onClick={handleClose}>
                    <div className="w-[30px] h-[30px] items-center justify-center flex bg-[var(--main80)] rounded-full">
                      <ArrowBackIcon
                        style={{ color: "var(--main)", width: 18 }}
                      />
                    </div>
                  </IconButton>

                  <h2>{t(title)}</h2>
                  {defaultData?.id && (
                    <div className="relative">
                      <IconButton onClick={() => setOpenPopup((prev) => !prev)}>
                        <div
                          className={`flex items-center justify-center rounded-full w-[30px] h-[30px] ${
                            action === "delete"
                              ? "border border-[var(--main)]"
                              : ""
                          }`}
                        >
                          <DeleteIcon fill="var(--main)" />
                        </div>
                      </IconButton>
                      {openPopup && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 shadow-2xl border border-[var(--gray30)] w-[300px] z-[95] bg-white rounded-[8px] text-sm">
                          <div className="relative z-[999]">
                            <PopoverDelete
                              closePopover={(status) => {
                                setOpenPopup(false);
                                if (status)
                                  handleActions(status, defaultData.id);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <Tooltip
                    title="Переместить модальное окно"
                    arrow
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, 15],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <IconButton onMouseDown={handleDragStart}>
                      <div
                        className={`flex items-center justify-center rounded-full w-[30px] h-[30px] ${
                          isDragging ? "border border-[var(--main)]" : ""
                        }`}
                      >
                        <DragIndicatorIcon style={{ color: "var(--main)" }} />
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  {actions.includes("edit") && (
                    <IconButton onClick={() => handleActions("edit_modal")}>
                      <div
                        className={`flex items-center justify-center rounded-full w-[30px] h-[30px] ${
                          action === "edit" ? "border border-[var(--main)]" : ""
                        }`}
                      >
                        <EditIcon fill="var(--main)" />
                      </div>
                    </IconButton>
                  )}

                  <Tooltip
                    title="Свернуть модальное окно"
                    arrow
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, 15],
                            },
                          },
                        ],
                      },
                    }}
                  >
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
                  </Tooltip>

                  <IconButton onClick={handleClose}>
                    <div className="w-[30px] h-[30px] items-center justify-center flex group hover:bg-[var(--primary50)] hover:rotate-[90deg] duration-200">
                      <CloseIcon className="text-[var(--main)]" />
                    </div>
                  </IconButton>
                </div>
              </div>
            )}

            <div className="px-3 py-2 relative z-[94]">{children}</div>
          </div>
        </Card>
      </div>

      {!innerModal && (
        <div
          className={`w-full h-full fixed top-0 left-0 z-[97] ${
            title ? "bg-[rgba(0,0,0,0.3)]" : ""
          }`}
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default CNewModal;
