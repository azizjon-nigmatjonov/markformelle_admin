import { useForm } from "react-hook-form";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useEffect } from "react";
import { DetailsFormLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import dayjs from "dayjs";
import { useGetUrunList } from "../../../../hooks/useFetchRequests/useUrunList";
import { useGetBirimList } from "../../../../hooks/useFetchRequests/useBirimList";

interface TableFormProps {
  setOpen: (val: boolean) => void;
  refetch: () => void;
  formId?: string | number | undefined;
}
interface FormData {
  URUNID: string;
  URUNADI: string;
  URUNBIRIMID: number;
  BIRIMID: string;
  INSERTTARIHI: string;
  CARPAN: number;
  ADI: string;
  KULLANICIADI?: string;
}

export const TableForm = ({
  setOpen,
  formId = "",
  refetch = () => {},
}: TableFormProps) => {
  const { t } = useTranslationHook();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    mode: "onSubmit",
  });

  const {
    setFilterParams: setUrunFilterParams,
    filterParams: urunFilterParams,
    urunData,
  } = useGetUrunList({});

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
    const params: any = data;
    if (formId) {
      params.INSERTKULLANICIID = formData.INSERTKULLANICIID;
      params.INSERTTARIHI = formData.INSERTTARIHI;
      params.KULLANICIID = formData.KULLANICIID;
      params.DEGISIMTARIHI = formData.DEGISIMTARIHI;
      console.log("params", params);

      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      // params.KULLANICIADI = "Supervisor";
      // params.INSERKULLANICIADI = 'Superviser'
      params.CARPAN = +params.CARPAN;
      params.DEFAULTBIRIM = params.URUNBIRIMID;
      params.RECETEDEFAULTBIRIM = null;
      params.BARKODDEFAULTBIRIM = null;
      delete params.ADI;

      // delete params.BIRIMID;
      // delete params.URUNADI;

      console.log("params", params);

      createForm(params);
    }
  };

  useEffect(() => {
    if (formData?.URUNID) {
      setFilterParamsBirim({
        ...filterParamsBirim,
        q: `URUNID=${formData.URUNID}`,
      });
      setValue("CARPAN", formData.CARPAN);
      setValue("URUNID", formData.URUNID);
      setValue("ADI", formData.URUNADI);
      setValue("BIRIMID", formData.BIRIMID);
      setValue("URUNBIRIMID", formData.URUNBIRIMID);
      setValue("KULLANICIADI", formData.KULLANICIADI);
    } else {
      setValue("URUNBIRIMID", 1);
      setValue("BIRIMID", "Kg");
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
        name="URUNID"
        label={t("URUNID")}
        focused={true}
        placeholder={t("URUNID")}
        options={urunData?.data ?? []}
        required={true}
        headColumns={[
          { id: "URUNID", title: "URUNID" },
          { id: "ADI", title: "ADI" },
        ]}
        filterParams={urunFilterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
          setFilterParamsBirim({
            ...filterParamsBirim,
            q: `URUNID=${obj.URUNID}`,
          });
        }}
        control={control}
        handleSearch={(val: string) => {
          setUrunFilterParams({ ...urunFilterParams, q: val });
        }}
        setFilterParams={setUrunFilterParams}
        defaultValue={formData?.URUNID}
      />

      <SelectOptionsTable
        name="ADI"
        label={t("URUNADI")}
        focused={true}
        placeholder={t("URUNADI")}
        options={urunData?.data ?? []}
        required={true}
        headColumns={[
          { id: "URUNID", title: "URUNID" },
          { id: "ADI", title: "ADI" },
        ]}
        filterParams={urunFilterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
          setFilterParamsBirim({
            ...filterParamsBirim,
            q: `URUNID=${obj.URUNID}`,
          });
        }}
        control={control}
        handleSearch={(val: string) => {
          setUrunFilterParams({ ...urunFilterParams, q: val });
        }}
        setFilterParams={setUrunFilterParams}
        defaultValue={formData?.URUNID}
      />

      <div className="flex space-x-2 items-end">
        <HFInputMask
          control={control}
          name="CARPAN"
          label={t("CARPAN")}
          type="number"
          required={true}
          placeholder={t("CARPAN")}
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
              console.log("ob", obj);

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

      {/* <HFTextField
        name="KULLANICIADI"
        control={control}
        setValue={setValue}
        disabled={!!formId}
      /> */}
      <div className="flex space-x-2 mt-3">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpen(false)}
        >
          {t("cancel")}
        </button>
        <button className="custom-btn save" type="submit">
          {t(formId ? "update" : "create")}
        </button>
      </div>
    </form>
  );
};
