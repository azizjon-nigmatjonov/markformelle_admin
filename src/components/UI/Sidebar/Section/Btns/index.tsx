import { useTranslation } from "react-i18next";
import IconGenerator from "../../../IconGenerator";
import { useState, memo, useCallback, useMemo } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../../../../../interfaces/menu";

interface BtnProps {
  el: MenuItem;
  index: number;
  isLastItem?: boolean;
  children?: MenuItem[];
  handleNavigate: (val: MenuItem) => void;
  clearFilter?: () => void;
  active: boolean;
}

interface SectionBtnsProps {
  el: MenuItem;
  index: number;
  isLastItem?: boolean;
  children?: MenuItem[];
  handleNavigate: (val: MenuItem) => void;
  clearFilter?: () => void;
  active: string | boolean;
}

// Utility functions
const getIconFill = (isActive: boolean) =>
  isActive ? "var(--main)" : "var(--gray)";

const getTextClass = (isActive: boolean) =>
  isActive ? "active text-[var(--main)]" : "text-[var(--gray)]";

const getMenuLinkClass = (isActive: boolean) =>
  isActive ? "text-[var(--black)]" : "text-[var(--gray)]";

// Helper function to convert active prop to boolean
const isActiveItem = (active: string | boolean, itemId: string): boolean => {
  if (typeof active === "boolean") return active;
  return active === itemId;
};

// Memoized Btn component
const Btn = memo(
  ({
    el = {} as MenuItem,
    index,
    isLastItem,
    handleNavigate,
    clearFilter = () => {},
    active = false,
  }: BtnProps) => {
    const { t } = useTranslation();

    const handleClick = useCallback(
      (el: MenuItem) => {
        console.log("22222");

        handleNavigate(el);
      },
      [handleNavigate, el]
    );

    const handleClearFilter = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        clearFilter();
      },
      [clearFilter]
    );

    const stepsClass = useMemo(
      () => (index < 100 ? "steps__item steps__item--active" : "steps__item"),
      [index]
    );

    const menuLinkClass = useMemo(
      () =>
        `${
          isLastItem ? "mb-2" : ""
        } flex gap-x-2 menu_link menu_inner_link cursor-pointer text-sm font-medium ${getTextClass(
          active
        )}`,
      [isLastItem, active]
    );

    return (
      <div
        onClick={(e) => {
          handleClick(el);
          setTimeout(() => {
            handleClearFilter(e);
          }, 0);
        }}
        className={`${stepsClass} menu_link2 flex items-center steps ${
          active ? "active" : ""
        }`}
      >
        <div className={menuLinkClass}>
          <div className="w-[24px]">
            <IconGenerator icon={el.icon} fill={getIconFill(active)} />
          </div>
          <span>{t(el.title)}</span>
        </div>
      </div>
    );
  }
);

Btn.displayName = "Btn";

// Memoized SectionBtns component
export const SectionBtns = memo(
  ({
    el,
    index,
    isLastItem,
    handleNavigate,
    clearFilter = () => {},
    children = [],
    active,
  }: SectionBtnsProps) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleToggle = useCallback(() => {
      setOpen((prev) => !prev);
    }, []);

    const handleClearFilter = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        clearFilter();
      },
      [clearFilter]
    );

    const stepsClass = useMemo(
      () => (index < 100 ? "steps__item steps__item--active" : "steps__item"),
      [index]
    );

    const menuLinkClass = useMemo(
      () =>
        `flex gap-2 menu_link cursor-pointer text-sm font-medium whitespace-nowrap ${getMenuLinkClass(
          isActiveItem(active, el.id)
        )}`,
      [active, el.id]
    );

    const shouldShowChildren = useMemo(
      () => open || isActiveItem(active, el.id),
      [open, el.id, active]
    );

    if (children?.length) {
      return (
        <div key={el.id} className={`${stepsClass} flex items-center steps`}>
          <div className={`relative ${isLastItem ? "mb-5" : ""}`}>
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => {
                handleToggle();
                setTimeout(() => {
                  handleClearFilter(e);
                }, 0);
              }}
            >
              <div className={menuLinkClass}>
                <IconGenerator
                  icon={el.icon}
                  fill={getIconFill(isActiveItem(active, el.id))}
                />
                <span>{t(el.title)}</span>
              </div>

              <div className={open ? "rotate-[180deg]" : ""}>
                <ArrowDropDownIcon
                  style={{
                    color: isActiveItem(active, el.id)
                      ? "var(--black)"
                      : "var(--gray)",
                  }}
                />
              </div>
            </div>
            {shouldShowChildren && (
              <div className="pl-5">
                {children.map((item: MenuItem, innerIndex: number) => (
                  <Btn
                    key={innerIndex}
                    index={innerIndex}
                    handleNavigate={handleNavigate}
                    clearFilter={clearFilter}
                    el={item}
                    active={location.pathname
                      .substring(1)
                      .startsWith(item.path)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <Btn
        index={index}
        handleNavigate={handleNavigate}
        clearFilter={clearFilter}
        el={el}
        children={el.children}
        isLastItem={isLastItem}
        active={isActiveItem(active, el.id)}
      />
    );
  }
);

SectionBtns.displayName = "SectionBtns";
