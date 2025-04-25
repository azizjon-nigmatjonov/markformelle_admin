import { useForm } from "react-hook-form";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useEffect } from "react";
import { DetailsFormLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import dayjs from "dayjs";
import { useGetBirimTypeList } from "../../../../hooks/useFetchRequests/useBrimTypesList";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import HFTextField from "../../../../components/HFElements/HFTextField";
import CLabel from "../../../../components/CElements/CLabel";

interface TableFormProps {
  setOpen: (val: boolean) => void;
  refetch: () => void;
  formId?: string | number | undefined;
  defaultValue?: any;
}
interface FormData {
  URUNID: string;
  URUNADI: string;
  URUNBIRIMID: number;
  BIRIMID: string;
  INSERTTARIHI: string;
  CARPAN: number;
  DEFAULTBIRIM?: string;
  KULLANICIADI?: string;
}

export const TableForm = ({
  setOpen,
  formId = "",
  refetch = () => {},
  defaultValue = {},
}: TableFormProps) => {
  const { t } = useTranslationHook();
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>({
    mode: "onSubmit",
  });

  const {
    birimTypeData,
    setFilterParams: setFilterParamsBirim,
    filterParams: filterParamsBirim,
  } = useGetBirimTypeList({});

  const { createForm, updateForm, formData } = DetailsFormLogic({
    setOpen,
    formId,
    refetch,
  });

  const onSubmit = (data: any) => {
    let params: any = data;

    if (formData?.INSERTTARIHI) {
      params = { ...formData, ...data };
      params.DEFAULTBIRIM = +params.DEFAULTBIRIM;

      updateForm(params, formId);
    } else {
      delete params.ADI;
      delete params.URUNBIRIMID;

      params.DEFAULTBIRIM = +params.DEFAULTBIRIM;
      params.RECETEDEFAULTBIRIM = null;
      params.BARKODDEFAULTBIRIM = null;
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.DEGISIMTARIHI = dayjs();
      params.KULLANICIID = 1;

      createForm(params);
    }
  };

  useEffect(() => {
    if (formData?.URUNID) {
      setValue("CARPAN", formData.CARPAN);
      setValue("URUNID", formData.URUNID);
      setValue("BIRIMID", formData.BIRIMID);
      setValue("URUNBIRIMID", formData.URUNBIRIMID);
      setValue("KULLANICIADI", formData.KULLANICIADI);
      setValue("DEFAULTBIRIM", "" + formData.DEFAULTBIRIM);
    } else {
      setValue("URUNBIRIMID", 1);
      setValue("BIRIMID", "Kg");
      setValue("CARPAN", 1);
      setValue("DEFAULTBIRIM", "0");
    }
  }, [formData]);

  useEffect(() => {
    if (defaultValue?.URUNID) {
      setValue("URUNID", defaultValue.URUNID);
    }
  }, [defaultValue]);

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

      <HFTextField
        control={control}
        name="URUNID"
        placeholder={t("URUNID")}
        label={t("URUNID")}
        disabled={true}
      />

      <div className="grid grid-cols-2 gap-x-2 items-end">
        <SelectOptionsTable
          name="BIRIMID"
          label={t("BIRIMID")}
          options={birimTypeData?.data ?? []}
          required={true}
          headColumns={[
            { id: "BIRIMID", title: "Birim id" },
            { id: "BIRIMADI", title: "Adi" },
            { id: "CARPAN", title: "CARPAN" },
          ]}
          filterParams={filterParamsBirim}
          handleSelect={(obj: any) => {
            setValue("BIRIMID", obj.BIRIMID);
            setValue("CARPAN", obj.CARPAN);
          }}
          defaultValue={0}
          readOnly={true}
          control={control}
          position="right"
          setFilterParams={setFilterParamsBirim}
        />
        <SelectOptionsTable
          name="CARPAN"
          options={birimTypeData?.data ?? []}
          required={true}
          headColumns={[
            { id: "BIRIMID", title: "Birim id" },
            { id: "BIRIMADI", title: "Adi" },
            { id: "CARPAN", title: "CARPAN" },
          ]}
          placeholder={t("BIRIMID")}
          filterParams={filterParamsBirim}
          handleSelect={(obj: any) => {
            setValue("BIRIMID", obj.BIRIMID);
            setValue("CARPAN", obj.CARPAN);
          }}
          defaultValue={0}
          readOnly={true}
          control={control}
          position="right"
          setFilterParams={setFilterParamsBirim}
        />
      </div>
      <div>
        <CLabel title={t("DEFAULTBIRIM")} />
        <CCheckbox
          element={{ label: t("DEFAULTBIRIM") }}
          checked={getValues("DEFAULTBIRIM") == "1"}
          handleCheck={(obj: { checked: boolean }) => {
            setValue("DEFAULTBIRIM", obj.checked ? "1" : "0");
          }}
        />
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
          {t(formId ? "update" : "create")}
        </button>
      </div>
    </form>
  );
};
