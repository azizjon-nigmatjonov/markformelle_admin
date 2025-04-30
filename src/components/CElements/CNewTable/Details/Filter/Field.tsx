import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import { CPeriodPicker } from "../../../CPeriodPicker";
import { SearchField } from "./Search";

interface Props {
  sortData?: any;
  obj?: any;
  closeField?: () => void;
  searchDebounce?: (val: any, val2: any) => void;
  title?: string;
  id?: string;
  close?: any;
  handleKeyDown?: (val: {}) => void;
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
}: Props) => {
  return (
    <div className="px-2">
      <Closer
        closeField={() => searchDebounce("", obj.id)}
        title={obj.title}
        id={obj?.id}
        close={obj?.close}
      />

      {obj.id === "DATE" ? (
        <CPeriodPicker handleValue={() => {}} />
      ) : (
        <SearchField
          searchDebounce={searchDebounce}
          colId={obj?.id}
          value={obj.value}
          handleKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};
