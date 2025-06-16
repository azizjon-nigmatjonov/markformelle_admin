import IconGenerator from "../../../../../components/UI/IconGenerator";
import { SectionBtns } from "../Btns";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../../../../../interfaces/menu";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  value: MenuItem[];
  active: string;
  handleNavigate: (link: MenuItem) => void;
}

export const DropDown = ({
  title,
  value,
  active,
  handleNavigate = () => {},
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="mt-[-40px]">
      <div className="absolute left-[45px] group-hover:block hidden min-w-[250px] z-[99]">
        <div className="relative">
          <div className="absolute left-[-4px] top-[15px] w-[15px] h-[15px] rotate-[45deg] bg-transparent border border-[var(--border)] z-[33]"></div>
          <div className="relative z-[99] bg-white card-shadow min-w-[200px] rounded-[12px] border border-[var(--gray20)] pt-2">
            <h3 className="px-3 py-2 text-[var(--black)]">{t(title)}</h3>
            <div className="show">
              {value.map((el: MenuItem, index: number, arr: MenuItem[]) => {
                const isLastItem = index === arr.length - 1;

                if (el.title && el.title.trim() !== "") {
                  return (
                    el.sidebar && (
                      <div
                        key={index}
                        className={`${
                          el?.children?.length ? "pb-2 pr-3" : ""
                        } relative overflow-hidden`}
                      >
                        <SectionBtns
                          index={index}
                          handleNavigate={handleNavigate}
                          clearFilter={() => {}}
                          el={el}
                          active={active}
                          children={el.children}
                          isLastItem={isLastItem}
                        />
                      </div>
                    )
                  );
                } else {
                  return <div key={index}></div>;
                }
              })}
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
  icon: string | ReactNode;
  path: string;
  clearFilter: () => void;
  handleNavigate: (link: MenuItem) => void;
}) => {
  const location = useLocation();

  return (
    <div className="absolute left-[40px] group-hover:block hidden bg-white whitespace-nowrap common-shadow rounded-[12px] z-[99] p-2">
      <div className="overflow-hidden">
        <button
          onClick={() =>
            handleNavigate({
              id: path,
              path,
              title,
              icon,
              sidebar: true,
            } as MenuItem)
          }
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
