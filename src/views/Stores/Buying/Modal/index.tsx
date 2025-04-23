import { ReactNode, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { ModalLogic } from "../Logic";
import { FetchModal } from "./Logic";
import { TableForm } from "./TableForm";
import HFSelect from "../../../../components/HFElements/HFSelect";
import HFTextField from "../../../../components/HFElements/HFTextField";
import dayjs from "dayjs";
import CNewTable from "../../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./Validate";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { GetCurrentDate } from "../../../../utils/getDate";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { IBuyingForm, ModalTypes } from "../interfaces";

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

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  IRSALIYEID?: number;
  ADI?: string;
  URUNID?: string;
  DEPOID?: string;
  FIRMAID?: string;
  URUNBIRIMADI?: string;
  getList?: () => void;
}

export const ModalUI = ({ defaultData = {}, getList }: ModalUIProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslationHook();
  const [formId, setFormId] = useState<string>("");
  const [modalInitialData, setModalInitialData] = useState<ModalUIProps>({});

  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [filterParamsFirma, setFilterParamsFirma] = useState<IFilterParams>({
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
  const { depoOptions, dovizOptions, firmaData } = ModalLogic({
    filterParamsDepo,
    filterParamsFirma,
  });
  const {
    formData,
    tableData,
    refetch,
    deleteElement,
    createElement,
    updateElement,
  } = FetchModal({
    formId: formId,
    urunId: modalInitialData?.URUNID,
    setFormId,
    getList,
  });

  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (defaultData?.IRSALIYEID) {
      setFormId(defaultData.IRSALIYEID);
    }
  }, [defaultData]);

  const onSubmit: SubmitHandler<IBuyingForm> = (data) => {
    let params: Partial<any> = data;

    params.FIILISEVKTARIHI = dayjs();

    if (formId) {
      params = { ...formData, ...params };
      params.INSERTTARIHI = dayjs();
      params.IRSALIYETARIHI = formData.IRSALIYETARIHI;
      updateElement(params);
    } else {
      params.NOTU = "";
      params.HAREKETTIPI = 1;
      params.SINIF = "B";
      params.INSERTKULLANICIID = 1;
      params.KULLANICIID = 1;
      params.DEGISIMTARIHI = dayjs();
      params.IRSALIYETARIHI = dayjs();
      params.INSERTTARIHI = dayjs();
      params.IRSALIYENO = +params.IRSALIYENO;
      params.IRSALIYEID = defaultData.IRSALIYEID;

      createElement(params);
    }
  };

  const handleActions = (el: any, type: string) => {
    if (type === "edit" || type === "view") {
      setOpen(true);
      setModalInitialData(el);
    }

    if (type === "delete") {
      deleteElement([el.STOKDETAYID]);
    }

    if (type === "delete_multiple") {
      deleteElement(
        el.map((item: { STOKDETAYID: number }) => {
          return item.STOKDETAYID;
        })
      );
    }

    if (type === "modal") {
      setOpen(true);
      setModalInitialData({
        IRSALIYEID: formData.IRSALIYEID,
        DEPOID: formData.DEPOID,
        FIRMAID: formData.FIRMAID,
        URUNBIRIMADI: formData?.URUNBIRIMADI,
      });
    }
  };

  useEffect(() => {
    if (formData?.DEPOID) {
      setValue("DEPOID", formData.DEPOID);
      setValue("TRANSFERDEPOID", formData.TRANSFERDEPOID);
      setValue("IRSALIYEID", formData.IRSALIYEID);
      setValue(
        "INSERTTARIHI",
        dayjs(formData?.INSERTTARIHI).format("DD.MM.YYYY HH:MM")
      );
      setValue(
        "IRSALIYETARIHI",
        dayjs(formData?.IRSALIYETARIHI).format("DD.MM.YYYY")
      );
      setValue("IRSALIYENO", formData.IRSALIYENO);
      setValue("FIRMAID", formData.FIRMAID);
      setValue("FIRMAADI", formData.FIRMAADI);
      setValue("DOVIZID", formData.DOVIZID);
    } else {
      setValue(
        "IRSALIYENO",
        defaultData.IRSALIYENO ? defaultData.IRSALIYENO + 1 + "" : ""
      );
    }
  }, [formData, defaultData]);

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex space-x-4">
          <div className="grid grid-cols-3 gap-x-5 gap-y-2 pb-10 w-full">
            <div className="space-y-2">
              <FieldUI title={t("IRSALIYENO")}>
                <div className="flex items-center space-x-2">
                  <HFTextField
                    control={control}
                    name="IRSALIYENO"
                    defaultValue={formData?.IRSALIYEID}
                  />
                </div>
              </FieldUI>
              <FieldUI title={t("tarih")}>
                <HFTextField
                  control={control}
                  name="IRSALIYETARIHI"
                  disabled={true}
                />
              </FieldUI>
              <FieldUI title={t("INSERTTARIHI")}>
                <HFTextField
                  control={control}
                  name="INSERTTARIHI"
                  disabled={true}
                />
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title={t("FIRMAID")}>
                <SelectOptionsTable
                  name="FIRMAID"
                  placeholder={t("FIRMAID")}
                  options={firmaData}
                  required={true}
                  headColumns={[
                    { id: "FIRMAID", width: 200, title: "FIRMAID" },
                    { id: "FIRMAADI", title: "FIRMAADI" },
                    { id: "KISAADI", title: "KISAADI" },
                  ]}
                  filterParams={filterParams}
                  handleSelect={(obj: any) => {
                    setValue("FIRMAID", obj.FIRMAID);
                    setValue("FIRMAADI", obj.FIRMAADI);
                  }}
                  handleSearch={(val: string) => {
                    setFilterParamsFirma({ ...filterParamsFirma, q: val });
                  }}
                  control={control}
                  setFilterParams={setFilterParams}
                />
              </FieldUI>
              <FieldUI title={t("FIRMAADI")}>
                <SelectOptionsTable
                  name="FIRMAADI"
                  placeholder={t("FIRMAADI")}
                  options={firmaData}
                  required={true}
                  headColumns={[
                    { id: "FIRMAID", width: 200, title: "FIRMAID" },
                    { id: "FIRMAADI", title: "FIRMAADI" },
                    { id: "KISAADI", title: "KISAADI" },
                  ]}
                  filterParams={filterParams}
                  handleSelect={(obj: any) => {
                    setValue("FIRMAID", obj.FIRMAID);
                    setValue("FIRMAADI", obj.FIRMAADI);
                  }}
                  handleSearch={(val: string) => {
                    setFilterParamsFirma({ ...filterParamsFirma, q: val });
                  }}
                  control={control}
                  setFilterParams={setFilterParams}
                />
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title={t("DEPOID")}>
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
                />
              </FieldUI>
              <FieldUI title={t("DOVIZID")}>
                <HFSelect
                  name="DOVIZID"
                  control={control}
                  options={dovizOptions}
                  handleClick={(obj: { DOVIZID: string }) => {
                    setValue("DOVIZID", obj.DOVIZID);
                  }}
                  defaultValue="USD"
                />
              </FieldUI>
            </div>
          </div>
          <div className="space-y-2 flex justify-end">
            <button
              className={`custom-btn`}
              type="submit"
              style={{ minWidth: "140px" }}
            >
              {t(formId ? "edit" : "create")}
            </button>
          </div>
        </div>

        <CollapseUI
          title={t("document_content")}
          defaultOpen={true}
          disabled={!formId}
        >
          <CNewTable
            disabled={!formId}
            key={tableData?.data?.length + ""}
            headColumns={headColumns}
            bodyColumns={tableData?.data ?? []}
            handleActions={handleActions}
            isLoading={false}
            filterParams={filterParams}
            autoHeight={"440px"}
            disablePagination={true}
            idForTable="stokdetay_modal"
            animation={false}
            handleFilterParams={setFilterParams}
          />
        </CollapseUI>
      </form>

      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
          <TableForm
            setOpen={setOpen}
            defaultData={modalInitialData}
            refetch={refetch}
          />

          <div
            className="w-[100vw] h-[100vh] bg-[#00000044] fixed z-[91]"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};
