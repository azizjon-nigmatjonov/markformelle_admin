import { useEffect, useState } from "react";
import { SearchIcon } from "../IconGenerator/Svg";

interface Props {
  options: any;
  handleSelect: any;
  defaultValue?: any;
  name: string;
}

export const SelectOptions = ({
  options = [],
  handleSelect = () => {},
  defaultValue = undefined,
}: Props) => {
  const [selected, setSelected]: any = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (defaultValue && !selected?.value) {
      setSelected(
        options?.find((item: any) => item?.value == defaultValue) ?? {}
      );
    }
  }, [defaultValue]);

  return (
    <>
      <div className="w-[20px] relative h-[30px] flex items-center justify-center">
        <div className="cursor-pointer" onClick={() => setOpen(true)}>
          <SearchIcon width={16} />
        </div>

        {open ? (
          <div className="absolute left-1/2 -translate-x-1/2 z-[99] top-full">
            <div className="relative">
              <div className="w-[20px] h-[20px] rounded-[4px] rotate-45 absolute left-1/2 -translate-x-1/2 top-[-5px] z-[98] bg-white border border-[var(--border)]"></div>
              <ul className="border border-[var(--border)] card-shadow max-h-[200px] overflow-y-scroll designed-scroll bg-white relative z-[99]">
                {options.map((item: any, ind: number, arr: any) => {
                  return (
                    <li
                      key={item.value}
                      onClick={() => {
                        handleSelect(item);
                        setSelected(item);
                        setOpen(false);
                      }}
                      className={`px-3 py-1 min-w-[120px] ${
                        selected?.value === item?.value
                          ? "bg-[var(--primary50)] "
                          : "bg-white hover:bg-[var(--primary50)]"
                      } ${
                        ind !== arr.length - 1
                          ? "border-b border-[var(--border)]"
                          : ""
                      } cursor-pointer`}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {open && (
        <div
          className="fixed top-0 left-0 z-[90] w-full h-full"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};
