import axios from "axios";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;
export const DragAndDropDataLogic = ({ id }: { id: number }) => {
  const { data: tableData, refetch } = useQuery(
    ["GET_DRAG_AND_DROP_DATA", id],
    () => {
      return axios.get(`${API_URL}/recetedetay/?RECETEID=${id}`);
    },
    {
      enabled: !!id,
    }
  );

  return { detailData: tableData, refetch };
};
