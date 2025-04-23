import { useForm } from "react-hook-form";
import HFInputMask from "../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../components/UI/Options/Table";
import { useEffect } from "react";
import { DetailsFormLogic } from "./Logic";
import { CloseIcon } from "../../../components/UI/IconGenerator/Svg";
import { useTranslationHook } from "../../../hooks/useTranslation";
import dayjs from "dayjs";
import { useGetUrunList } from "../../../hooks/useFetchRequests/useUrunList";
import { useGetBirimList } from "../../../hooks/useFetchRequests/useBirimList";
import { useGetDepoList } from "../../../hooks/useFetchRequests/useDepoList";

interface TableFormProps {
  setOpen: (val: boolean) => void;
  defaultData?: Partial<any>;
  refetch: () => void;
  formId?: string | number | undefined;
}
interface FormData {
  BARKODKODU: string;
  URUNID: string;
  URUNADI: string;
  MIKTAR: number;
  URUNBIRIMID: number;
  BIRIMFIYAT: number;
  BIRIMID: string;
  DEPOID: string;
  DEGISIMTARIHI: string;
}

export const TableForm = ({
  setOpen,
  defaultData = {},
  formId = "",
  refetch = () => {},
}: TableFormProps) => {
  const { t } = useTranslationHook();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    mode: "onSubmit",
  });

  const { setFilterParams, filterParams, urunData } = useGetUrunList({});
  const {
    setFilterParams: setDepoFilterParams,
    filterParams: depoFilterParams,
    depoData,
  } = useGetDepoList();
  const {
    birimData,
    setFilterParams: setFilterParamsBirim,
    filterParams: filterParamsBirim,
  } = useGetBirimList({
    enabled: "q",
  });

  const { createForm, updateForm, formData } = DetailsFormLogic({
    setOpen,
    formId,
    refetch,
  });

  const onSubmit = (data: any) => {
    if (formId) {
      const params: any = data;
      params.URUNRECETEURUNID = defaultData?.URUNRECETEURUNID;
      updateForm(params, formId);
    } else {
      const params: any = data;
      params.DEGISIMTARIHI = dayjs();
      params.KULLANICIID = "1";
      params.URUNRECETEURUNID = defaultData?.URUNRECETEURUNID;
      delete params.BIRIMID;
      delete params.URUNADI;
      createForm(params);
    }
  };

  useEffect(() => {
    if (birimData?.data?.length) {
      setValue("URUNBIRIMID", birimData?.data[0]?.URUNBIRIMID);
      setValue("BIRIMID", birimData?.data[0]?.BIRIMID);
    }
  }, [birimData]);

  useEffect(() => {
    if (formData?.URUNID) {
      setFilterParams({
        ...filterParams,
        q: `URUNID=${formData.URUNID}`,
      });
      setValue("URUNID", formData.URUNID);
      setValue("URUNADI", formData.URUNADI);
      setValue("MIKTAR", formData.MIKTAR);
      setValue("DEPOID", formData.DEPOID);
      setValue("URUNBIRIMID", formData.URUNBIRIMID);
      setValue("DEGISIMTARIHI", formData.DEGISIMTARIHI);
    }
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-y-3 bg-white shadow-2xl p-4 rounded-[8px] z-[99] border border-[var(--border)] w-[350px]"
    >
      <div className="flex justify-between mb-2">
        <div className="w-[20px]"></div>
        <h2>{t("document_content")}</h2>
        <div className="w-[20px] cursor-pointer" onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
      </div>

      <SelectOptionsTable
        name="DEPOID"
        label={t("DEPOID")}
        focused={true}
        placeholder={t("DEPOID")}
        options={depoData?.data ?? []}
        required={true}
        headColumns={[
          { id: "DEPOID", title: "DEPOID" },
          { id: "ADI", title: "ADI" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("DEPOID", obj.DEPOID);
          setDepoFilterParams({
            ...depoFilterParams,
            q: `DEPOID=${obj.DEPOID}`,
          });
        }}
        control={control}
        handleSearch={(val: string) => {
          setDepoFilterParams({ ...depoFilterParams, q: val });
        }}
        setFilterParams={setDepoFilterParams}
        defaultValue={formData?.DEPOID}
      />

      <SelectOptionsTable
        name="URUNID"
        label={t("URUNID")}
        placeholder={t("URUNID")}
        options={urunData?.data ?? []}
        required={true}
        headColumns={[
          { id: "BARKOD", title: "BARKOD" },
          { id: "ADI", title: "URUNADI", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("URUNADI", obj.ADI);
          setFilterParamsBirim({
            ...filterParamsBirim,
            q: `URUNID=${obj.URUNID}`,
          });
        }}
        control={control}
        handleSearch={(val: string) => {
          setFilterParams({ ...filterParams, q: val });
        }}
        setFilterParams={setFilterParams}
        defaultValue={formData?.URUNID}
      />

      <SelectOptionsTable
        name="URUNADI"
        label={t("URUNADI")}
        placeholder={t("URUNADI")}
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", width: 200, title: "BARKOD" },
          { id: "ADI", title: "URUNADI", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("URUNADI", obj.ADI);
          setFilterParamsBirim({
            ...filterParamsBirim,
            q: `&URUNID=${obj.URUNID}`,
          });
        }}
        handleSearch={(val: string) => {
          setFilterParams({ ...filterParams, q: val });
        }}
        control={control}
        setFilterParams={setFilterParams}
      />

      <div className="flex space-x-2 items-end">
        <HFInputMask
          control={control}
          name="MIKTAR"
          label={t("MIKTAR")}
          type="number"
          required={true}
          placeholder={t("MIKTAR")}
          defaultValue={formData?.MIKTAR}
        />
        <div className="w-[90px]">
          <SelectOptionsTable
            name="BIRIMID"
            options={birimData?.data ?? []}
            required={true}
            headColumns={[
              { id: "BIRIMID", title: "Birim id" },
              { id: "BIRIMADI", title: "Adi" },
              { id: "CARPAN", title: "CARPAN" },
            ]}
            filterParams={filterParamsBirim}
            handleSelect={(obj: any) => {
              setValue("BIRIMID", obj.BIRIMID);
              setValue("URUNBIRIMID", obj.URUNBIRIMID);
            }}
            defaultValue={0}
            readOnly={true}
            control={control}
            setFilterParams={setFilterParamsBirim}
          />
        </div>
      </div>

      <div className="flex space-x-2 mt-3">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpen(false)}
        >
          {t("cancel")}
        </button>
        <button className="custom-btn save" type="submit">
          {formId ? t("edit") : t("save")}
        </button>
      </div>
    </form>
  );
};
