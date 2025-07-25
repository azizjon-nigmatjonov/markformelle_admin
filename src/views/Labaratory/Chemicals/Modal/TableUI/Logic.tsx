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

export const TemplateLogic = ({
  getList,
  getDetey,
}: {
  getList: () => void;
  getDetey: () => void;
}) => {
  const { t } = useTranslation();

  const copyRecipe = async (params: {}) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/labrecete/lab-sablon-to-uretim`,
        params
      );
      console.log("data", data);

      toast.success(t("get_list"));
      getList();
      getDetey();
    } catch (error) {
      toast.success(t("error"));
    }
  };

  const createForm = async (params: {
    LABRECETEKODU: string;
    newReceteId: string;
    RECETEID: string;
    atisId: number;
    KULLANICIID: number;
  }) => {
    try {
      copyRecipe({
        labrecete_atis_id: params.atisId,
        sablon_recete_id: params.newReceteId,
        kullanici_id: params.KULLANICIID,
      });

      toast.success(t("created!"));
      // return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  return { createForm };
};
