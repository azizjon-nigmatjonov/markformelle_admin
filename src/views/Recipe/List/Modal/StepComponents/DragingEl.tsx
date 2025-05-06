import { Chip, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CheckLine } from "../../../../../components/UI/IconGenerator/Svg";

interface Props {
  rows: any[];
  headColumns: any;
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
  deleteStep: boolean;
  handleCheck: (val: any) => void;
}

export const DragingEl = ({
  rows = [],
  headColumns = [],
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
  deleteStep,
  handleCheck = () => {},
}: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      {rows.map((item: any, innerIndex: number) => (
        <div key={innerIndex + outerIndex} className="py-[3px]">
          <div className="w-full">
            <div
              className={`relative cursor-pointer row flex items-center w-full ${
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
              {deleteStep && (
                <div
                  onClick={() => {
                    item.checked = !item?.checked;
                    handleCheck(item);
                  }}
                  className="w-[18px] h-[18px] border border-[var(--main)] rounded-[4px] ml-2 hover:cursor-pointer"
                >
                  <div className="w-[18px]">
                    {item.checked && <CheckLine fill="var(--main)" />}
                  </div>
                </div>
              )}
              {item.RECETEALTASAMAID ? (
                <div className="w-full">
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
                </div>
              ) : (
                <div
                  className="flex"
                  onDoubleClick={() => {
                    handleAdd(innerIndex, outerIndex, item);
                  }}
                >
                  {headColumns.map((column: any, index: number) => (
                    <div key={index} className="cell flex items-center">
                      {editStep && index === 0 && <DragIndicatorIcon />}

                      <p>{item[column.id]}</p>
                    </div>
                  ))}
                </div>
              )}
              {!deleteStep && (
                <div
                  className="absolute left-[-15px] bottom-[-6px] w-full h-[17px] z-[2]"
                  onMouseEnter={() => handleMouseEnter(innerIndex + item.SIRA)}
                  onMouseLeave={() => handleMouseLeave()}
                  onDoubleClick={() => {
                    if (!editStep) return;
                    setInitialModalData({
                      ...item,
                      index: innerIndex,
                      outerIndex,
                    });
                  }}
                >
                  {hoverAdd === innerIndex + item.SIRA && (
                    <div
                      className="absolute left-[0px] w-[20px] h-[20px] bottom-[-5px]"
                      onClick={() => handleAdd(innerIndex, outerIndex, item)}
                    ></div>
                  )}
                </div>
              )}
              {hoverAdd === innerIndex + item.SIRA && (
                <div className="w-full left-0 bottom-0">
                  <div
                    className={`h-[3px] w-full absolute left-0 bg-[var(--primary)] z-[1] ${
                      item.RECETEALTASAMAID
                        ? "bottom-[-4.4px]"
                        : "bottom-[-5px]"
                    }`}
                  ></div>

                  <button
                    type="button"
                    onClick={() => handleAdd(innerIndex, outerIndex, item)}
                    className={`flex absolute z-[1] left-[-15px] w-[20px] h-[20px] bottom-[-13px] items-center justify-center bg-[var(--primary)] rounded-[4px]`}
                  >
                    <AddIcon style={{ color: "white", fontSize: "24px" }} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
