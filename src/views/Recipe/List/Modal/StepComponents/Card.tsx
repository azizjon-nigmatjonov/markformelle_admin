import { useEffect, useRef, useState } from "react";
import ScrollView from "./ScrollView";
import AddIcon from "@mui/icons-material/Add";
import { CardHeader } from "./CardHeader";
import { DeleteIcon } from "../../../../../components/UI/IconGenerator/Svg";
import { Button } from "@mui/material";
import { MaterialForm } from "../MaterialForm";
import { TrailForm } from "../TrailForm";
import { DetailForm } from "../DetailForm";
interface Props {
  items: any;
  oldValues: any;
  headColumns: any;
  setItems: (val: any) => void;
  editStep: any;
  deleteCardActive: boolean;
  deleteStep: boolean;
  setChanged: (val: string) => void;
  setImageView: (val: string) => void;
  setInitialModalData: (val: any) => void;
  checkedList: any;
  handleCheck: (val: any) => void;
  setDeleteCard: (val: any) => void;
  open: string[];
  setOpen: (val: any) => void;
}

export const StepCard = ({
  open,
  setOpen,
  oldValues = [],
  items = [],
  headColumns = [],
  setItems = () => {},
  deleteStep = false,
  editStep = false,
  deleteCardActive = false,
  setChanged = () => {},
  setImageView = () => {},
  checkedList = [],
  handleCheck = () => {},
  setDeleteCard = () => {},
  setInitialModalData = () => {},
}: Props) => {
  const [draggingIndex, setDraggingIndex]: any = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndexStep, setDraggingIndexStep]: any = useState(null);
  const [hoveredIndexStep, setHoveredIndexStep] = useState<number | null | any>(
    null
  );
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState(false);
  const headerScrollRef: any = useRef(null);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const [newColumns, setNewColumns] = useState([]);

  useEffect(() => {
    setNewColumns(headColumns);
  }, [headColumns]);

  const checkChanges = (newValues: any) => {
    let change = "";

    for (let i = 0; i < oldValues.length; i++) {
      const arr = oldValues[i];
      const newArr = newValues[i];
      if (arr.id !== newArr.id) {
        change = "order";
        break;
      }
      for (let j = 0; j < arr.rows.length; j++) {
        const obj = arr.rows[j];
        const newObj = newArr.rows[j];

        if (obj.index !== newObj.index) {
          change = "order";
          break;
        }
      }
    }

    setChanged(change);
  };

  const handleDrop = (index: number) => {
    const newItems = JSON.parse(JSON.stringify(items));

    const [movedItem] = newItems?.splice(draggingIndex, 1);
    newItems.splice(index, 0, movedItem);

    setTimeout(() => {
      // checkChanges(newItems);
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

  const handleAddCard = (outerIndex: number) => {
    setInitialModalData({ outerIndex, type: "card_add" });
  };

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (event: any) => {
    console.log("2222");

    setIsFocused(true);
    setTimeout(() => {
      setIsFocused(false);
    }, 5000);
    if (event.key === "ArrowUp") {
      setFocusedIndex(focusedIndex < 1 ? 0 : focusedIndex - 1);
    } else if (event.key === "ArrowDown") {
      setFocusedIndex(
        focusedIndex >=
          items?.[items.length - 1]?.rows[
            items?.[items.length - 1]?.rows.length - 1
          ].index
          ? focusedIndex
          : focusedIndex + 1
      );
    }
  };

  useEffect(() => {
    if (rowRefs.current[focusedIndex]) {
      rowRefs.current[focusedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  return (
    <div>
      <CardHeader headColumns={newColumns} headerScrollRef={headerScrollRef} />
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
          className={`w-full grid grid-cols-4 rounded-[12px] py-3 h-full text-indigo-700 font-medium relative mb-5 shadow-md ${
            hoveredIndex === outerIndex && !hoveredIndexStep
              ? "hovered-card"
              : ""
          } ${row.bg}`}
        >
          <div className="col-span-3">
            <ScrollView
              rows={row?.rows ?? []}
              editStep={editStep}
              handleDragStartStep={handleDragStartStep}
              handleDragOverStep={handleDragOverStep}
              setInitialModalData={(obj: any) => {
                setOpen(["card", "material"]);
                setInitialModalData(obj);
              }}
              isFocused={isFocused}
              handleDropSteps={handleDropSteps}
              hoveredIndexStep={hoveredIndexStep}
              hoveredIndex={hoveredIndex}
              outerIndex={outerIndex}
              draggingIndexStep={draggingIndexStep}
              handleDragLeaveStep={handleDragLeaveStep}
              handleAdd={handleAdd}
              maxScroll={maxScroll}
              headColumns={newColumns}
              deleteStep={deleteStep}
              scrollInterval={scrollInterval}
              setMaxScroll={setMaxScroll}
              currentScroll={currentScroll}
              setCurrentScroll={setCurrentScroll}
              headerScrollRef={headerScrollRef}
              checkedList={checkedList}
              handleCheck={handleCheck}
              focusedIndex={focusedIndex}
              handleKeyDown={handleKeyDown}
            />
          </div>
          <div className="relative">
            <div className="sticky top-[40px] flex flex-col items-center">
              <h1 className="text-6xl font-semibold text-center">{row.id}</h1>
              <div
                className="cursor-pointer w-[80%]"
                onClick={() => setImageView(row.image)}
              >
                <img
                  src={row.image}
                  alt="Main"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              {deleteCardActive && (
                <div className="absolute right-2 top-1">
                  <Button type="button" onClick={() => setDeleteCard(row.id)}>
                    <DeleteIcon width={26} />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* {!editStep && (
            <div
              onClick={() => handleAddCard(outerIndex)}
              className="bottom-[-16px] left-0 w-full h-[18px] group absolute flex items-center justify-around"
            >
              <div className="hidden group-hover:flex bg-[var(--primary)] h-[4px] w-[48%] mt-1.5 rounded-full"></div>
              <button
                type="button"
                onClick={() => {}}
                className={`hidden group-hover:flex absolute z-[1] left-1/2 w-[20px] h-[20px] bottom-[-3px]  items-center justify-center bg-[var(--primary)] rounded-[4px]`}
              >
                <AddIcon style={{ color: "white", fontSize: "24px" }} />
              </button>
              <div className="hidden group-hover:flex bg-[var(--primary)] h-[4px] w-[46.86%] mt-1.5 rounded-full"></div>
            </div>
          )} */}
        </div>
      ))}

      {open.includes("material") && (
        <MaterialForm onClose={() => setOpen(["card"])} />
      )}
      {open.includes("trail") && (
        <TrailForm
          onClose={() => setOpen(["card"])}
          handleActionsDetails={() => {
            setOpen(["card", "detail"]);
          }}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          disabled={false}
          setOpen={setOpen}
        />
      )}
      {open.includes("detail") && <DetailForm onClose={() => setOpen("")} />}
    </div>
  );
};
