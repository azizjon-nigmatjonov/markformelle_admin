import cls from "./style.module.scss";
interface Props {
  bodyColumns: any;
  headColumns: any;
  handleRowClick: (val: any, type: string) => void;
}
export const TableUI = ({
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
}: Props) => {
  return (
    <div
      className={`${cls.twoRowTable} text-sm overflow-x-scroll designed-scroll h-full`}
    >
      <div className={`${cls.header} flex w-full`}>
        <div className="flex font-medium text-[var(--main)]">
          {headColumns.map((head: { id: string; title: string }) => (
            <div
              key={head.id + head.title}
              className={`${cls.cell}  border-b border-[var(--border)]`}
            >
              <p>{head.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${cls.body} w-full`}>
        {bodyColumns.map((item: any, index: number) => (
          <div
            key={index}
            className={`${cls.row} flex w-full cursor-pointer`}
            onClick={() => handleRowClick({ ...item, index }, "view")}
          >
            {headColumns.map((head: { id: string; title: string }) => (
              <div
                key={head.id + head.title}
                className={`${cls.cell} font-medium border-b border-[var(--border)]`}
              >
                <p>{item[head.id]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
