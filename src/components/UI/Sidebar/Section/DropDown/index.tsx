import IconGenerator from "../../../../../components/UI/IconGenerator";
import { SectionBtns } from "../Btns";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../../../../../interfaces/menu";
import { ReactNode, memo, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { shouldRenderItem } from "../../../../../utils/sidebarUtils";

interface DropDownProps {
  title: string;
  value: MenuItem[];
  active: string | false;
  handleNavigate: (link: MenuItem) => void;
}

interface OneDropdownProps {
  title: string;
  icon: string | ReactNode;
  path: string;
  clearFilter: () => void;
  handleNavigate: (link: MenuItem) => void;
}

// Memoized DropDown component
export const DropDown = memo(
  ({ title, value, active, handleNavigate = () => {} }: DropDownProps) => {
    const { t } = useTranslation();

    const filteredItems = useMemo(
      () => value.filter(shouldRenderItem),
      [value]
    );

    const handleNavigateCallback = useCallback(
      (link: MenuItem) => {
        handleNavigate(link);
      },
      [handleNavigate]
    );

    return (
      <div className="mt-[-40px]">
        <div className="absolute left-[45px] group-hover:block hidden min-w-[250px] z-[99]">
          <div className="relative">
            <div className="absolute left-[-4px] top-[15px] w-[15px] h-[15px] rotate-[45deg] bg-transparent border border-[var(--border)] z-[33]"></div>
            <div className="relative z-[99] bg-white card-shadow min-w-[200px] rounded-[12px] border border-[var(--gray20)] pt-2">
              <h3 className="px-3 py-2 text-[var(--black)]">{t(title)}</h3>
              <div className="show">
                {filteredItems.map(
                  (el: MenuItem, index: number, arr: MenuItem[]) => {
                    const isLastItem = index === arr.length - 1;

                    return (
                      <div
                        key={index}
                        className={`${
                          el?.children?.length ? "pb-2 pr-3" : ""
                        } relative overflow-hidden`}
                      >
                        <SectionBtns
                          index={index}
                          handleNavigate={handleNavigateCallback}
                          el={el}
                          active={active || false}
                          children={el.children}
                          isLastItem={isLastItem}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DropDown.displayName = "DropDown";

// Memoized OneDropdown component
export const OneDropdown = memo(
  ({
    title = "",
    icon = "",
    path = "/",
    clearFilter = () => {},
    handleNavigate = () => {},
  }: OneDropdownProps) => {
    const location = useLocation();

    const isActive = useMemo(
      () => location.pathname.startsWith(path),
      [location.pathname, path]
    );

    const handleClick = useCallback(() => {
      handleNavigate({
        id: path,
        path,
        title,
        icon,
        sidebar: true,
      } as MenuItem);
    }, [handleNavigate, path, title, icon]);

    const handleClearFilter = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        clearFilter();
      },
      [clearFilter]
    );

    const iconFill = useMemo(
      () => (isActive ? "var(--main)" : "var(--gray)"),
      [isActive]
    );

    const menuLinkClass = useMemo(
      () =>
        `flex justify-between capitalize menu_link2 cursor-pointer font-medium text-[var(--black)] whitespace-nowrap pr-10 ${
          isActive ? "active" : ""
        }`,
      [isActive]
    );

    return (
      <div className="absolute left-[40px] group-hover:block hidden bg-white whitespace-nowrap common-shadow rounded-[12px] z-[99] p-2">
        <div className="overflow-hidden">
          <div
            onClick={handleClick}
            className="menu_link2 flex items-center steps cursor-pointer"
          >
            <div className={menuLinkClass} onClick={handleClearFilter}>
              <div className="flex space-x-4">
                <IconGenerator icon={icon} fill={iconFill} />
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

OneDropdown.displayName = "OneDropdown";
