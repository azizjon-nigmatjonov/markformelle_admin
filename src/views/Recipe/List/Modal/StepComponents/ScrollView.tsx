import { useEffect, useRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DragingEl } from "./DragingEl";
interface Props {
  rows: any[];
  headColumns: any[];
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
  setMaxScroll: (val: number) => void;
  setCurrentScroll: (val: number) => void;
  headerScrollRef: React.RefObject<HTMLDivElement>;
  currentScroll: number;
  scrollInterval: any;
  maxScroll: number;
  deleteStep: boolean;
  focusedIndex: number;
  handleCheck: (val: any) => void;
  handleKeyDown: (val: any, index: number) => void;
  stepRef: any;
  setFocusedIndex: (val: number) => void;
  handleAddCard: () => void;
}

const ScrollView = ({
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
  currentScroll,
  setCurrentScroll = () => {},
  headerScrollRef,
  scrollInterval,
  setMaxScroll,
  maxScroll,
  deleteStep = false,
  handleCheck = () => {},
  focusedIndex,
  handleKeyDown,
  stepRef,
  setFocusedIndex,
  handleAddCard = () => {},
}: Props) => {
  const ScrollBody = useRef<HTMLDivElement>(null);

  const scroll = (left: boolean) => {
    const container = headerScrollRef.current;
    const bodyContainer = ScrollBody.current;
    if (!container || !bodyContainer) return;

    const visibleDivWidth = bodyContainer.clientWidth;
    const scrollAmount = left ? visibleDivWidth : -visibleDivWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setCurrentScroll(container.scrollLeft + scrollAmount);
  };

  useEffect(() => {
    const containerHeader = ScrollBody.current;
    if (containerHeader) {
      containerHeader.scrollBy({ left: currentScroll, behavior: "smooth" });
    }
  }, [currentScroll]);

  useEffect(() => {
    const container = ScrollBody.current;
    if (container) {
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, [headColumns.length]);

  const startScrolling = (left: boolean) => {
    stopScrolling();
    scrollInterval.current = setInterval(() => scroll(left), 150);
  };

  const stopScrolling = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  return (
    <div className="group relative w-full">
      <div
        ref={ScrollBody}
        className="flex items-start overflow-x-scroll remove-scroll py-2 pb-3 pl-5 w-full"
      >
        <div className="body w-full">
          <DragingEl
            rows={rows}
            headColumns={headColumns}
            editStep={editStep}
            handleDragStartStep={handleDragStartStep}
            handleDragOverStep={handleDragOverStep}
            setInitialModalData={setInitialModalData}
            handleDropSteps={handleDropSteps}
            hoveredIndexStep={hoveredIndexStep}
            hoveredIndex={hoveredIndex}
            outerIndex={outerIndex}
            draggingIndexStep={draggingIndexStep}
            handleDragLeaveStep={handleDragLeaveStep}
            deleteStep={deleteStep}
            focusedIndex={focusedIndex}
            handleKeyDown={handleKeyDown}
            handleCheck={handleCheck}
            stepRef={stepRef}
            setFocusedIndex={setFocusedIndex}
            headerScrollRef={headerScrollRef}
            handleAddCard={handleAddCard}
          />
        </div>
      </div>

      {currentScroll > 0 && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-full z-[10] w-[40px] flex items-center"
          style={{ boxShadow: "inset 8px 0 8px -8px rgba(0,0,0,0.3)" }}
        >
          <button
            type="button"
            className=" text-white w-[25px] h-[80px] bg-black bg-opacity-40 rounded-r-[12px] flex items-center justify-center"
            onMouseEnter={() => startScrolling(false)}
            onMouseLeave={stopScrolling}
          >
            <ArrowBackIosIcon />
          </button>
        </div>
      )}

      {maxScroll > currentScroll && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-full z-[10] w-[40px] flex items-center justify-end"
          style={{ boxShadow: "inset -8px 0 8px -8px rgba(0, 0, 0, 0.3)" }}
        >
          <button
            type="button"
            className=" text-white w-[25px] h-[80px] bg-black bg-opacity-40 rounded-l-[12px] flex items-center justify-center"
            onMouseEnter={() => startScrolling(true)}
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
