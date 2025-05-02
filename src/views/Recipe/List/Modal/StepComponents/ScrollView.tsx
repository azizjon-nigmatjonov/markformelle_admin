import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Chip, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
  t?: (key: string) => string; // for translation
  hoverAdd: number;
  headerScrollRef: any;
}

const ScrollView = ({
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
  headerScrollRef,
  t = (key) => key, // default dummy translator
}: Props) => {
  const ScrollBody = useRef<HTMLDivElement>(null);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const scroll = (left: boolean) => {
    const container = ScrollBody.current;
    if (!container) return;

    const visibleDivWidth = container.clientWidth;
    const scrollAmount = left ? visibleDivWidth / 2 : -(visibleDivWidth / 2);
    // containerHeader.scrollBy({ left: 0, behavior: "smooth" });

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setCurrentScroll(container.scrollLeft + scrollAmount);
  };

  useEffect(() => {
    const containerHeader = headerScrollRef.current;
    if (containerHeader) {
      containerHeader.scrollBy({ left: currentScroll, behavior: "smooth" });
    }
  }, [currentScroll]);

  useEffect(() => {
    const container = ScrollBody.current;
    if (container) {
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, []);

  const startScrolling = (left: boolean) => {
    stopScrolling(); // Clear any existing interval
    scrollInterval.current = setInterval(() => scroll(left), 150); // 30ms interval
  };

  // Stop the scrolling
  const stopScrolling = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  return (
    <div className="group relative">
      <div
        ref={ScrollBody}
        className="flex items-start overflow-x-scroll remove-scroll py-2 pl-7"
      >
        <div className="body">
          {rows.map((item: any, innerIndex: number) => (
            <div
              key={innerIndex}
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
              className={`relative cursor-pointer row ${
                hoveredIndexStep &&
                hoveredIndexStep === innerIndex &&
                hoveredIndex === outerIndex
                  ? `hovered-step ${
                      hoveredIndexStep > draggingIndexStep ? "above" : "down"
                    }`
                  : ""
              }`}
            >
              {item.RECETEALTASAMAID ? (
                <div className="">
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
                <>
                  <div className="flex">
                    <div className="cell">
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
                className={`group h-[7px] w-full bg-yellow-500 ${
                  item.RECETEALTASAMAID ? "mt-[-12px] pb-[18px]" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(innerIndex)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {hoverAdd === innerIndex && (
                  <div
                    className={`hover-trigger w-full h-full bg-red-500 ml-[-10px] relative z-[2] ${
                      item.RECETEALTASAMAID ? "mt-[-12px] pb-[18px]" : ""
                    }`}
                  >
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleAdd(innerIndex, outerIndex, item)}
                      className={`group-hover:opacity-100 opacity-0 flex absolute z-[99] left-[-18px] w-[20px] h-[20px] bottom-[-5px]  items-center justify-center bg-[var(--primary)] rounded-[4px]`}
                    >
                      <AddIcon style={{ color: "white", fontSize: "24px" }} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Scroll Left */}
      {/* Scroll Right */}
      {/* currentScroll > 0 */}
      {currentScroll > 0 && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[40px] flex items-center"
          style={{ boxShadow: "inset 8px 0 8px -8px rgba(0,0,0,0.3)" }}
        >
          <button
            type="button"
            className=" text-white w-full h-[40px] bg-red-500 rounded-[12px] flex items-center justify-center"
            onMouseEnter={() => startScrolling(false)}
            onMouseLeave={stopScrolling}
          >
            <ArrowBackIosIcon />
          </button>
        </div>
      )}

      {maxScroll > currentScroll && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-[40px] flex items-center"
          style={{ boxShadow: "inset -8px 0 8px -8px rgba(0, 0, 0, 0.3)" }}
        >
          <button
            type="button"
            className=" text-white w-full h-[40px] bg-red-500 rounded-[12px] flex items-center justify-center"
            onMouseEnter={() => startScrolling(true)} // Start right scroll
            onMouseLeave={stopScrolling}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollView;
