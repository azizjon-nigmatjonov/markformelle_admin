import axios from "axios";
import { API_URL } from "../../../../../utils/env";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const TableUILogic = () => {};

export function toggleRowGroupSelection({
  selectedItems,
  currentGroup,
}: {
  selectedItems: number[];
  currentGroup: number[];
}): number[] {
  const isAllSelected = currentGroup.every((i) => selectedItems.includes(i));

  if (isAllSelected) {
    return selectedItems.filter((i) => !currentGroup.includes(i));
  } else {
    return Array.from(new Set([...selectedItems, ...currentGroup]));
  }
}

export const areAllRowsSelectedOnPage = (
  selectedItems: number[],
  dataSource: { index: number }[]
): boolean => {
  const pageIndexes = dataSource.map((item) => item.index);

  return pageIndexes.every((i) => selectedItems.includes(i));
};

export const TemplateLogic = () => {
  const { t } = useTranslation();
  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/labrecete/`, params);

      toast.success(t("created!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  return { createForm };
};
