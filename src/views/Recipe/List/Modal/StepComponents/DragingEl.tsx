import { Chip, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
  rows: any[];
  editStep?: boolean;
  outerIndex: number;
  hoveredIndexStep?: number;
  draggingIndexStep?: any;
  hoveredIndex: any;
  handleDragStartStep: (innerIndex: number, outerIndex: number) => void;
  handleDragOverStep: (innerIndex: number, outerIndex: number) => void;
  handleDropSteps: (innerIndex: number, outerIndex: number) => void;
  handleDragLeaveStep: () => void;
  setInitialModalData: (data: any) => void;
  handleMouseEnter: (ind: number) => void;
  handleMouseLeave: () => void;
  handleAdd: (ind: number, outInd: number, item: any) => void;
  hoverAdd: number;
}

export const DragingEl = ({
  rows = [],
  editStep,
  outerIndex,
  hoveredIndexStep,
  draggingIndexStep,
  hoveredIndex,
  handleDragStartStep,
  handleDragOverStep,
  handleDropSteps,
  handleDragLeaveStep,
  setInitialModalData,
  handleMouseEnter,
  handleMouseLeave,
  handleAdd,
  hoverAdd,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      {rows.map((item: any, innerIndex: number) => (
        <div key={innerIndex + outerIndex} className="py-[3px]">
          <div
            className={`relative cursor-pointer row  ${
              item.RECETEALTASAMAID ? "chip" : ""
            } ${draggingIndexStep === innerIndex ? "dragging" : ""} ${
              hoveredIndexStep &&
              hoveredIndexStep === innerIndex &&
              hoveredIndex === outerIndex
                ? `hovered-step ${
                    hoveredIndexStep > draggingIndexStep ? "above" : "down"
                  }`
                : ""
            }`}
            draggable={editStep}
            onDragStart={() => {
              if (!editStep) return;
              handleDragStartStep(innerIndex, outerIndex);
            }}
            onDragOver={(e) => {
              if (!editStep) return;
              e.preventDefault();
              handleDragOverStep(innerIndex, outerIndex);
            }}
            onDoubleClick={() => {
              if (!editStep) return;
              setInitialModalData({
                ...item,
                index: innerIndex,
                outerIndex,
              });
            }}
            onDragLeave={handleDragLeaveStep}
            onDrop={() => {
              if (!editStep) return;
              handleDropSteps(innerIndex, outerIndex);
            }}
          >
            {item.RECETEALTASAMAID ? (
              <Divider>
                <Chip
                  label={
                    item?.new ? (
                      <input
                        type="text"
                        className="rounded-[8px] p-2 text-base font-medium"
                        placeholder={t("add") + " RECETEALTASAMAID"}
                      />
                    ) : (
                      <p className="p-2">
                        <span>{item.RECETEALTASAMAID}</span> Istek
                      </p>
                    )
                  }
                  size="small"
                />
              </Divider>
            ) : (
              <>
                <div
                  className="flex"
                  onDoubleClick={() => {
                    handleAdd(innerIndex, outerIndex, item);
                  }}
                >
                  <div className="cell flex items-center">
                    {editStep && <DragIndicatorIcon />}
                    <p>{item.SIRA}</p>
                  </div>
                  <div className="cell">
                    <p>{item.URUNID}</p>
                  </div>
                  <div className="cell">
                    <p>{item.RECETEID}</p>
                  </div>
                  <div className="cell">
                    <p>{item.URUNBIRIMID}</p>
                  </div>
                  <div className="cell">
                    <p>{item.RECETEDETAYID}</p>
                  </div>
                  <div className="cell">
                    <p>{item.RECETEALTASAMAID || "11a"}</p>
                  </div>
                  <div className="cell">
                    <p>{item.RECETEALTASAMAID || "11a"}</p>
                  </div>
                </div>
              </>
            )}
            <div
              className="absolute left-[-15px] bottom-[-6px] w-1/3 h-[17px] z-[2]"
              onMouseEnter={() => handleMouseEnter(innerIndex + outerIndex)}
              onMouseLeave={() => handleMouseLeave()}
            >
              {hoverAdd === innerIndex + outerIndex && (
                <div
                  className="absolute left-[0px] w-[20px] h-[20px] bottom-[-5px]"
                  onClick={() => handleAdd(innerIndex, outerIndex, item)}
                ></div>
              )}
            </div>
            {/* <div className="absolute left-0 top-0 w-full h-[8px] bg-red-500"></div> */}
            {hoverAdd === innerIndex + outerIndex && (
              <div className="w-full left-0 bottom-0">
                <div
                  className={`h-[3px] w-full absolute left-0 bg-[var(--primary)] z-[1] bottom-[-3px]`}
                ></div>

                <button
                  type="button"
                  onClick={() => handleAdd(innerIndex, outerIndex, item)}
                  className={`flex absolute z-[1] left-[-15px] w-[20px] h-[20px] bottom-[-11px]  items-center justify-center bg-[var(--primary)] rounded-[4px]`}
                >
                  <AddIcon style={{ color: "white", fontSize: "24px" }} />
                </button>
              </div>
            )}

            {/* 
            <div
              className={`group absolute top-0 w-full ${
                item.RECETEALTASAMAID ? "" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(innerIndex)}
              onMouseLeave={() => handleMouseLeave()}
            >
              {hoverAdd === innerIndex && (
                <div
                  className={`w-full h-full relative z-[2] ${
                    item.RECETEALTASAMAID ? "mt-[-12px] pb-[18px]" : ""
                  }`}
                >
                  <div
                    className={`h-[3px] w-full absolute left-0 bg-[var(--primary)] z-[90] ${
                      item.RECETEALTASAMAID ? "top-[12px]" : "top-[1px]"
                    }`}
                  ></div>
                  <button
                    type="button"
                    onClick={() => handleAdd(innerIndex, outerIndex, item)}
                    className={`group-hover:opacity-100 opacity-0 flex absolute z-[99] left-[-18px] w-[20px] h-[20px] bottom-[-5px]  items-center justify-center bg-[var(--primary)] rounded-[4px]`}
                  >
                    <AddIcon style={{ color: "white", fontSize: "24px" }} />
                  </button>
                </div>
              )}
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};
