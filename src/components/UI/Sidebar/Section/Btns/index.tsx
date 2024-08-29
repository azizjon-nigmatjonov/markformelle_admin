import { useTranslation } from "react-i18next";
import IconGenerator from "../../../IconGenerator";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Props {
  el: any;
  index: number;
  isLastItem?: any;
  children?: any;
  handleNavigate: (val: any) => void;
  clearFilter?: () => void;
}

const Btn = ({ el, index, isLastItem, handleNavigate, clearFilter = () => {} }: Props) => {
  const { t } = useTranslation();

  return (
    <button
      key={el.id}
      onClick={() => handleNavigate(el)}
      className={`${
        index < 100 ? "steps__item steps__item--active" : "steps__item"
      } menu_link2 flex items-center steps ${
        location.pathname.startsWith(el.path) ? "active" : ""
      }`}
    >
      <p
        onClick={() => clearFilter()}
        className={`${
          isLastItem ? "mb-2" : ""
        } flex gap-2 capitalize menu_link cursor-pointer text-sm font-medium text-[#151515] `}
      >
        <IconGenerator icon={el.icon} fill="var(--black)" />
        <span>{t(el.title)}</span>
      </p>
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
}: Props) => {
  const { t } = useTranslation();

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
            <p
              onClick={() => clearFilter()}
              className={`flex gap-2 capitalize menu_link cursor-pointer text-sm font-medium text-[#151515] `}
            >
              <IconGenerator icon={el.icon} fill="var(--black)" />
              <span>{t(el.title)}</span>
            </p>

            <div className={open ? "rotate-[180deg]" : ""}>
              <ArrowDropDownIcon style={{ color: "var(--gray)" }} />
            </div>
          </div>
          {open ? (
            <div className="ml-5">
              {children.map((item: any, i: number) => (
                <Btn
                  key={i}
                  index={i}
                  handleNavigate={handleNavigate}
                  clearFilter={clearFilter}
                  el={item}
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
    />
  );
};
