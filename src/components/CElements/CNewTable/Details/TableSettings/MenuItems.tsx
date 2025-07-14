import { useState } from "react";
import CCheckbox from "../../../../CElements/CCheckbox";
import { DragIcon } from "../../../../UI/IconGenerator/Svg";
import "./MenuItems.scss";

const CheckBox = ({
  element,
  defaultValue,
  handleFilterSave,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  index,
}: {
  defaultValue: any;
  element: any;
  handleFilterSave: (val: any) => void;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  onDragLeave?: () => void;
  index?: number;
}) => {
  const [checked, setChecked] = useState(defaultValue);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, index || 0)}
      onDragOver={(e) => onDragOver?.(e, index || 0)}
      onDrop={(e) => onDrop?.(e, index || 0)}
      onDragLeave={onDragLeave}
      className={`draggable-item flex items-center justify-between rounded p-1 ${
        isDragging ? "dragging drag-and-drop" : ""
      }`}
    >
      <CCheckbox
        element={{ label: element.title || element.id }}
        checked={checked}
        handleCheck={() => {
          handleFilterSave(element.id);
          setChecked((prev: boolean) => !prev);
        }}
      />
      <div className="flex items-center drag-icon">
        <DragIcon fill="var(--gray)" width={14} />
      </div>
    </div>
  );
};

const CheckBoxList = ({
  list,
  handleFilterSave,
  onReorder,
}: {
  list: any;
  handleFilterSave: (val: any) => void;
  onReorder?: (newList: any[]) => void;
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const newList = [...list];
      const [movedItem] = newList.splice(draggedIndex, 1);
      newList.splice(index, 0, movedItem);
      onReorder?.(newList);
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      {list.map((item: any, index: number) => (
        <div
          key={index}
          className={`drag-drop-zone ${
            hoveredIndex === index &&
            draggedIndex !== null &&
            hoveredIndex > draggedIndex
              ? "drag-hovered right"
              : hoveredIndex === index &&
                draggedIndex !== null &&
                hoveredIndex < draggedIndex
              ? "drag-hovered left"
              : ""
          }`}
        >
          <CheckBox
            element={item}
            defaultValue={item.checked}
            handleFilterSave={handleFilterSave}
            isDragging={draggedIndex === index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export const MenuItem = ({
  element,
  allCheck = false,
  handleFilterSave,
  onReorder,
}: {
  element: any;
  allCheck: boolean;
  handleFilterSave: (val: any) => void;
  onReorder?: (newList: any[]) => void;
}) => {
  const GetUi = (el: any) => {
    switch (el.type) {
      case "checkbox":
        return (
          <CheckBoxList
            list={el.data}
            handleFilterSave={handleFilterSave}
            onReorder={onReorder}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <li className="w-[240px]">
      <div className="mb-2 flex justify-between w-full items-center pr-1">
        <span>{element.label}</span>
        <div>
          <CCheckbox
            checked={allCheck}
            handleCheck={() => {
              handleFilterSave("all");
            }}
          />
        </div>
      </div>
      <>{GetUi(element)}</>
    </li>
  );
};
