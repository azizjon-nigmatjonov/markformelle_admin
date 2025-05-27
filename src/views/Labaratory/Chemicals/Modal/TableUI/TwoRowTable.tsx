import { useRef } from "react";
import cls from "./style.module.scss";
import { PlusIcon } from "../../../../../components/UI/IconGenerator/Svg";
import { useTranslation } from "react-i18next";
interface Props {
  title: string;
  bodyColumns: any;
  headColumns: any;
  handleRowClick: (val: any, type: string) => void;
}
export const TwoRowTable = ({
  title = "table",
  bodyColumns = {},
  headColumns = [],
  handleRowClick,
}: Props) => {
  const { t } = useTranslation();
  const headerScrollRef: any = useRef(null);

  return (
    <div>
      <div className="py-1 flex items-center justify-between px-2 border-b border-[var(--border)]">
        <h2>{title}</h2>
        <button className="flex space-x-1 items-center text-sm" type="button">
          <PlusIcon fill="var(--black)" />
          <span>{t("add")}</span>
        </button>
      </div>
      <div
        className={`${cls.twoRowTable} text-sm overflow-x-scroll designed-scroll h-[400px]`}
      >
        <div className={`${cls.header} flex`} ref={headerScrollRef}>
          <div className="flex font-medium text-[var(--main)]">
            {headColumns.map((head: { id: string; title: string }) => (
              <div
                key={head.id + head.title}
                className={`${cls.cell} border-b border-[var(--border)]`}
              >
                <p>{head.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${cls.body} h-[46%] bg-green-200 w-full`}
          style={{ width: headerScrollRef?.current?.scrollWidth + "px" }}
        >
          {bodyColumns?.okey?.map((item: any, index: number) => (
            <div key={index} className={`${cls.row} flex`}>
              {headColumns.map(
                (head: { id: string; title: string; render: any }) => (
                  <div
                    key={head.id + head.title}
                    className={`${cls.cell} font-medium border-b border-green-300 bg-green-200 cursor-pointer`}
                    onClick={() =>
                      handleRowClick({ ...item, index }, "view_single")
                    }
                    onDoubleClick={() =>
                      handleRowClick({ ...item, index }, "view")
                    }
                  >
                    <p>
                      {head.render
                        ? head.render(item[head?.id], item)
                        : item[head.id]}
                    </p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <div className="h-[6px] w-full"></div>

        <div
          className={`${cls.body} bg-yellow-100 w-full h-[44%]`}
          style={{ width: headerScrollRef?.current?.scrollWidth + "px" }}
        >
          {bodyColumns?.okeysiz?.map((item: any, index: number) => (
            <div key={index} className={`${cls.row} flex cursor-pointer`}>
              {headColumns.map(
                (head: { id: string; title: string; render: any }) => (
                  <div
                    key={head.id + head.title}
                    className={`${cls.cell} font-medium border-b border-yellow-300 bg-yellow-100`}
                  >
                    <p>
                      {head.render
                        ? head.render(item[head?.id], item)
                        : item[head.id]}
                    </p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
