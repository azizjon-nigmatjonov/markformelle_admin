import { CheckLine } from "../../../../../components/UI/IconGenerator/Svg";

interface Props {
  headerScrollRef: any;
  headColumns: any;
  deleteStep: boolean;
  selectAll?: boolean;
  onSelectAll?: () => void;
}

export const CardHeader = ({
  headerScrollRef,
  headColumns = [],
  deleteStep = false,
  selectAll = false,
  onSelectAll = () => {},
}: Props) => {
  return (
    <div className="grid grid-cols-4 border-t border-[var(--border)] text-[var(--main)] sticky top-[-7px] bg-white z-[90] font-medium">
      <div
        className="header col-span-3 pl-3 overflow-x-scroll remove-scroll"
        ref={headerScrollRef}
      >
        <div className="flex px-1 items-center">
          {deleteStep && (
            <div
              onClick={() => {
                onSelectAll();
              }}
              className={`w-[18px] mr-2 h-[18px] border  border-[var(--main)] rounded-[4px] ml-3 hover:cursor-pointer flex items-center justify-center ${
                selectAll ? "bg-[var(--main)]" : ""
              }`}
            >
              <div className="w-[18px]">
                {selectAll && <CheckLine fill="white" />}
              </div>
            </div>
          )}
          {headColumns.map(
            (head: { id: string; title: string; width: number }) => (
              <div
                key={head.id + head.title}
                style={{ minWidth: head?.width }}
                className="cell"
              >
                <p style={{ minWidth: head?.width }}>{head.title}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
