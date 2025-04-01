import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_TEST_URL;

export const ModalListLogic = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/urun/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return { data, setData };
};
