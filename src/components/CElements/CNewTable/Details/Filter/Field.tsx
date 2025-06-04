import { useEffect, useState } from "react";
import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import { SearchField } from "./Search";

interface Props {
  sortData?: any;
  obj?: any;
  closeField?: () => void;
  searchDebounce?: (val: any, val2: any) => void;
  title?: string;
  id?: string;
  close?: any;
  addAndRemoveFilter?: (val: any) => void;
  handleKeyDown?: (val: any, val2: any, val3: any) => void;
}

const Closer = ({ closeField = () => {}, title, close = false }: Props) => {
  return (
    <div className="flex items-center mb-1 mt-3 space-x-1">
      {close ? (
        <button onClick={() => closeField()}>
          <CloseIcon width={22} fill="var(--black)" />
        </button>
      ) : (
        ""
      )}
      <p className="text-[12px]">{title}</p>
    </div>
  );
};

export const Field = ({
  obj = {},
  searchDebounce = () => {},
  handleKeyDown = () => {},
  addAndRemoveFilter = () => {},
}: Props) => {
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    if (obj.value && !currentValue.length) {
      setCurrentValue(obj.value);
    }
  }, [obj.value]);
  return (
    <div className="px-2">
      <Closer
        closeField={() => addAndRemoveFilter({ id: obj.id, value: "close" })}
        title={obj.title}
        id={obj?.id}
        close={obj?.close}
      />
      <SearchField
        searchDebounce={searchDebounce}
        colId={obj?.id}
        currentValue={currentValue}
        handleKeyDown={handleKeyDown}
        setCurrentValue={setCurrentValue}
      />

      {/* {obj.id === "DATE" ? (
        <CPeriodPicker />
      ) : (
       
      )} */}
    </div>
  );
};
