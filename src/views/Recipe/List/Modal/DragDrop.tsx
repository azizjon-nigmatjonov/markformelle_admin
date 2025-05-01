import { useEffect, useState } from "react";
import { StokeDeteyContantList } from "../../../../constants/stokedetey";
import { Chip, Divider, Tooltip } from "@mui/material";
import { ImageViewer } from "../../../../components/UI/ImageViewer";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { StepModal } from "./StepComponents/StepModal";
import { EditIcon } from "../../../../components/UI/IconGenerator/Svg";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const DragDrop = () => {
  const { t } = useTranslation();
  const [initialModalData, setInitialModalData] = useState({});
  const [draggingIndex, setDraggingIndex]: any = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndexStep, setDraggingIndexStep]: any = useState(null);
  const [hoveredIndexStep, setHoveredIndexStep] = useState<number | null | any>(
    null
  );
  const [imageView, setImageView] = useState("");
  const [items, setItems]: any = useState([]);
  useEffect(() => {
    const objects: any = {};
    let lastId = "";
    for (let i = 0; i < StokeDeteyContantList.length; i++) {
      const obj = StokeDeteyContantList[i];
      if (obj.RECETEASAMAID) lastId = "" + obj.RECETEASAMAID;

      if (lastId in objects && !obj.RECETEASAMAID) {
        objects[lastId].rows.push(obj);
      } else {
        objects[obj.RECETEASAMAID] = {
          rows: [obj],
          id: obj.RECETEASAMAID,
          image: "/images/test/test1.png",
          bg: i === 0 ? "bg-blue-100" : i < 2 ? "bg-lime-100" : "bg-indigo-100",
        };
      }
    }
    setItems(Object.values(objects));
  }, []);

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

  const [editStep, setEditStep] = useState(false);

  return (
    <div className="cdraganddrop">
      <div className="flex justify-end mb-3">
        <div>
          <button
            onClick={() => setEditStep((prev) => !prev)}
            type="button"
            className={`custom-btn ${editStep ? "save" : ""} space-x-2`}
          >
            <EditIcon />
            <span>{t(!editStep ? "edit" : "save")}</span>
          </button>
        </div>
      </div>
      <div className="space-y-3">
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
              <div className="sticky top-0">
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
            <div className="w-full col-span-2 pl-7 relative">
              <div>
                {row.rows.map((item: any, innerIndex: number) => (
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
                    className={`relative cursor-pointer ${
                      hoveredIndexStep &&
                      hoveredIndexStep === innerIndex &&
                      hoveredIndex === outerIndex
                        ? `hovered-step ${
                            hoveredIndexStep > draggingIndexStep
                              ? "above"
                              : "down"
                          }`
                        : ""
                    }`}
                  >
                    <div>
                      {item.RECETEALTASAMAID ? (
                        <div className="cursor-pointer">
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
                          <div className="w-full rounded-[8px] flex whitespace-nowrap row">
                            <div className="cell">
                              <p>{item.SIRA}</p>
                            </div>
                            <div className="cell relative">
                              <p>{item.URUNID}</p>
                            </div>
                            <div className="cell relative">
                              <p>{item.RECETEID}</p>
                            </div>
                            <div className="cell relative">
                              <p>{item.URUNBIRIMID}</p>
                            </div>
                            <div className="cell relative">
                              <p>{item.RECETEDETAYID}</p>
                            </div>
                            <div className="cell cursor-pointer">
                              <p>{item.RECETEALTASAMAID}</p>
                            </div>
                            <div className="cell cursor-pointer">
                              <p>{item.SIRA}</p>
                            </div>
                            <div className="cell relative cursor-pointer">
                              <p>{item.URUNID}</p>
                            </div>
                            <div className="cell cursor-pointer">
                              <p>{item.SIRA}</p>
                            </div>
                            <div className="cell relative cursor-pointer">
                              <p>{item.URUNID}</p>
                            </div>
                            <div className="cell relative">
                              <p>{item.RECETEID}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="group h-[6px] w-full hover-trigger ml-[-3px]">
                      <button
                        type="button"
                        onClick={() => handleAdd(innerIndex, outerIndex, item)}
                        className={`opacity-0 group-hover:opacity-100 flex duration-200 absolute z-[99] left-[-20px] w-[20px] h-[20px] bottom-[-10px]  items-center justify-center bg-[var(--primary)] rounded-[4px]`}
                      >
                        <AddIcon style={{ color: "white", fontSize: "24px" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />

      <StepModal
        defaultData={initialModalData}
        setDefaultData={setInitialModalData}
      />
    </div>
  );
};
