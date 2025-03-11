import axios from "axios";
import { useEffect, useState } from "react";

export const ModalListLogic = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (!id) return;
    axios.get(`http://10.40.14.193:8000/urun/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return { data, setData };
};
