import axios from "axios";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IFilterParams } from "../../../../interfaces";
import { GetCurrentDate } from "../../../../utils/getDate";
const API_URL = import.meta.env.VITE_TEST_URL;

export const ModalTableLogic = ({
  setFormId,
  urunId,
  filterParams,
  refetchTable,
}: {
  urunId?: number | string;
  filterParams: IFilterParams;
  refetchTable: () => void;
  setFormId: (val: number) => void;
  handleModalActions?: (val: string, val2: string) => void;
}) => {
  const { t } = useTranslationHook();
  const [bodyData, setBodyData]: any = useState({});
  const [formData, setFormData]: any = useState({});

  const refetch = () => {
    axios.get(`${API_URL}/labrecete/${urunId}`).then((res: any) => {
      setFormData(res?.data);
    });
  };

  useEffect(() => {
    if (urunId) {
      refetch();
    } else {
      setFormData({});
    }
  }, [urunId]);

  const getTableData = (filters?: IFilterParams) => {
    setBodyData({});
    if (!filters?.page)
      filters = {
        page: 1,
        perPage: 100,
      };

    axios
      .get(
        `${API_URL}/urunbirim/?URUNID=${urunId}&skip=${
          filters.page - 1
        }&limit=${filters.perPage}${filters?.q ? "&" + filters.q : ""}`
      )
      .then((res) => {
        setBodyData(res.data);
      });
  };

  useEffect(() => {
    if (urunId) {
      getTableData(filterParams);
    }
  }, [urunId, filterParams]);

  const testForm = (_: string) => {};

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/labrecete/`, params);

      setFormId(data?.LABRECETEID);
      toast.success(t("created!"));
      refetchTable();
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(`${API_URL}/labrecete/${id}`, params);
      refetch();
      refetchTable();
      toast.success(t("updated!" + " 😊"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/urunbirim/`, {
        method: "DELETE",
        url: `${API_URL}/urunbirim/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      toast.success(t("deleted_successfully"));
      getTableData();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    tableData: bodyData ?? {},
    refetch: getTableData,
    updateForm,
    createForm,
    deleteFn,
    testForm,
    formData: formData ?? {},
  };
};

export const DetailsFormLogic = ({
  formId = "",
  setOpen = () => {},
  refetch,
}: {
  formId?: string | number;
  setOpen: (val: boolean) => void;
  refetch: () => void;
}) => {
  const { t } = useTranslationHook();
  const { data: formData } = useQuery(
    ["GET_URUNBIRIM_FORM", formId],
    () => {
      return axios.get(`${API_URL}/urunbirim/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      await axios.post(`${API_URL}/urunbirim/`, params);
      toast.success(t("created_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      return null;
    }
  };

  const updateForm = async (params: {}, id: string | number) => {
    try {
      await axios.put(`${API_URL}/urunbirim/${id}`, params);
      toast.success(t("updated_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return { updateForm, createForm, formData: formData?.data };
};

interface Props {
  formId: number;
}
export const TablesLogic = ({ formId }: Props) => {
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
  });
  const { data: tableData, refetch } = useQuery(
    ["GET_TABLE_DATA", formId, filterParams],
    () => {
      return axios.get(
        `${API_URL}/labrecetecalisma/?LABRECETEID=${formId}${
          filterParams?.q ? `&q=${filterParams.q}` : ""
        }`
      );
    },
    {
      enabled: !!formId,
    }
  );

  return {
    tableData: tableData?.data ?? {},
    refetch,
    setFilterParams,
    filterParams,
  };
};

export const TrailTableLogic = ({
  id,
  idTable,
}: {
  id: number;
  idTable: number;
}) => {
  const [trailTable, setTrailTable]: any = useState({ okey: [] });
  const { data: tableData, refetch } = useQuery(
    ["GET_TRAIL_TABLE_DATA", id],
    () => {
      return axios.get(`${API_URL}/labreceteatis/?LABRECETEID=${id}`);
    },
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    const obj: any = { okey: [], okeysiz: [] };

    tableData?.data?.data?.forEach(
      (el: { LABRECETECALISMAID: number; OKEY: boolean }) => {
        if (el.LABRECETECALISMAID === idTable) {
          if (el.OKEY) {
            obj.okey.push(el);
          } else {
            obj.okeysiz.push(el);
          }
        }
      }
    );

    setTrailTable(obj);
  }, [tableData, idTable]);

  return { trailData: trailTable, refetch };
};

export const DetailTableLogic = ({
  id,
  idTable,
}: {
  id: number;
  idTable: number;
}) => {
  const [data, setData]: any = useState([]);
  const { data: tableData, refetch } = useQuery(
    ["GET_DETAIL_DATA_TABLE", id],
    () => {
      return axios.get(`${API_URL}/labreceteurun/?LABRECETEID=${id}`);
    },
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    setData(
      tableData?.data?.data?.filter(
        (el: { LABRECETEATISID: number }) => el.LABRECETEATISID === idTable
      )
    );
  }, [tableData, idTable]);

  return { detailData: data, refetch };
};

export const TableHeadersLogic = () => {
  const headColumns = useMemo(() => {
    return [
      {
        title: "HAMADI",
        id: "HAMADI",
        width: 105,
        render: (val: string) => {
          return <p>{val}</p>;
        },
      },

      {
        title: "CALISMATARIHI",
        id: "CALISMATARIHI",
        width: 112,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "TERMINTARIHI",
        id: "TERMINTARIHI",
        width: 110,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "HAMID",
        id: "HAMID",
        width: 40,
      },
      {
        title: "KULLANICIADI",
        id: "KULLANICIADI",
        width: 95,
      },

      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 115,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "BIRIMFIYAT",
        id: "BIRIMFIYAT",
        width: 75,
      },
      {
        title: "DOVIZID",
        id: "DOVIZID",
        width: 60,
      },
      {
        title: "USTASAMAID",
        id: "USTASAMAID",
        width: 90,
      },
      {
        title: "USTASAMAADI",
        id: "USTASAMAADI",
        width: 120,
      },
      {
        title: "ILKKAYDERTARIHI",
        id: "ILKKAYDERTARIHI",
        width: 115,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);

  const trailHeadColumns = useMemo(() => {
    return [
      {
        title: "ATISNO",
        id: "ATISNO",
        width: 55,
      },
      {
        title: "ATISTARIHI",
        id: "ATISTARIHI",
        width: 77,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "MIKTAR",
        id: "BOYAYUZDESI",
        width: 63,
        render: (val: number) => {
          return val.toString().substring(0, 8);
        },
      },
      {
        title: "BIRIM",
        id: "BIRIM",
        width: 50,
        render: () => {
          return <p>%</p>;
        },
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 115,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "TARIHI",
        id: "TARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);
  const detailHeadColumns = useMemo(() => {
    return [
      {
        title: "SIRA",
        id: "SIRA",
        width: 30,
      },
      {
        title: "URUNID",
        id: "URUNID",
        width: 155,
        render: (val: string) => {
          return val.substring(0, 19);
        },
      },
      {
        title: "URUNADI",
        id: "URUNADI",
        width: 155,
        render: (val: string) => {
          return val.substring(0, 19);
        },
      },

      {
        title: "MIKTARYUZDE",
        id: "MIKTARYUZDE",
        width: 50,
        render: (val: string) => {
          return val.toString().substring(0, 5);
        },
      },
      {
        title: "HASEPBIRIMI",
        id: "HASEPBIRIMI",
        width: 83,
        render: () => "%",
      },
      {
        title: "BIRIMFIYAT",
        id: "BIRIMFIYAT",
        width: 77,
        render: (val: number) => val.toString().substring(0, 8),
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);

  return { headColumns, trailHeadColumns, detailHeadColumns };
};
