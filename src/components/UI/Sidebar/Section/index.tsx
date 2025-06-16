import { memo, useEffect, useState } from "react";
import IconGenerator from "../../IconGenerator";
import { DropDown, OneDropdown } from "./DropDown";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../../store/filterParams";
import { SectionBtns } from "./Btns";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { MenuItem, MenuSection } from "../../../../interfaces/menu";
import "./style.scss";

interface Props {
  list: MenuSection;
  collapsed: boolean;
  handleNavigate: (val: MenuItem) => void;
  wideSidebar: boolean;
}

const SidebarSection = ({
  list,
  collapsed = false,
  handleNavigate,
  wideSidebar,
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslationHook();
  const { navigateTo } = usePageRouter();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expandedInner, setExpandedInner] = useState<string | false>(false);
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
    Object.values(list).forEach((items: MenuItem[]) => {
      const currentEl = items.find((item) => item.id === locationName);
      if (currentEl?.id) {
        setActiveIndex(currentEl?.parent || "");
      }
    });
  }, [locationName, list]);

  const clearFilter = () => {
    dispatch(filterActions.clearFilterData());
  };

  useEffect(() => {
    Object.values(list).forEach((items: MenuItem[]) => {
      const currentEl = items.find((item) => item.id === locationName);
      if (currentEl?.id) {
        setExpanded(currentEl?.parent || "");
        if (currentEl.parent_link) setExpandedInner(currentEl.parent_link);
      }
    });
  }, [locationName, list]);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChangeInner =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedInner(isExpanded ? panel : false);
    };

  if (wideSidebar) {
    return (
      <div id="sidebarCollapse">
        {Object.entries(list).map(
          ([key, items]: [string, MenuItem[]], ind: number) => {
            const visibleSidebarItems = items.filter((el) => el.sidebar);
            if (!visibleSidebarItems?.length) return null;

            return (
              <div key={key + ind}>
                <Accordion
                  key={ind}
                  expanded={expanded === key}
                  onChange={handleChange(key)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div className="w-[40px]">
                      <IconGenerator
                        icon={visibleSidebarItems[0]?.parent_icon}
                        fill="var(--black)"
                      />
                    </div>
                    <h2 className="font-semibold text-black text-[12px]">
                      {t(key)}
                    </h2>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="pl-2">
                      {visibleSidebarItems?.map(
                        (item: MenuItem, iIndex: number) => (
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
                                          fill={
                                            item.id === locationName
                                              ? "var(--main)"
                                              : "var(--gray)"
                                          }
                                        />
                                      </div>

                                      <p
                                        className={`w-full ${
                                          item.id === locationName
                                            ? "text-[var(--main)] font-medium"
                                            : ""
                                        }`}
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
                                              onClick={() =>
                                                navigateTo("/" + child.path)
                                              }
                                              className="flex items-center justify-between h-[40px] relative overflow-hidden cursor-pointer text-[12px]"
                                            >
                                              <div className="w-[45px] flex justify-center">
                                                <IconGenerator
                                                  icon={child?.icon}
                                                  fill={
                                                    child.id === locationName
                                                      ? "var(--main)"
                                                      : "var(--gray)"
                                                  }
                                                />
                                              </div>
                                              <p
                                                className={`w-full ${
                                                  child.path === locationName
                                                    ? "text-[var(--main)] font-medium"
                                                    : ""
                                                }`}
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
                                onClick={() => navigateTo("/" + item.path)}
                                className="flex items-center justify-between h-[40px] relative overflow-hidden cursor-pointer text-[12px]"
                              >
                                <div
                                  className={` ${
                                    item.id === locationName ? "active" : ""
                                  }`}
                                ></div>

                                <div className="w-[45px] flex justify-center">
                                  <IconGenerator
                                    icon={item?.icon}
                                    fill={
                                      item.id === locationName
                                        ? "var(--main)"
                                        : "var(--gray)"
                                    }
                                  />
                                </div>
                                <p
                                  className={`w-full ${
                                    item.id === locationName
                                      ? "text-[var(--main)] font-medium"
                                      : ""
                                  }`}
                                >
                                  {t(item.title)}
                                </p>
                              </div>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          }
        )}
      </div>
    );
  }

  return (
    <div className="section">
      <div className="flex flex-col justify-between w-full">
        <div>
          {Object.entries(list)?.map(
            ([key, items]: [string, MenuItem[]], index) => {
              const visibleSidebarItems = items.filter((el) => el.sidebar);
              if (!visibleSidebarItems?.length) return null;

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
                  </button>

                  {!collapsed && (
                    <div
                      className={`panel ${
                        activeIndex === key && !collapsed ? "show" : ""
                      }`}
                    >
                      {items.map((el: MenuItem, i: number, arr: MenuItem[]) => {
                        const isLastItem = i === arr.length - 1;

                        if (el.title && el.title.trim() !== "") {
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
                                active={true}
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
              ) : (
                <div
                  className="menus group"
                  key={index}
                  onClick={() => clearFilter()}
                >
                  {collapsed ? (
                    <OneDropdown
                      title={t(key)}
                      path={visibleSidebarItems[0].path}
                      icon={visibleSidebarItems[0]?.icon}
                      clearFilter={clearFilter}
                      handleNavigate={handleNavigate}
                    />
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => handleNavigate(visibleSidebarItems[0])}
                    className={`menu_link3 w-full h-[40px] flex items-center capitalize ${
                      collapsed ? "justify-center" : "gap-x-3 pl-3 ml-[-11px]"
                    }`}
                  >
                    <IconGenerator
                      icon={visibleSidebarItems[0]?.icon}
                      fill="var(--black)"
                    />
                    {!collapsed && <>{t(visibleSidebarItems[0]?.title)}</>}
                  </button>
                  {!collapsed && <div className="accordion-line"></div>}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarSection);
