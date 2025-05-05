import { useRef, useState } from "react";
import ScrollView from "./ScrollView";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
interface Props {
  items: any;
  oldValues: any;
  setItems: (val: any) => void;
  editStep: any;
  setChanged: (val: boolean) => void;
  setImageView: (val: string) => void;
  setInitialModalData: (val: any) => void;
}

export const StepCard = ({
  oldValues = [],
  items = [],
  setItems = () => {},
  editStep = false,
  setChanged = () => {},
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

  const checkChanges = (newValues: any) => {
    let change = false;

    for (let i = 0; i < oldValues.length; i++) {
      const arr = oldValues[i];
      const newArr = newValues[i];
      if (arr.id !== newArr.id) {
        change = true;
        break;
      }
      for (let j = 0; j < arr.rows.length; j++) {
        const obj = arr.rows[j];
        const newObj = newArr.rows[j];

        if (obj.index !== newObj.index) {
          change = true;
          break;
        }
      }
    }

    setChanged(change);
  };

  const handleDrop = (index: number) => {
    const newItems = items;
    const [movedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, movedItem);

    setTimeout(() => {
      checkChanges(newItems);
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
      checkChanges(items);
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
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoverAdd(999);
  };

  const headerScrollRef: any = useRef(null);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 text-[var(--main)] sticky top-0 bg-white z-[90]">
        <div className="px-[8px] py-[6px]">
          <p>{t("image")}</p>
        </div>
        <div
          className="header col-span-2 ml-10 overflow-x-scroll remove-scroll"
          ref={headerScrollRef}
        >
          <div className="flex px-1">
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
          className={`w-full grid grid-cols-3 p-3 rounded-[12px] h-full text-indigo-700 font-medium relative ${
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
              maxScroll={maxScroll}
              scrollInterval={scrollInterval}
              setMaxScroll={setMaxScroll}
              currentScroll={currentScroll}
              setCurrentScroll={setCurrentScroll}
              headerScrollRef={headerScrollRef}
            />
          </div>
          <div className="bottom-[-12px] left-0 w-full h-[18px] group absolute">
            <button
              type="button"
              onClick={() => {}}
              className={`hidden group-hover:flex absolute z-[1] left-1/2 w-[20px] h-[20px] bottom-[-3px]  items-center justify-center bg-[var(--primary)] rounded-[4px]`}
            >
              <AddIcon style={{ color: "white", fontSize: "24px" }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
