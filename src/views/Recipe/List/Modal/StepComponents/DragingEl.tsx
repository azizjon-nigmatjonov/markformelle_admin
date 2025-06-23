import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CheckLine } from "../../../../../components/UI/IconGenerator/Svg";
import { useRef, useState } from "react";

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
  handleAdd: (ind: number, outInd: number, item: any) => void;
  deleteStep: boolean;
  handleCheck: (val: any) => void;
  focusedIndex: number;
  handleKeyDown: (val: any, index: number) => void;
  stepRef: any;
  setFocusedIndex: (val: number) => void;
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
  handleAdd,
  deleteStep,
  handleCheck = () => {},
  focusedIndex,
  handleKeyDown,
  stepRef,
  setFocusedIndex,
}: Props) => {
  const timeoutRef = useRef<number | null>(null);
  const [hoverAdd, setHoverAdd] = useState(999);
  const handleMouseEnter = (ind: number) => {
    timeoutRef.current = window.setTimeout(() => {
      setHoverAdd(ind);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoverAdd(999);
  };

  return (
    <div>
      {rows?.map((item: { [key: string]: any }, innerIndex: number) => {
        return (
          <div key={innerIndex + outerIndex} className="py-[3px]">
            <div className="w-full">
              <div
                tabIndex={0}
                ref={(el) => {
                  if (el) {
                    stepRef.current[item.index] = el;
                  }
                }}
                className={`relative outline-none cursor-pointer row flex items-center w-full ${
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
                  setInitialModalData({
                    ...item,
                    index: innerIndex,
                    outerIndex,
                  });
                }}
                onClick={() => {
                  setFocusedIndex(item.index);
                }}
                onDragLeave={handleDragLeaveStep}
                onDrop={() => {
                  if (!editStep) return;
                  handleDropSteps(innerIndex, outerIndex);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, outerIndex);
                }}
              >
                {deleteStep && (
                  <div
                    onClick={() => {
                      item.checked = !item?.checked;
                      handleCheck(item);
                    }}
                    className={`w-[18px] mr-2 h-[18px] border  border-[var(--main)] rounded-[4px] ml-2 hover:cursor-pointer flex items-center justify-center ${
                      item.checked ? "bg-[var(--main)]" : ""
                    }`}
                  >
                    <div className="w-[18px]">
                      {item.checked && <CheckLine fill="white" />}
                    </div>
                  </div>
                )}
                {item.RECETEASAMAID ? (
                  <div
                    className={`duration-300 rounded-[8px] w-full  ${
                      focusedIndex === item.index ? "ripple-effect" : ""
                    }`}
                    style={{
                      backgroundColor:
                        focusedIndex === item.index ? "" : item.bg,
                    }}
                  >
                    <div className="text-center p-2 rounded-[8px] relative z-[2] h-full">
                      <p>{item.RECETEASAMAADI}</p>
                      <p
                        className="absolute top-0 left-0 text-center h-full items-center justify-center flex px-2"
                        style={{
                          minWidth: headColumns[0]?.width,
                        }}
                      >
                        {item.SIRA}
                      </p>
                    </div>
                  </div>
                ) : item.RECETEALTASAMAID ? (
                  <div className={`w-full relative flex`}>
                    <div className="flex items-center">
                      <div className="pr-2">
                        <p
                          className={`text-center py-1 rounded-full duration-200 w-[45px] relative bg-blue-200 z-[2] h-full ${
                            focusedIndex === item.index ? "bg-blue-300" : ""
                          }`}
                        >
                          {item.SIRA}
                        </p>
                      </div>
                      <div
                        className={`bg-blue-300 duration-200 w-full h-[2px] ${
                          focusedIndex === item.index ? "bg-blue-400" : ""
                        }`}
                      ></div>
                    </div>
                    <div className="flex items-center w-full">
                      <div
                        className={`bg-blue-300 duration-200 w-full h-[2px] ${
                          focusedIndex === item.index ? "bg-blue-400" : ""
                        }`}
                      ></div>
                      <div className="px-2">
                        <p
                          className={`text-center py-1 rounded-full duration-200 whitespace-nowrap min-w-[140px] relative bg-blue-200 z-[2] h-full ${
                            focusedIndex === item.index
                              ? "bg-blue-300 min-w-[200px]"
                              : ""
                          }`}
                        >
                          {item.RECETEALTASAMAADI}
                        </p>
                      </div>
                      <div
                        className={`bg-blue-300 duration-200 w-full h-[2px] ${
                          focusedIndex === item.index ? "bg-blue-400" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex rounded-[8px] w-full ${
                      focusedIndex === item.index ? "ripple-effect" : ""
                    }`}
                    onDoubleClick={() => {
                      handleAdd(innerIndex, outerIndex, item);
                    }}
                  >
                    {headColumns.map(
                      (
                        column: {
                          id: string;
                          width: number;
                          render: (val: string) => string;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          style={{
                            minWidth: column?.width,
                            maxWidth: column?.width,
                          }}
                          className="cell flex items-center relative z-[2] overflow-hidden"
                        >
                          {editStep && index === 0 && <DragIndicatorIcon />}
                          {column?.render ? (
                            column?.render(item[column.id])
                          ) : (
                            <p style={{ minWidth: column?.width }}>
                              {item[column.id]}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
                {!deleteStep && (
                  <div
                    className="absolute left-[-15px] bottom-[-6px] w-full h-[17px] z-[2]"
                    onMouseEnter={() => {
                      if (editStep) {
                        handleMouseEnter(innerIndex);
                        return;
                      }
                      handleMouseEnter(999);
                    }}
                    onMouseLeave={() => {
                      if (!editStep) return;
                      handleMouseLeave();
                    }}
                  >
                    {hoverAdd === innerIndex && (
                      <div
                        className="absolute left-[0px] w-[20px] h-[20px] bottom-[-5px]"
                        onClick={() => handleAdd(innerIndex, outerIndex, item)}
                      ></div>
                    )}
                  </div>
                )}

                {hoverAdd === innerIndex && (
                  <div className="w-full absolute left-0 bottom-0">
                    <div
                      className={`h-[3px] w-full absolute left-0 bg-[var(--primary)] z-[1] ${
                        item.RECETEALTASAMAID ? "bottom-[2px]" : "bottom-[-5px]"
                      }`}
                    ></div>

                    <button
                      type="button"
                      onClick={() => handleAdd(innerIndex, outerIndex, item)}
                      className={`flex absolute z-[1] left-[-15px] w-[20px] h-[20px] items-center justify-center bg-[var(--primary)] rounded-[4px] ${
                        item.RECETEALTASAMAID
                          ? "bottom-[-6px]"
                          : "bottom-[-13px]"
                      }`}
                    >
                      <AddIcon style={{ color: "white", fontSize: "24px" }} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
