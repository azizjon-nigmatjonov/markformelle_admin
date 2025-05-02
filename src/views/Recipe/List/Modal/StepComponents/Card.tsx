import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollView from "./ScrollView";
interface Props {
  items: any;
  setItems: (val: any) => void;
  editStep: any;
  setImageView: (val: string) => void;
  setInitialModalData: (val: any) => void;
}

export const StepCard = ({
  items = [],
  setItems = () => {},
  editStep = false,
  setImageView = () => {},
  setInitialModalData = () => {},
}: Props) => {
  const { t } = useTranslation();
  const [draggingIndex, setDraggingIndex]: any = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndexStep, setDraggingIndexStep]: any = useState(null);
  const [hoveredIndexStep, setHoveredIndexStep] = useState<number | null | any>(
    null
  );
  const timeoutRef = useRef<number | null>(null);
  const [hoverAdd, setHoverAdd] = useState(999);

  const handleDrop = (index: number) => {
    const newItems = items;
    const [movedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, movedItem);

    setTimeout(() => {
      setItems(newItems);
      setDraggingIndex(null);
      setHoveredIndex(null);
    }, 100);
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const handleDropSteps = (index: number, outerIndex: number) => {
    const newItems = items[outerIndex].rows;

    const [movedItem] = newItems.splice(draggingIndexStep, 1);
    newItems.splice(index, 0, movedItem);
    items[outerIndex].rows = newItems;
    setTimeout(() => {
      setItems(items);
      setDraggingIndexStep(null);
      setHoveredIndexStep(null);
    }, 100);
  };

  const handleDragStartStep = (index: number, outerIndex: number) => {
    setDraggingIndexStep(index);
    setHoveredIndex(outerIndex);
  };

  const handleDragOverStep = (index: number, outerIndex: number) => {
    setHoveredIndexStep(index);
    setHoveredIndex(outerIndex);
  };

  const handleDragLeaveStep = () => {
    setHoveredIndexStep(null);
    setHoveredIndex(null);
  };

  const handleAdd = (
    index: number,
    outerIndex: number,
    item: { RECETEALTASAMAID: string }
  ) => {
    setInitialModalData({ ...item, index, outerIndex });
  };

  const handleMouseEnter = (ind: number) => {
    timeoutRef.current = window.setTimeout(() => {
      setHoverAdd(ind);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoverAdd(999);
  };

  const headerScrollRef: any = useRef(null);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 text-[var(--main)] sticky top-0 bg-white border-b border-[var(--gray30)] z-[99]">
        <div className="px-[8px] py-[6px]">
          <p>Image</p>
        </div>
        <div
          className="header col-span-2 ml-7 overflow-x-scroll remove-scroll"
          ref={headerScrollRef}
        >
          <div className="row flex">
            <div className="cell">
              <p>Recete Asama Kodu</p>
            </div>
            <div className="cell">
              <p>Recete Asama Adi</p>
            </div>
            <div className="cell">
              <p>Alt Asama Kodu</p>
            </div>
            <div className="cell">
              <p>Alt Asama Adi</p>
            </div>
            <div className="cell">
              <p>Urun Adi</p>
            </div>
            <div className="cell">
              <p>Urun kodu</p>
            </div>
            <div className="cell">
              <p>Urun kodu</p>
            </div>
          </div>
        </div>
      </div>
      {items.map((row: any, outerIndex: number) => (
        <div
          key={outerIndex}
          draggable={editStep}
          onDragStart={() => {
            if (!editStep) return;
            handleDragStart(outerIndex);
          }}
          onDragOver={(e) => {
            if (!editStep) return;
            e.preventDefault();
            handleDragOver(outerIndex);
          }}
          onDragLeave={handleDragLeave}
          onDrop={() => {
            if (!editStep) return;
            handleDrop(outerIndex);
          }}
          className={`w-full grid grid-cols-3 p-3 rounded-[12px] h-full text-indigo-700 font-medium ${
            hoveredIndex === outerIndex && !hoveredIndexStep
              ? "hovered-card"
              : ""
          } ${row.bg}`}
        >
          <div>
            <div className="sticky top-[40px]">
              <h1 className="text-[45px] font-semibold py-2 text-center leading-[35px]">
                {row.id}
              </h1>
              <div
                className="cursor-pointer mt-5"
                onClick={() => setImageView(row.image)}
              >
                <img src={row.image} alt="Main" className="w-full h-auto" />
              </div>
            </div>
          </div>
          <div className="col-span-2 pl-3">
            <ScrollView
              rows={row?.rows ?? []}
              editStep={editStep}
              handleDragStartStep={handleDragStartStep}
              handleDragOverStep={handleDragOverStep}
              setInitialModalData={setInitialModalData}
              handleDropSteps={handleDropSteps}
              hoveredIndexStep={hoveredIndexStep}
              hoveredIndex={hoveredIndex}
              outerIndex={outerIndex}
              hoverAdd={hoverAdd}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              draggingIndexStep={draggingIndexStep}
              handleDragLeaveStep={handleDragLeaveStep}
              handleAdd={handleAdd}
              headerScrollRef={headerScrollRef}
              t={t}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
