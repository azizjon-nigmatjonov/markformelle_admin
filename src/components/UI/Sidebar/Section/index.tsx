import { memo, useEffect, useState } from "react";
import IconGenerator from "../../IconGenerator";
import { useTranslation } from "react-i18next";
import cls from "./style.module.scss";
import { DropDown, OneDropdown } from "./DropDown";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../../store/filterParams";
import { SectionBtns } from "./Btns";

interface Props {
  list: any;
  collapsed: boolean;
  handleNavigate: (val: any) => void;
}

const SidebarSection = ({ list, collapsed = false, handleNavigate }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState("");
  let locationName = location.pathname.substring(1);
  const arr = locationName.split("/");
  if (arr.length > 2) {
    if (arr[2] !== "add") {
      locationName = arr[0] + "/" + arr[1] + "/:id";
    }
  }

  const toggleAccordion = (key: string) => {
    setActiveIndex(key);
  };

  useEffect(() => {
    Object.values(list).forEach((el: any) => {
      const currentEl = el.find((item: any) => item.id === locationName);
      if (currentEl?.id) {
        setActiveIndex(currentEl?.parent);
      }
    });
  }, [locationName, list]);

  const clearFilter = () => {
    dispatch(filterActions.clearFilterData());
  };

  return (
    <div className={`${cls.section} ${collapsed ? "py-[10px]" : "p-[10px]"}`}>
      <div className="flex flex-col justify-between w-full">
        <div>
          {Object.entries(list)?.map(([key, value]: [string, any], index) => {
            const visibleSidebarItems: any = value.filter(
              (el: any) => el.sidebar
            );
            if (!visibleSidebarItems?.length) return "";

            const isLastItem = index === Object.entries(list).length - 1;

            return visibleSidebarItems?.length > 0 ? (
              <div key={index}>
                <button
                  className={`accordion group ${
                    activeIndex === key ? "active" : ""
                  } flex justify-between items-center w-full`}
                  onClick={() => toggleAccordion(key)}
                >
                  <div
                    className={`flex items-center ${
                      collapsed ? "justify-center w-full" : "space-x-3"
                    } ${activeIndex === key ? "bg-[#ffc3a24d] h-[40px]" : ""}`}
                  >
                    <IconGenerator
                      icon={value?.[0]?.parent_icon || value[0].icon}
                      fill="var(--black)"
                    />
                  </div>

                  {window?.screen?.width < 980
                    ? collapsed &&
                      activeIndex === key && (
                        <DropDown
                          title={key}
                          value={value}
                          handleNavigate={handleNavigate}
                        />
                      )
                    : collapsed && (
                        <DropDown
                          title={key}
                          value={value}
                          handleNavigate={handleNavigate}
                        />
                      )}
                </button>

                {!collapsed && (
                  <div
                    className={`panel ${
                      activeIndex === key && !collapsed ? "show" : ""
                    }`}
                  >
                    {Object.values(value as keyof typeof value)?.map(
                      (el: any, i, arr) => {
                        const isLastItem = i === arr.length - 1;

                        if (el.title && el.title.trim() !== "") {
                          return (
                            el.sidebar && (
                              <>
                                <SectionBtns
                                  index={i}
                                  handleNavigate={handleNavigate}
                                  clearFilter={clearFilter}
                                  el={el}
                                  children={el.children}
                                  isLastItem={isLastItem}
                                  active={true}
                                />
                              </>
                            )
                          );
                        } else {
                          return null;
                        }
                      }
                    )}
                  </div>
                )}

                {!isLastItem && <div className="accordion-line"></div>}
              </div>
            ) : (
              <div
                className="menus group"
                key={index}
                onClick={() => clearFilter()}
              >
                {collapsed ? (
                  <OneDropdown
                    title={t(key)}
                    path={visibleSidebarItems?.[0]}
                    icon={visibleSidebarItems?.[0]?.icon}
                    // sidebarCounts={sidebarCounts}
                    clearFilter={clearFilter}
                    handleNavigate={handleNavigate}
                  />
                ) : (
                  ""
                )}
                <button
                  onClick={() => handleNavigate(visibleSidebarItems?.[0])}
                  className={`menu_link3 w-full h-[40px] flex items-center capitalize ${
                    collapsed ? "justify-center" : "gap-x-3 pl-3 ml-[-11px]"
                  }`}
                >
                  <IconGenerator
                    icon={visibleSidebarItems?.[0]?.icon}
                    fill="var(--black)"
                  />
                  {!collapsed && <>{t(visibleSidebarItems?.[0]?.title)}</>}
                </button>
                {!collapsed && <div className="accordion-line"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarSection);
