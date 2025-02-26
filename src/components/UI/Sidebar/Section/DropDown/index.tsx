import IconGenerator from "../../../../../components/UI/IconGenerator";
import { SectionBtns } from "../Btns";
import { useLocation } from "react-router-dom";

interface Props {
  title: any;
  value: any;
  handleNavigate: (link: any) => void;
}

export const DropDown = ({ value, handleNavigate = () => {} }: Props) => {
  const location = useLocation();

  return (
    <div className="mt-[-40px]">
      <div className="absolute left-[45px] group-hover:block hidden min-w-[250px] z-[99]">
        <div className="relative">
          <div className="absolute left-[-4px] top-[15px] w-[15px] h-[15px] rotate-[45deg] bg-white border border-[var(--gray20)] z-[33]"></div>
          <div className="relative z-[99] bg-white card-shadow min-w-[200px] rounded-[12px] border border-[var(--gray20)] pt-2">
            <div className="show">
              {Object.values(value as keyof typeof value)?.map(
                (el: any, i, arr) => {
                  const isLastItem = i === arr.length - 1;

                  if (el.title && el.title.trim() !== "") {
                    return (
                      el.sidebar && (
                        <div
                          key={i}
                          className={`${
                            el?.children?.length ? "pb-2 pr-3" : ""
                          } relative overflow-hidden`}
                        >
                          <SectionBtns
                            index={i}
                            handleNavigate={handleNavigate}
                            clearFilter={() => {}}
                            el={el}
                            active={location.pathname
                              .substring(1)
                              .startsWith(el.path)}
                            children={el.children}
                            isLastItem={isLastItem}
                          />
                        </div>
                      )
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OneDropdown = ({
  title = "",
  icon = "",
  path = "/",
  clearFilter = () => {},
  handleNavigate = () => {},
}: {
  title: string;
  icon: string;
  path: string;
  clearFilter: () => void;
  handleNavigate: (link: any) => void;
}) => {
  return (
    <div className="absolute left-[40px] group-hover:block hidden bg-white whitespace-nowrap common-shadow rounded-[12px] z-[99] p-2">
      <div className="overflow-hidden">
        <button
          onClick={() => handleNavigate(path)}
          className={`menu_link2 flex items-center steps`}
        >
          <p
            className={`flex justify-between capitalize menu_link2 cursor-pointer font-medium text-[var(--black)] whitespace-nowrap pr-10 ${
              location.pathname.startsWith(path) ? "active" : ""
            }`}
            onClick={() => clearFilter()}
          >
            <div className="flex space-x-4">
              <IconGenerator
                icon={icon}
                fill={
                  location.pathname.startsWith(path)
                    ? "var(--main)"
                    : "var(--gray)"
                }
              />
              <span>{title}</span>
            </div>
          </p>
        </button>
      </div>
    </div>
  );
};
