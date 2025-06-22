import { memo, useMemo, useCallback } from "react";
import IconGenerator from "../../../IconGenerator";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MenuItem, MenuSection } from "../../../../../interfaces/menu";

interface WideSidebarProps {
  list: MenuSection;
  expanded: string | false;
  expandedInner: string | false;
  locationName: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleChangeInner: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  navigateTo: (path: string) => void;
  t: (key: string) => string;
}

// Utility functions
const getIconFill = (isActive: boolean) =>
  isActive ? "var(--main)" : "var(--gray)";

const getTextClass = (isActive: boolean) =>
  isActive ? "text-[var(--main)] font-medium" : "";

// Memoized WideSidebar component
export const WideSidebar = memo(
  ({
    list,
    expanded,
    expandedInner,
    locationName,
    handleChange,
    handleChangeInner,
    navigateTo,
    t,
  }: WideSidebarProps) => {
    const menuItems = useMemo(
      () =>
        Object.entries(list)
          .map(([key, items]) => ({
            key,
            items: items.filter((el) => el.sidebar),
          }))
          .filter(({ items }) => items.length > 0),
      [list]
    );

    const handleItemClick = useCallback(
      (item: MenuItem) => {
        navigateTo("/" + item.path);
      },
      [navigateTo]
    );

    const handleChildClick = useCallback(
      (child: MenuItem) => {
        navigateTo("/" + child.path);
      },
      [navigateTo]
    );

    return (
      <div id="sidebarCollapse">
        {menuItems.map(({ key, items }, ind) => (
          <div key={key + ind}>
            <Accordion expanded={expanded === key} onChange={handleChange(key)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div className="w-[40px]">
                  <IconGenerator
                    icon={items[0]?.parent_icon}
                    fill="var(--black)"
                  />
                </div>
                <h2 className="font-semibold text-black text-[12px]">
                  {t(key)}
                </h2>
              </AccordionSummary>
              <AccordionDetails>
                <ul className="pl-2">
                  {items.map((item: MenuItem, iIndex: number) => (
                    <li key={item.id + iIndex}>
                      {item?.children?.length ? (
                        <div>
                          <Accordion
                            expanded={expandedInner === item.id}
                            onChange={handleChangeInner(item.id)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <div className="flex items-center relative overflow-hidden h-full ml-2">
                                <div className="w-[45px] flex justify-center">
                                  <IconGenerator
                                    icon={item?.icon}
                                    fill={getIconFill(item.id === locationName)}
                                  />
                                </div>
                                <p
                                  className={`w-full ${getTextClass(
                                    item.id === locationName
                                  )}`}
                                >
                                  {t(item.title)}
                                </p>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <ul className="ml-5">
                                {item.children.map(
                                  (child: MenuItem, index: number) => (
                                    <li key={index + child.path}>
                                      <div
                                        onClick={() => handleChildClick(child)}
                                        className="flex items-center justify-between h-[40px] relative overflow-hidden cursor-pointer text-[12px]"
                                      >
                                        <div className="w-[45px] flex justify-center">
                                          <IconGenerator
                                            icon={child?.icon}
                                            fill={getIconFill(
                                              child.id === locationName
                                            )}
                                          />
                                        </div>
                                        <p
                                          className={`w-full ${getTextClass(
                                            child.path === locationName
                                          )}`}
                                        >
                                          {t(child.title)}
                                        </p>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleItemClick(item)}
                          className="flex items-center justify-between h-[40px] relative overflow-hidden cursor-pointer text-[12px]"
                        >
                          <div
                            className={`${
                              item.id === locationName ? "active" : ""
                            }`}
                          ></div>
                          <div className="w-[45px] flex justify-center">
                            <IconGenerator
                              icon={item?.icon}
                              fill={getIconFill(item.id === locationName)}
                            />
                          </div>
                          <p
                            className={`w-full ${getTextClass(
                              item.id === locationName
                            )}`}
                          >
                            {t(item.title)}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    );
  }
);

WideSidebar.displayName = "WideSidebar";
