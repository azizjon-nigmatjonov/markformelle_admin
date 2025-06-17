import { memo, useMemo } from "react";
import IconGenerator from "../../../IconGenerator";
import { DropDown } from "../DropDown";
import { SectionBtns } from "../Btns";
import { MenuItem, MenuSection } from "../../../../../interfaces/menu";

interface CollapsedSidebarProps {
  list: MenuSection;
  activeIndex: string;
  expanded: string | false;
  expandedInner: string | false;
  toggleAccordion: (key: string) => void;
  handleNavigate: (val: MenuItem) => void;
  clearFilter: () => void;
  collapsed: boolean;
  t: (key: string) => string;
}

export const CollapsedSidebar = memo(
  ({
    list,
    activeIndex,
    expanded,
    expandedInner,
    toggleAccordion,
    handleNavigate,
    clearFilter,
    collapsed,
    t,
  }: CollapsedSidebarProps) => {
    const menuEntries = useMemo(
      () =>
        Object.entries(list)
          .map(([key, items], index) => ({
            key,
            items: items.filter((el) => el.sidebar),
            index,
            isLastItem: index === Object.entries(list).length - 1,
          }))
          .filter(({ items }) => items.length > 0),
      [list]
    );

    return (
      <div className="section">
        <div className="flex flex-col justify-between w-full">
          <div>
            {menuEntries.map(({ key, items, index, isLastItem }) => {
              return (
                <div key={index}>
                  <div
                    className={`accordion cursor-pointer group ${
                      activeIndex === key ? "active" : ""
                    } flex justify-between items-center w-full`}
                    onClick={() => toggleAccordion(key)}
                  >
                    <div
                      className={`flex items-center ${
                        collapsed ? "justify-center w-full" : "space-x-3"
                      } ${
                        activeIndex === key ? "bg-[#ffc3a24d] h-[40px]" : ""
                      }`}
                    >
                      <IconGenerator
                        icon={items[0]?.parent_icon || items[0].icon}
                        fill="var(--black)"
                      />
                    </div>

                    {window?.screen?.width < 980
                      ? collapsed &&
                        activeIndex === key && (
                          <DropDown
                            title={key}
                            value={items}
                            active={
                              expandedInner ? expandedInner : expanded || ""
                            }
                            handleNavigate={handleNavigate}
                          />
                        )
                      : collapsed && (
                          <DropDown
                            title={key}
                            active={
                              expandedInner ? expandedInner : expanded || ""
                            }
                            value={items}
                            handleNavigate={handleNavigate}
                          />
                        )}
                  </div>

                  {!collapsed && (
                    <div
                      className={`panel ${
                        activeIndex === key && !collapsed ? "show" : ""
                      }`}
                    >
                      {items.map((el: MenuItem, i: number, arr: MenuItem[]) => {
                        const isLastItem = i === arr.length - 1;

                        if (
                          typeof el.title === "string" &&
                          el.title.trim() !== ""
                        ) {
                          return (
                            el.sidebar && (
                              <SectionBtns
                                key={i}
                                index={i}
                                handleNavigate={handleNavigate}
                                clearFilter={clearFilter}
                                el={el}
                                children={el.children}
                                isLastItem={isLastItem}
                                active={
                                  el.id === location.pathname.substring(1)
                                }
                              />
                            )
                          );
                        } else {
                          return <div key={i}></div>;
                        }
                      })}
                    </div>
                  )}

                  {!isLastItem && <div className="accordion-line"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

CollapsedSidebar.displayName = "CollapsedSidebar";
