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

export const Field = ({ obj = {}, searchDebounce = () => {} }: Props) => {
  return (
    <div>
      <>
        <Closer
          closeField={() => searchDebounce("", obj.id)}
          title={obj.title}
          id={obj?.id}
          close={obj?.close}
        />

        <SearchField
          searchDebounce={searchDebounce}
          colId={obj?.id}
          value={obj.value}
        />
      </>
    </div>
  );
};
