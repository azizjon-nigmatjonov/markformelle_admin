import { useForm } from "react-hook-form";
// import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useEffect, useState } from "react";
import { InnerModalLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { IFilterParams } from "../../../../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import dayjs from "dayjs";
import CLabel from "../../../../components/CElements/CLabel";

interface TableFormProps {
  setOpen: (val: boolean) => void;
  defaultData?: Partial<any>;
  refetch: () => void;
}
interface FormData {
  BARKODKODU: string;
  URUNID: string;
  URUNADI: string;
  MIKTAR: number;
  URUNBIRIMID: number;
  BIRIMFIYAT: number;
  BIRIMID: string;
  NOTU: string;
  STOKDETAYID: string;
}

export const TableForm = ({
  setOpen,
  defaultData = {},
  refetch = () => {},
}: TableFormProps) => {
  const { t } = useTranslationHook();
  const [formId, setFormId] = useState<string>("");
  const [filterParams, setFilterParams] = useState<Partial<IFilterParams>>({
    page: 1,
    perPage: 100,
    q: "",
  });
  const [filterParamsWeight, setFilterParamsWeight] = useState<
    Partial<IFilterParams>
  >({
    page: 1,
    perPage: 100,
  });
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>({
    mode: "onSubmit",
  });
  const { urunData, urunBirim, createStokElement, updateElement, formData } =
    InnerModalLogic({
      filterParams,
      filterParamsWeight,
      refetch,
      setOpen,
      formId,
    });

  const onSubmit = (data: any) => {
    let params: Partial<any> = data;

    if (defaultData?.URUNID) {
      params = { ...formData, ...params };
      delete params.BARKODKODU;
      delete params.BIRIMID;
      params.URUNBIRIMID = formData.URUNBIRIMID;
      updateElement(params, defaultData.STOKDETAYID);
    } else {
      params.HAREKETTIPI = 1;
      params.BIRIMFIYAT = +params.BIRIMFIYAT || +"0";
      params.TARIH = dayjs();
      params.DEPOID = defaultData.DEPOID;
      params.TRANSFERDEPOID = null;
      params.IRSALIYEID = defaultData.IRSALIYEID;
      params.FIRMAID = defaultData.FIRMAID;
      params.STOKVAR = true;
      params.INSERTKULLANICIID = 1;
      params.KULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.DEGISIMTARIHI = dayjs();

      delete params.URUNADI;
      createStokElement(params);
    }
  };

  useEffect(() => {
    if (formData?.URUNID) {
      // setFilterParams({
      //   ...filterParams,
      //   q: `URUNID=${formData.URUNID}`,
      // });
      setValue("URUNID", formData.URUNID);
      setValue("URUNADI", formData.URUNADI || formData.URUNID);
      setValue("STOKDETAYID", formData.STOKDETAYID);
      setValue("MIKTAR", formData.MIKTAR);
      setValue("BIRIMFIYAT", formData.BIRIMFIYAT);
      setValue("NOTU", formData.NOTU);
      setValue("BIRIMID", formData.BIRIMID);
      // setValue("URUNBIRIMID", formData.URUNBIRIMID);
    }
    if (urunBirim?.length) {
      setValue("BIRIMID", urunBirim?.[0]?.BIRIMID ?? "Kg");
      setValue("URUNBIRIMID", urunBirim?.[0]?.URUNBIRIMID);
    }
  }, [formData?.URUNID, urunBirim]);

  useEffect(() => {
    if (defaultData?.STOKDETAYID) {
      setFormId(defaultData.STOKDETAYID);
    }
  }, [defaultData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-2xl p-4 rounded-[8px] z-[99] border border-[var(--border)]"
    >
      <div className="flex justify-between mb-2">
        <div className="w-[20px]"></div>
        <h2>{t("document_content")}</h2>
        <div className="w-[20px] cursor-pointer" onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-8 mt-10">
        <div className="grid grid-cols-1 gap-y-3">
          {/* <HFTextField
            control={control}
            name="IRSALIYEID"
            label={t("IRSALIYEID")}
            placeholder={t("IRSALIYEID")}
            setValue={setValue}
            disabled
          /> */}

          {/* <HFTextField
            control={control}
            name="BARKODKODU"
            label={t("BARKODKODU")}
            placeholder={t("BARKODKODU")}
            setValue={setValue}
          /> */}

          <SelectOptionsTable
            name="URUNID"
            label={t("URUNID")}
            focused={true}
            placeholder={t("URUNID")}
            options={urunData?.data ?? []}
            required={true}
            headColumns={[
              { id: "BARKOD", width: 200, title: "BARKOD" },
              { id: "ADI", title: "URUNADI", innerId: "URUNID" },
            ]}
            filterParams={filterParams}
            handleSelect={(obj: any) => {
              setValue("URUNID", obj.URUNID);
              setValue("URUNADI", obj.ADI);
              setFilterParamsWeight({
                ...filterParamsWeight,
                q: `URUNID=${obj.URUNID}`,
              });
            }}
            control={control}
            handleSearch={(val: string) => {
              setFilterParams({ ...filterParams, q: val });
            }}
            setFilterParams={setFilterParams}
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
              setFilterParamsWeight({
                ...filterParamsWeight,
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
              label="Miktar"
              type="number"
              required={true}
              placeholder="Miktar"
            />
            <div className="w-[90px]">
              <SelectOptionsTable
                name="BIRIMID"
                options={urunBirim}
                required={true}
                headColumns={[
                  { id: "BIRIMID", title: "Birim id" },
                  { id: "BIRIMADI", title: "Adi" },
                  { id: "CARPAN", title: "CARPAN" },
                ]}
                filterParams={filterParamsWeight}
                handleSelect={(obj: any) => {
                  setValue("BIRIMID", obj.BIRIMID);
                  setValue("URUNBIRIMID", obj.URUNBIRIMID);
                }}
                defaultValue={0}
                readOnly={true}
                disabled={!!formId}
                control={control}
                setFilterParams={setFilterParamsWeight}
              />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <HFInputMask
            control={control}
            name="BIRIMFIYAT"
            label={t("BIRIMFIYAT")}
            type="number"
            placeholder={t("BIRIMFIYAT")}
          />
          <div>
            <CLabel title={t("NOTU")} />
            <textarea
              className="p-3 h-[110px] transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] resize-none rounded-[8px] w-full"
              rows={3}
              placeholder={t("NOTU")}
              defaultValue={getValues("NOTU")}
              onChange={(e: any) => setValue("NOTU", e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mt-8">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpen(false)}
        >
          {t("cancel")}
        </button>
        <button className="custom-btn save" type="submit">
          {t(formId ? "edit" : "create")}
        </button>
      </div>
    </form>
  );
};
