import { useTranslation } from "react-i18next";
import IconGenerator from "../../../IconGenerator";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation } from "react-router-dom";

interface Props {
  el: any;
  index: number;
  isLastItem?: any;
  children?: any;
  handleNavigate: (val: any) => void;
  clearFilter?: () => void;
  active: boolean;
}

const Btn = ({
  el = {},
  index,
  isLastItem,
  handleNavigate,
  clearFilter = () => {},
  active = false,
}: Props) => {
  const { t } = useTranslation();

  return (
    <button
      key={el.id}
      onClick={() => handleNavigate(el)}
      className={`${
        index < 100 ? "steps__item steps__item--active" : "steps__item"
      } menu_link2 flex items-center steps ${active ? "active" : ""}`}
    >
      <div
        onClick={() => clearFilter()}
        className={`${
          isLastItem ? "mb-2" : ""
        } flex gap-x-2 menu_link menu_inner_link cursor-pointer text-sm font-medium ${
          active ? "active text-[var(--main)]" : "text-[var(--gray)]"
        }`}
      >
        <div className="w-[24px]">
          <IconGenerator
            icon={el.icon}
            fill={active ? "var(--main)" : "var(--gray)"}
          />
        </div>
        <span>{t(el.title)}</span>
      </div>
    </button>
  );
};

export const SectionBtns = ({
  el,
  index,
  isLastItem,
  handleNavigate,
  clearFilter = () => {},
  children = [],
  active,
}: Props) => {
  const { t } = useTranslation();
  const location = useLocation();

  if (children?.length) {
    const [open, setOpen] = useState(false);
    return (
      <div
        key={el.id}
        className={`${
          index < 100 ? "steps__item steps__item--active" : "steps__item"
        } flex items-center steps`}
      >
        <div className={`relative ${isLastItem ? "mb-5" : ""}`}>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <div
              onClick={() => clearFilter()}
              className={`flex gap-2 menu_link cursor-pointer text-sm font-medium whitespace-nowrap ${
                active ? "text-[var(--black)]" : "text-[var(--gray)]"
              }`}
            >
              <IconGenerator
                icon={el.icon}
                fill={active ? "var(--main)" : "var(--gray)"}
              />
              <span>{t(el.title)}</span>
            </div>

            <div className={open ? "rotate-[180deg]" : ""}>
              <ArrowDropDownIcon
                style={{ color: active ? "var(--black)" : "var(--gray)" }}
              />
            </div>
          </div>
          {open ? (
            <div className="pl-5">
              {children.map((item: any, i: number) => (
                <Btn
                  key={i}
                  index={i}
                  handleNavigate={handleNavigate}
                  clearFilter={clearFilter}
                  el={item}
                  active={location.pathname.substring(1).startsWith(item.path)}
                />
              ))}
            </div>
          ) : (
            ""
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
      active={active}
    />
  );
};
