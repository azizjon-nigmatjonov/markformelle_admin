import { ReactNode, useEffect, useMemo, useState } from "react";
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
const schema = Validation;

const FieldUI = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between space-x-3 whitespace-nowrap">
      <p className="text-sm">{title}</p>
      <hr className="w-[90%] border-t-[3px] border-dotted border-[var(--border)]" />
      <div className="max-w-[50%] min-w-[50%]">{children}</div>
    </div>
  );
};

export const ModalUI = ({
  element = {} as Partial<ITransferElement>,
  modalList = [],
  setModalList = () => {},
  irsaliyaNo,
  getList,
}: {
  element: Partial<ITransferElement>;
  setModalList: (list: ITransferElement[]) => void;
  modalList: ITransferElement[];
  irsaliyaNo: number;
  getList: () => void;
}) => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [depoId, setDepoId]: any = useState(element?.DEPOID);
  const [irsaliyaId, setIrsaliyaId]: any = useState(element.id);
  const [tableOpen, setTableOpen] = useState(!!depoId);
  const [selectedRow, setSelectedRow] = useState<ITransferElement | null>(null);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [filterParamsDepo, setFilterParamsDepo] = useState<
    Partial<IFilterParams>
  >({
    page: 1,
    perPage: 100,
    q: "",
  });
  const { handleActionsModal, depoOptions, dovizOptions } = ModalLogic({
    setModalList,
    modalList,
    filterParamsDepo,
  });
  const { defaultData, tableData, refetch, deleteElement } = FetchModal({
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
    if (defaultData?.IRSALIYETARIHI) {
      setValue(
        "IRSALIYETARIHI",
        dayjs(defaultData?.IRSALIYETARIHI).format("DD.MM.YYYY")
      );
    } else {
      setValue("IRSALIYETARIHI", dayjs().format("DD.MM.YYYY"));
    }

    if (defaultData?.INSERTTARIHI) {
      setValue(
        "INSERTTARIHI",
        dayjs(defaultData?.INSERTTARIHI).format("DD.MM.YYYY HH:MM")
      );
    } else {
      setValue("INSERTTARIHI", dayjs().format("DD.MM.YYYY HH:MM"));
    }
  }, [defaultData]);

  useEffect(() => {
    if (defaultData?.DEPOID) {
      setValue("DEPOID", defaultData.DEPOID);
      setValue("TRANSFERDEPOID", defaultData.TRANSFERDEPOID);
      setValue("IRSALIYENO", defaultData.IRSALIYEID);
    } else {
      setValue("IRSALIYENO", irsaliyaNo + 1 + "");
    }
  }, [defaultData, irsaliyaNo]);

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
      title={`Документ перемещения ${
        element.IRSALIYENO ? "№" + element.IRSALIYENO : ""
      }`}
      action="add"
      handleActions={handleActionsModal}
      element={element}
      list={modalList}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex space-x-4">
          <div className="grid grid-cols-3 gap-x-5 gap-y-2 pb-5 w-full">
            <div className="space-y-2">
              <FieldUI title={t("IRSALIYENO")}>
                <div className="flex items-center space-x-2">
                  <HFTextField
                    control={control}
                    name="IRSALIYENO"
                    defaultValue={defaultData?.IRSALIYEID}
                  />
                </div>
              </FieldUI>
              <FieldUI title={t("IRSALIYETARIHI")}>
                <HFTextField
                  control={control}
                  name="IRSALIYETARIHI"
                  readOnly={true}
                />
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title={t("DEPOID")}>
                <SelectOptionsTable
                  name="DEPOID"
                  placeholder="Depo no"
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
              </FieldUI>
              <FieldUI title={t("DOVIZID")}>
                <HFSelect
                  name="DOVIZID"
                  control={control}
                  options={dovizOptions}
                  defaultValue="USD"
                />
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title={t("TRANSFERDEPOID")}>
                <SelectOptionsTable
                  name="TRANSFERDEPOID"
                  placeholder="Transfer depo no"
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
              </FieldUI>
              <FieldUI title={t("INSERTTARIHI")}>
                <HFTextField
                  control={control}
                  name="INSERTTARIHI"
                  readOnly={true}
                />
              </FieldUI>
            </div>
          </div>
          <div className="space-y-2 flex justify-end">
            <button
              className={`custom-btn ${tableOpen ? "disabled" : ""}`}
              type={tableOpen ? "button" : "submit"}
              style={{ maxWidth: "100px" }}
            >
              Создавать
            </button>
          </div>
        </div>

        {tableOpen ? (
          <CollapseUI
            title="Содержание документа"
            defaultOpen={tableOpen}
            disabled={true}
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
        ) : (
          ""
        )}
      </form>

      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
          <TableForm
            setOpen={setOpen}
            defaultData={{
              ...selectedRow,
              ...defaultData,
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
