import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useEffect, useState } from "react";
import { InnerModalLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { IFilterParams } from "../../../../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import dayjs from "dayjs";

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
}

export const TableForm = ({
  setOpen,
  defaultData = {},
  refetch = () => {},
}: TableFormProps) => {
  const { t } = useTranslationHook();

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
  const { control, handleSubmit, setValue } = useForm<FormData>({
    mode: "onSubmit",
  });
  const { urunData, urunBirim, createStokElement, updateElement } =
    InnerModalLogic({
      filterParams,
      filterParamsWeight,
      refetch,
      setOpen,
    });

  const onSubmit = (data: any) => {
    if (defaultData.URUNID) {
      let params: any = {
        STOKDETAYID: defaultData.STOKDETAYID,
        STOKID: null,
        IRSALIYEID: 5652,
        URUNID: defaultData.URUNID,
        URUNBIRIMID: 1284,
        KULLANICIID: 1,
        DEPOID: "D003",
        TRANSFERDEPOID: "D009",
        MIKTAR: 4,
        BIRIMFIYAT: 0,
        DEGISIMTARIHI: "2025-04-12T07:37:38.184000",
        NOTU: "",
        IRSALIYETARIHI: "2025-04-12T00:00:00",
      };

      params.IRSALIYEID = defaultData.IRSALIYEID;
      params.DEPOID = defaultData.DEPOID;
      params.TRANSFERDEPOID = defaultData.TRANSFERDEPOID;
      params.DEGISIMTARIHI = defaultData.INSERTTARIHI;
      params.IRSALIYETARIHI = defaultData.IRSALIYETARIHI;
      params = { ...params, ...data };

      params.URUNBIRIMID = defaultData.URUNBIRIMID;
      params.MIKTAR = +params.MIKTAR;
      params.BIRIMFIYAT = +params.BIRIMFIYAT;
      delete params.BIRIMID;
      delete params.ADI;
      delete params.BARKODKODU;

      if (defaultData?.URUNID) {
        updateElement(params, defaultData.STOKDETAYID);
      } else {
        createStokElement(params);
      }
    } else {
      let params: any = {
        HAREKETTIPI: 1,
        URUNID: defaultData?.URUNID,
        URUNBIRIMID: 1288,
        MIKTAR: 17,
        BIRIMFIYAT: 0,
        DEPOID: "D003",
        TRANSFERDEPOID: "D008",
        IRSALIYEID: 5626,
        FIRMAID: null,
        NOTU: "",
        STOKVAR: true,
        INSERTKULLANICIID: 1,
        KULLANICIID: 1,
        DEGISIMTARIHI: dayjs(),
      };
      params.IRSALIYEID = defaultData.IRSALIYEID;
      params.DEPOID = defaultData.DEPOID;
      params.TRANSFERDEPOID = defaultData.TRANSFERDEPOID;
      params.INSERTTARIHI = defaultData.INSERTTARIHI;
      params.TARIH = defaultData.IRSALIYETARIHI;
      params = { ...params, ...data };
      params.URUNBIRIMID =
        urunBirim.find((obj: any) => obj.BIRIMID === params.BIRIMID)
          ?.URUNBIRIMID ?? 0;
      params.MIKTAR = +params.MIKTAR;
      params.BIRIMFIYAT = +params.BIRIMFIYAT;
      delete params.BIRIMID;
      delete params.ADI;
      delete params.IRSALIYETARIHI;

      if (defaultData?.URUNID) {
        updateElement(params, defaultData.STOKDETAYID);
      } else {
        createStokElement(params);
      }
    }
  };

  useEffect(() => {
    setValue("BIRIMID", urunBirim?.[0]?.BIRIMID ?? "Kg");
  }, [urunBirim]);

  useEffect(() => {
    if (defaultData?.URUNID) {
      setFilterParams({
        ...filterParams,
        q: `URUNID=${defaultData.URUNID.substring(3, -1)}`,
      });
      setValue("URUNID", defaultData.URUNID);
      setValue("URUNADI", defaultData.URUNADI);
    }
  }, [defaultData?.URUNID]);

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
        name="BARKODKODU"
        label="Barkod kodi"
        placeholder="Barkod kodu"
        setValue={setValue}
        defaultValue={defaultData?.BARKODKODI}
      />

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
        defaultValue={defaultData?.URUNID}
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
          defaultValue={defaultData?.MIKTAR}
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
            }}
            defaultValue={0}
            readOnly={true}
            control={control}
            setFilterParams={setFilterParamsWeight}
          />
        </div>
      </div>

      <HFInputMask
        control={control}
        name="BIRIMFIYAT"
        label="Birim fiyat"
        type="number"
        placeholder="Birim fiyat"
      />
      <div className="flex space-x-2 mt-3">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpen(false)}
        >
          Отменить
        </button>
        <button className="custom-btn save" type="submit">
          {defaultData?.URUNID ? "Редикировать" : "Сохранить"}
        </button>
      </div>
    </form>
  );
};
