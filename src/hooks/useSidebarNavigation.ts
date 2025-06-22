import { useState, useEffect, useMemo, useCallback } from "react";
import {  MenuSection } from "../interfaces/menu";

export const useSidebarNavigation = (list: MenuSection) => {
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
    setActiveIndex(key);
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