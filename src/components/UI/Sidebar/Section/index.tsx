import { memo, useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../../store/filterParams";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { MenuItem, MenuSection } from "../../../../interfaces/menu";
import { CollapsedSidebar } from "./CollapsedSidebar";
import { WideSidebar } from "./WideSidebar";
import "./style.scss";

interface SidebarSectionProps {
  list: MenuSection;
  collapsed: boolean;
  handleNavigate: (val: MenuItem) => void;
  wideSidebar: boolean;
}

// Custom hook for sidebar navigation logic
const useSidebarNavigation = (list: MenuSection) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expandedInner, setExpandedInner] = useState<string | false>(false);
  const [activeIndex, setActiveIndex] = useState("");

  const locationName = useMemo(() => {
    const path = location.pathname.substring(1);
    const arr = path.split("/");
    if (arr.length > 2 && arr[2] !== "add") {
      return arr[0] + "/" + arr[1] + "/:id";
    }
    return path;
  }, [location.pathname]);

  const toggleAccordion = useCallback((key: string) => {
    setActiveIndex((prev) => (prev === key ? "" : key));
  }, []);

  const handleChange = useCallback(
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const handleChangeInner = useCallback(
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedInner(isExpanded ? panel : false);
    },
    []
  );

  useEffect(() => {
    const currentEl = Object.values(list)
      .flat()
      .find((item) => item.id === locationName);

    if (currentEl?.id) {
      setActiveIndex(currentEl.parent || "");
      setExpanded(currentEl.parent || "");
      if (currentEl.parent_link) {
        setExpandedInner(currentEl.parent_link);
      }
    }
  }, [locationName, list]);

  return {
    expanded,
    expandedInner,
    activeIndex,
    locationName,
    toggleAccordion,
    handleChange,
    handleChangeInner,
  };
};

const SidebarSection = ({
  list,
  collapsed = false,
  handleNavigate,
  wideSidebar,
}: SidebarSectionProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslationHook();
  const { navigateTo } = usePageRouter();

  const {
    expanded,
    expandedInner,
    activeIndex,
    locationName,
    toggleAccordion,
    handleChange,
    handleChangeInner,
  } = useSidebarNavigation(list);

  const clearFilter = useCallback(() => {
    dispatch(filterActions.clearFilterData());
  }, [dispatch]);

  if (wideSidebar) {
    return (
      <WideSidebar
        list={list}
        expanded={expanded}
        expandedInner={expandedInner}
        locationName={locationName}
        handleChange={handleChange}
        handleChangeInner={handleChangeInner}
        navigateTo={navigateTo}
        t={t}
      />
    );
  }

  return (
    <CollapsedSidebar
      list={list}
      activeIndex={activeIndex}
      expanded={expanded}
      expandedInner={expandedInner}
      toggleAccordion={toggleAccordion}
      handleNavigate={handleNavigate}
      clearFilter={clearFilter}
      collapsed={collapsed}
      t={t}
    />
  );
};

export default memo(SidebarSection);
