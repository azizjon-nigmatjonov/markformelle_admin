import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ITransferElement,
  ITransferFormData,
} from "../../../../interfaces/transfers";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { ModalLogic } from "../Logic";
import { FetchModal } from "./Logic";
import { TableForm } from "./TableForm";
import HFSelect from "../../../../components/HFElements/HFSelect";
import HFTextField from "../../../../components/HFElements/HFTextField";
import dayjs from "dayjs";
import CNewModal from "../../../../components/CElements/CNewModal";
import CNewTable from "../../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./Validate";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { convertToISO, GetCurrentDate } from "../../../../utils/getDate";
const API_URL = import.meta.env.VITE_TEST_URL;
import axios from "axios";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
const schema = Validation;

export const ModalUI = ({
  defaultData = {} as Partial<ITransferElement>,
  irsaliyaNo,
  getList,
  handleActionsModal,
}: {
  defaultData: Partial<ITransferElement>;
  irsaliyaNo: number;
  getList: () => void;
  handleActionsModal: (val: string, element?: any) => void;
}) => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [depoId, setDepoId]: any = useState(defaultData?.DEPOID);
  const [irsaliyaId, setIrsaliyaId]: any = useState(defaultData.IRSALIYENO);
  const [tableOpen, setTableOpen] = useState(!!depoId);
  const [selectedRow, setSelectedRow] = useState<ITransferElement | null>(null);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  console.log("irsaliyaNo", irsaliyaNo);

  const [filterParamsDepo, setFilterParamsDepo] = useState<
    Partial<IFilterParams>
  >({
    page: 1,
    perPage: 100,
    q: "",
  });
  const { depoOptions, dovizOptions } = ModalLogic({
    filterParamsDepo,
  });
  const {
    defaultData: defaults,
    tableData,
    refetch,
    deleteElement,
  } = FetchModal({
    id: irsaliyaId,
    urunId: selectedRow?.URUNID,
  });

  const { control, handleSubmit, setValue } = useForm<ITransferFormData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const createElement = async (params: any) => {
    try {
      const { data } = await axios.post(`${API_URL}/irsaliye/`, params);

      setDepoId(data.DEPOID);
      setIrsaliyaId(data.IRSALIYEID);

      await getList();

      setTableOpen(true);
    } catch (error) {
      console.error("Error creating element:", error);
      return null;
    }
  };

  const onSubmit: SubmitHandler<ITransferFormData> = (data) => {
    const params: Partial<any> = {
      HAREKETTIPI: 5,
      FIRMAID: null,
      NOTU: "",
      SINIF: "B",
      INSERTKULLANICIID: 1,
      KULLANICIID: 1,
      DEGISIMTARIHI: "2025-03-26T11:06:37.447Z",
      IRSALIYENO: data.IRSALIYENO ? String(data.IRSALIYENO) : "",
      IRSALIYETARIHI: data.IRSALIYETARIHI,
      INSERTTARIHI: String(data.INSERTTARIHI),
      DEPOID: data.DEPOID ? String(data.DEPOID) : undefined, //
      TRANSFERDEPOID: data.TRANSFERDEPOID
        ? String(data.TRANSFERDEPOID)
        : undefined,
      DOVIZID: data.DOVIZID ? String(data.DOVIZID) : undefined,
    };

    params.INSERTTARIHI = dayjs();
    params.FIILISEVKTARIHI = dayjs();

    params.IRSALIYETARIHI = convertToISO(dayjs().format("DD.MM.YYYY"));

    createElement(params);
  };

  const handleActions = (el: ITransferElement, type: string) => {
    if (type === "edit" || type === "view") {
      setOpen(true);
      setSelectedRow(el);
    }

    if (type === "delete") {
      deleteElement([el.STOKDETAYID]);
    }

    if (type === "modal") {
      setOpen(true);
      setSelectedRow(null);
    }
  };

  useEffect(() => {
    if (defaults?.IRSALIYETARIHI) {
      setValue(
        "IRSALIYETARIHI",
        dayjs(defaults?.IRSALIYETARIHI).format("DD.MM.YYYY")
      );
    } else {
      setValue("IRSALIYETARIHI", dayjs().format("DD.MM.YYYY"));
    }

    if (defaults?.INSERTTARIHI) {
      setValue(
        "INSERTTARIHI",
        dayjs(defaults?.INSERTTARIHI).format("DD.MM.YYYY HH:MM")
      );
    } else {
      setValue("INSERTTARIHI", dayjs().format("DD.MM.YYYY HH:MM"));
    }
  }, [defaults]);
  console.log("defaults", defaults);

  useEffect(() => {
    if (defaults?.DEPOID) {
      setValue("DEPOID", defaults.DEPOID);
      setValue("TRANSFERDEPOID", defaults.TRANSFERDEPOID);
      setValue("IRSALIYENO", defaults.IRSALIYEID);
    } else {
      setValue("IRSALIYENO", irsaliyaNo + 1 + "");
    }
  }, [defaults?.DEPOID, irsaliyaNo]);

  const headColumns = useMemo(() => {
    return [
      { id: "STOKDETAYID", title: "STOKDETAYID", width: 80 },
      { id: "URUNID", title: "URUNID" },
      { id: "URUNADI", title: "URUN +ADI" },
      { id: "MIKTAR", title: "MIKTAR" },
      { id: "URUNBIRIMADI", title: "URUNBIRIM ADI" },
      { id: "URUNTIPIADI", title: "URUNTIPI ADI" },
      { id: "KULLANICIADI", title: "KULLANICI ADI" },

      {
        id: "DEGISIMTARIHI",
        title: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ type: "usually", date: val });
        },
      },
    ];
  }, []);

  return (
    <CNewModal
      title={`${t("document_transfer")} ${
        defaultData.IRSALIYENO ? "№" + defaultData.IRSALIYENO : ""
      }`}
      action="add"
      handleActions={handleActionsModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex space-x-4">
          <div className="grid grid-cols-3 gap-x-5 gap-y-2 pb-5 w-full">
            <div className="space-y-2">
              <InputFieldUI title={t("IRSALIYENO")}>
                <div className="flex items-center space-x-2">
                  <HFTextField
                    control={control}
                    name="IRSALIYENO"
                    defaultValue={defaults?.IRSALIYEID}
                    disabled={tableOpen}
                  />
                </div>
              </InputFieldUI>
              <InputFieldUI title={t("IRSALIYETARIHI")}>
                <HFTextField
                  control={control}
                  name="IRSALIYETARIHI"
                  disabled={true}
                />
              </InputFieldUI>
            </div>

            <div className="space-y-2">
              <InputFieldUI title={t("DEPOID")}>
                <SelectOptionsTable
                  name="DEPOID"
                  placeholder={t("DEPOID")}
                  options={depoOptions}
                  required={true}
                  headColumns={[
                    { id: "DEPOID", width: 200, title: "DEPOID" },
                    { id: "ADI", title: "ADI" },
                  ]}
                  filterParams={filterParams}
                  handleSelect={(obj: any) => {
                    setValue("DEPOID", obj.DEPOID);
                  }}
                  handleSearch={(val: string) => {
                    setFilterParamsDepo({ ...filterParamsDepo, q: val });
                  }}
                  control={control}
                  setFilterParams={setFilterParams}
                  disabled={tableOpen}
                />
              </InputFieldUI>
              <InputFieldUI title={t("DOVIZID")}>
                <HFSelect
                  name="DOVIZID"
                  control={control}
                  options={dovizOptions}
                  defaultValue="USD"
                  disabled={tableOpen}
                />
              </InputFieldUI>
            </div>

            <div className="space-y-2">
              <InputFieldUI title={t("TRANSFERDEPOID")}>
                <SelectOptionsTable
                  name="TRANSFERDEPOID"
                  placeholder={t("TRANSFERDEPOID")}
                  options={depoOptions}
                  required={true}
                  headColumns={[
                    { id: "DEPOID", width: 200, title: "DEPOID" },
                    { id: "ADI", title: "ADI" },
                  ]}
                  filterParams={filterParams}
                  handleSelect={(obj: any) => {
                    setValue("TRANSFERDEPOID", obj.DEPOID);
                  }}
                  handleSearch={(val: string) => {
                    setFilterParamsDepo({ ...filterParamsDepo, q: val });
                  }}
                  control={control}
                  setFilterParams={setFilterParams}
                  disabled={tableOpen}
                />
              </InputFieldUI>
              <InputFieldUI title={t("INSERTTARIHI")}>
                <HFTextField
                  control={control}
                  name="INSERTTARIHI"
                  disabled={true}
                />
              </InputFieldUI>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className={`custom-btn ${tableOpen ? "disabled" : ""}`}
              type={tableOpen ? "button" : "submit"}
              style={{ maxWidth: "100px" }}
            >
              {t("create")}
            </button>
          </div>
        </div>

        <CollapseUI
          title={t("document_content")}
          defaultOpen={true}
          // disabled={true}
        >
          <CNewTable
            title="Примешенныей"
            headColumns={headColumns}
            bodyColumns={tableData?.data ?? []}
            handleActions={handleActions}
            isLoading={false}
            filterParams={filterParams}
            autoHeight={"440px"}
            disablePagination={true}
            idForTable="modal"
            animation={false}
            clickable={true}
            handleFilterParams={setFilterParams}
          />
        </CollapseUI>
      </form>

      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
          <TableForm
            setOpen={setOpen}
            defaultData={{
              ...selectedRow,
              ...defaults,
              DEPOID: depoId,
            }}
            refetch={refetch}
          />

          <div
            className="w-[100vw] h-[100vh] bg-[#00000044] fixed z-[91]"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </CNewModal>
  );
};
